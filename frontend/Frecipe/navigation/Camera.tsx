import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { saveImage } from '../redux/createRecipeSlice';
import { reciept } from '../redux/refrigeratorSlice';
import { MaterialIcons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../redux/rootReducer';

import djangoApi from '../djangoApi';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import api from '../api';

var albumBucketName = 'frecipe-pjt';
var bucketRegion = 'ap-northeast-2';
var IdentityPoolId = 'ap-northeast-2:43e4aae1-d94d-457e-96f2-69fc999cf72a';

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId,
  }),
});

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: albumBucketName },
});

interface State { }
interface Props {
  navigation: any;
  saveImage: typeof saveImage;
  username: string;
  status: string;
  index: number;
  reciept: typeof reciept;
}

class MyCamera extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  camera: Camera | null = null;

  getCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
    }
  };

  getCameraRollPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  };

  componentDidMount() {
    this.getCameraPermission();
    this.getCameraRollPermission();
  }

  getReceipt = async (url: object) => {
    const result = await djangoApi.receipt(url);
    this.props.reciept(result?.data.foods);
  };

  takeSnapshot = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      if (photo != null) {
        MediaLibrary.saveToLibraryAsync(photo.uri);
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [3, 3],
          quality: 1,
        });
        if (!result.cancelled) {
          if (this.props.status === 'receipt') {
            const base64 = await FileSystem.readAsStringAsync(result.uri, {
              encoding: 'base64',
            });
            let _date = new Date();
            let fileName = `receipt${this.props.username.substring(
              0,
              4,
            )}${_date.getFullYear()}${_date.getMonth() + 1
              }${_date.getDate()}${_date.getHours()}${_date.getMinutes()}${_date.getSeconds()}`;

            this.getReceipt({
              url: base64,
              filename: `${fileName}.jpg`,
            });
          } else {
            const response = await fetch(result.uri);
            const blob = await response.blob();
            let _date = new Date();
            let fileName = `recipe${this.props.username.substring(
              0,
              4,
            )}${_date.getFullYear()}${_date.getMonth() + 1
              }${_date.getDate()}${_date.getHours()}${_date.getMinutes()}${_date.getSeconds()}`;
            // 업로드 속성 설정
            var params = {
              Bucket: albumBucketName,
              Key: `${fileName}.jpeg`,
              Body: blob,
              ACL: 'public-read',
            };

            const temp = api.AWS_S3_SERVER + params.Key;

            // 업로드
            s3.upload(params, function (err: any) {
              if (err) {
                console.log(err);
                return alert('There was an error uploading your photo');
              }
            });

            if (this.props.status === 'completeImage') {
              this.props.saveImage(this.props.index, 'completeImage', temp);
            } else if (this.props.status === 'context') {
              this.props.saveImage(this.props.index, 'context', temp);
            }
          }

          this.props.navigation.goBack();
        }
      }
    }
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          ref={(camera) => {
            this.camera = camera;
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              alignItems: 'flex-end',
              marginLeft: 30,
              marginBottom: 80,
            }}
          >
            <TouchableOpacity
              style={{
                marginBottom: 5,
              }}
              onPress={async () => {
                let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.All,
                  allowsEditing: true,
                  aspect: [3, 3],
                  quality: 1,
                });
                if (!result.cancelled) {
                  if (this.props.status === 'receipt') {
                    const base64 = await FileSystem.readAsStringAsync(
                      result.uri,
                      {
                        encoding: 'base64',
                      },
                    );
                    let _date = new Date();
                    let fileName = `recipe${this.props.username.substring(
                      0,
                      4,
                    )}${_date.getFullYear()}${_date.getMonth() + 1
                      }${_date.getDate()}${_date.getHours()}${_date.getMinutes()}${_date.getSeconds()}`;

                    this.getReceipt({
                      url: base64,
                      filename: `${fileName}.jpg`,
                    });
                  } else {
                    const response = await fetch(result.uri);
                    const blob = await response.blob();
                    let _date = new Date();
                    let fileName = `recipe${this.props.username.substring(
                      0,
                      4,
                    )}${_date.getFullYear()}${_date.getMonth() + 1
                      }${_date.getDate()}${_date.getHours()}${_date.getMinutes()}${_date.getSeconds()}`;
                    // 업로드 속성 설정
                    var params = {
                      Bucket: albumBucketName,
                      Key: `${fileName}.jpeg`,
                      Body: blob,
                      ACL: 'public-read',
                    };

                    const temp = api.AWS_S3_SERVER + params.Key;
                    // 업로드
                    s3.upload(params, function (err: any) {
                      if (err) {
                        console.log(err);
                        return alert('There was an error uploading your photo');
                      }
                    });

                    if (this.props.status === 'completeImage') {
                      this.props.saveImage(
                        this.props.index,
                        'completeImage',
                        temp,
                      );
                    } else if (this.props.status === 'context') {
                      this.props.saveImage(this.props.index, 'context', temp);
                    }
                  }
                  this.props.navigation.goBack();
                }
              }}
            >
              <MaterialIcons name="photo-album" size={50} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 102 }}
              onPress={() => this.takeSnapshot()}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 50,
                  borderColor: 'white',
                  height: 60,
                  width: 60,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 50,
                    borderColor: 'white',
                    height: 50,
                    width: 50,
                    backgroundColor: 'white',
                  }}
                ></View>
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    username: state.usersReducer.username,
    status: state.cameraReducer.status,
    index: state.cameraReducer.index,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    saveImage: (index: number, category: string, uri: string) =>
      dispatch(saveImage(index, category, uri)),
    reciept: (foods: string[]) => dispatch(reciept(foods)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCamera);
