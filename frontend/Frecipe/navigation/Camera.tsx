import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { saveImage } from '../redux/createRecipeSlice';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../redux/rootReducer';

import djangoApi from '../djangoApi';
import api from '../api';
import axios from 'axios';

interface State {}
interface Props {
  navigation: any;
  saveImage: typeof saveImage;
  username: string;
  status: string;
  index: number;
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
    const result = await djangoApi.receipt({ url: 'http' });
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
          const base64 = await FileSystem.readAsStringAsync(result.uri, {
            encoding: 'base64',
          });

          let _date = new Date();
          let fileName = `recipe${this.props.username.substring(
            0,
            4,
          )}${_date.getFullYear()}${
            _date.getMonth() + 1
          }${_date.getDate()}${_date.getHours()}${_date.getMinutes()}${_date.getSeconds()}`;

          this.getReceipt({
            url: base64,
            filename: `${fileName}.jpg`,
          });

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
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={async () => {
                let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.All,
                  allowsEditing: true,
                  aspect: [3, 3],
                  quality: 1,
                });
                if (!result.cancelled) {
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
                  )}${_date.getFullYear()}${
                    _date.getMonth() + 1
                  }${_date.getDate()}${_date.getHours()}${_date.getMinutes()}${_date.getSeconds()}`;

                  this.getReceipt({
                    url: base64,
                    filename: `${fileName}.jpg`,
                  });

                  this.props.navigation.goBack();
                }
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                {' '}
                Album{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <Button onPress={() => this.takeSnapshot()} title="찰칵"></Button>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCamera);
