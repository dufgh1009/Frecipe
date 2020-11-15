import React, { Component } from 'react';
import {
  Alert,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Header, Button, Input, Image } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { connect, Dispatch } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { logout, update } from '../../../redux/usersSlice';

import api from '../../../api';

import * as ImagePicker from 'expo-image-picker';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';

const screenHeight = Dimensions.get('screen').height;

// 이미지 서버 업로드
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

// type 설정
interface Update {
  nickname: string;
  phone: string;
  img: string;
}

interface Props {
  logout: () => void;
  update: ({ nickname, phone, img }: Update) => void;
  user: {
    token: string;
    userNo: number;
    username: string;
    nickname: string;
    phone: string;
    img: string;
  };
}

interface State {
  token: string;
  userNo: number;
  username: string;
  nickname: string;
  phone: string;
  img: string | null;
  rollGranted: boolean;
}

class Setting extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      token: this.props.user.token,
      userNo: this.props.user.userNo,
      username: this.props.user.username,
      nickname: this.props.user.nickname,
      phone: this.props.user.phone,
      img: this.props.user.img,
      rollGranted: false,
    };
  }

  // 유저 프로필 사진 클릭시
  clickProfile = () => {
    Alert.alert(
      '유저 사진 등록',
      '사진을 등록하시겠습니까?',
      [
        {
          text: '사진 등록',
          onPress: () => {
            this.pickImage();
          },
        },
        {
          text: '사진 삭제',
          onPress: () => {
            this.setState({ img: null });
          },
        },
        {
          text: '취소',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };

  // 앨범 내 사진 선택
  pickImage = async () => {
    const { username, rollGranted } = this.state;
    // 앨범 접근 권한
    if (rollGranted === false) {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status === 'granted') {
        this.setState({ rollGranted: true });
      } else {
        alert('앨범 접근을 허용해주세요.');
        return;
      }
    }

    // 앨범 사진 선택
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (result.cancelled) {
      return;
    }

    this.setState({ img: result.uri });

    // 이미지 업로드
    const response = await fetch(result.uri);
    const blob = await response.blob();
    let _date = new Date();
    let fileName = `${username.substring(0, 4)}${_date.getFullYear()}${
      _date.getMonth() + 1
    }${_date.getDate()}${_date.getHours()}${_date.getMinutes()}${_date.getSeconds()}`;

    // 업로드 속성 설정
    var params = {
      Bucket: albumBucketName,
      Key: `${fileName}.jpeg`,
      Body: blob,
      ACL: 'public-read',
    };

    const temp = api.AWS_S3_SERVER + params.Key;
    console.log('upload url : ' + temp);
    this.setState({ img: temp });

    // 업로드
    s3.upload(params, function (err: any) {
      if (err) {
        return alert('There was an error uploading your photo');
      }
    });

    this.doUpdate();
  };

  // 회원정보 수정
  doUpdate = async () => {
    const { token, nickname, phone, img } = this.state;

    try {
      const { data } = await api.updateUser({ nickname, phone, img }, token);

      const { update } = this.props;

      update({
        nickname: data.nickname,
        phone: data.phone,
        img: data.img,
      });

      alert('회원정보를 수정했습니다.');
    } catch (event) {
      console.log(event);
    }
  };

  // 로그아웃
  doLogout = () => {
    const { logout } = this.props;
    logout();
  };

  // 회원 탈퇴
  doDelete = async () => {
    const { token } = this.state;
    const { data } = await api.deleteUser(token);
    console.log(data);

    const { logout } = this.props;
    logout();
  };

  render() {
    const { username, nickname, phone, img } = this.state;
    return (
      <View>
        <KeyboardAwareScrollView>
          <Header
            style={{ flex: 1 }}
            backgroundColor="#00BD75"
            centerComponent={{
              text: '마이 페이지',
              style: { color: '#fff', fontSize: 20, fontWeight: '500' },
            }}
            rightComponent={
              <Button
                title="수정"
                type="outline"
                buttonStyle={styles.modifyButton}
                titleStyle={styles.titleButton}
                onPress={this.doUpdate}
              />
            }
          />
          <View style={styles.contentContainer}>
            {img ? (
              <TouchableOpacity onPress={this.clickProfile}>
                <Image source={{ uri: img }} style={styles.profileImage} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={this.clickProfile}>
                <FontAwesome5
                  name="user-plus"
                  size={80}
                  color="#808080"
                  style={{ marginBottom: 45 }}
                />
              </TouchableOpacity>
            )}

            <Input
              disabled
              value={username}
              onChangeText={(username: string) => this.setState({ username })}
              containerStyle={styles.inputContainer}
              leftIcon={
                <MaterialIcons name="email" size={24} color="#00BD75" />
              }
            />
            <Input
              value={nickname}
              onChangeText={(nickname) => this.setState({ nickname })}
              containerStyle={styles.inputContainer}
              leftIcon={
                <MaterialIcons name="person" size={24} color="#00BD75" />
              }
            />
            <Input
              value={phone}
              onChangeText={(phone) => this.setState({ phone })}
              containerStyle={styles.inputContainer}
              keyboardType="number-pad"
              leftIcon={
                <MaterialIcons name="smartphone" size={24} color="#00BD75" />
              }
            />
            <TouchableOpacity onPress={this.doLogout}>
              <Text style={styles.text}>로그아웃</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.doDelete}>
              <Text style={styles.text}>회원탈퇴</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return { user: state.usersReducer };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    logout: () => dispatch(logout()),
    update: (form: Update) => dispatch(update(form)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);

const styles = StyleSheet.create({
  modifyButton: {
    backgroundColor: '#fff',
    width: 45,
    height: 30,
    padding: 0,
    borderColor: '#00BD75',
    marginRight: 3,
  },
  titleButton: {
    color: '#00BD75',
    fontSize: 15,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    height: screenHeight - 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 110,
    height: 110,
    marginBottom: 45,
    borderRadius: 70,
  },
  inputContainer: {
    width: 300,
    marginBottom: 5,
  },
  text: {
    fontSize: 20,
    marginTop: 30,
  },
});
