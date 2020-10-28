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
import { logout } from '../../../redux/usersSlice';

import api from '../../../api';

import * as ImagePicker from 'expo-image-picker';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';

const screenHeight = Dimensions.get('screen').height;

// 이미지 서버 업로드
var albumBucketName = 'frecipe';
var bucketRegion = 'ap-northeast-2';
var IdentityPoolId = 'ap-northeast-2:b572da3a-b812-44e8-b139-9ed88848ae4d';

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
interface Props {
  logout: () => void;
  user: { token: string };
}

interface State {
  userNo: number | null;
  email: string;
  nickname: string;
  phone: string;
  image: string | null;
  rollGranted: boolean;
}

class Setting extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      userNo: null,
      email: 'ee2e@naver.com',
      nickname: '아잉으니야',
      phone: '01087480328',
      image: null,
      rollGranted: false,
    };
  }

  componentDidMount() {
    var jwtDecode = require('jwt-decode');
    const {
      user: { token },
    } = this.props;
    const userNo = jwtDecode(token).sub;
    this.setState({ userNo });
  }

  // 회원정보 수정
  updateUser = () => {};

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
            this.setState({ image: null });
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
    const { email, rollGranted } = this.state;

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

    this.setState({ image: result.uri });

    // 이미지 업로드
    const response = await fetch(result.uri);
    const blob = await response.blob();
    let _date = new Date();
    let fileName = `${email.substring(0, 4)}${_date.getFullYear()}${
      _date.getMonth() + 1
    }${_date.getDate()}${_date.getHours()}${_date.getMinutes()}${_date.getSeconds()}`;
    console.log(albumBucketName);
    // 업로드 속성 설정
    var params = {
      Bucket: albumBucketName,
      Key: `${fileName}.jpeg`,
      Body: blob,
      ACL: 'public-read',
    };

    const temp = api.AWS_S3_SERVER + params.Key;
    console.log('upload url : ' + temp);

    // 업로드
    s3.upload(params, function (err: any) {
      console.log(err);
      if (err) {
        return alert('There was an error uploading your photo');
      }

      Alert.alert(
        '사진 업로드 완료',
        '조금만 기다려주세요^ㅇ^',
        [
          {
            text: '확인',
          },
        ],
        { cancelable: true },
      );
      console.log('일');
    });
    this.setState({ image: temp });
  };

  // 로그아웃
  doLogout = () => {
    const { logout } = this.props;
    logout();
  };

  // 회원 탈퇴
  withdraw = () => {};

  render() {
    const { email, nickname, phone, image } = this.state;
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
                onPress={this.updateUser}
              />
            }
          />
          <View style={styles.contentContainer}>
            {image ? (
              <TouchableOpacity onPress={this.clickProfile}>
                <Image source={{ uri: image }} style={styles.profileImage} />
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
              value={email}
              onChangeText={(email: string) => this.setState({ email })}
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
            <TouchableOpacity onPress={this.withdraw}>
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
