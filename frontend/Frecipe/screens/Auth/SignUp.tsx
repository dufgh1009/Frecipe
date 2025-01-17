import React, { Component } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { Button, Input } from 'react-native-elements';

import { MaterialIcons } from '@expo/vector-icons';

import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/Auth';
import { RouteProp } from '@react-navigation/native';

import api from '../../api';

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, 'SignUp'>;
  route: RouteProp<AuthStackParamList, 'SignUp'>;
}

interface State {
  username: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  phone: string;
}

export default class SingIn extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
      phone: '',
    };
  }

  isEmail = (username: string) => {
    const regEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return regEx.test(username);
  };

  isFormValid = () => {
    const { username, password, passwordConfirm, nickname, phone } = this.state;
    if (
      username === '' ||
      password === '' ||
      passwordConfirm === '' ||
      username === '' ||
      phone === ''
    ) {
      alert('모든 필드를 채워주세요.');
      return false;
    }
    if (!this.isEmail(username)) {
      alert('올바른 이메일을 작성해주세요.');
      return false;
    }
    if (password !== passwordConfirm) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    }
    return true;
  };

  doSignUp = async () => {
    const { username, password, nickname, phone } = this.state;
    const { navigation } = this.props;

    if (!this.isFormValid()) {
      return;
    }
    try {
      const { status } = await api.createAccount({
        username,
        password,
        nickname,
        phone,
      });
      if (status === 200) {
        Alert.alert('회원가입 완료');
        navigation.navigate('SignIn');
      }
    } catch (event) {
      console.log(event);
      alert('이미 존재하는 이메일입니다.');
    }
  };

  render() {
    const { navigation } = this.props;
    const { username, password, passwordConfirm, nickname, phone } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
            />
            <Input
              value={username}
              onChangeText={(username) => this.setState({ username })}
              containerStyle={styles.inputContainer}
              placeholder="email@address.com"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()}
              leftIcon={
                <MaterialIcons name="email" size={24} color="#00BD75" />
              }
            />
            <Input
              value={password}
              onChangeText={(password) => this.setState({ password })}
              containerStyle={styles.inputContainer}
              placeholder="비밀번호"
              secureTextEntry={true}
              returnKeyType="next"
              ref={(input) => (this.passwordInput = input)}
              onSubmitEditing={() => this.passwordConfirmInput.focus()}
              leftIcon={<MaterialIcons name="lock" size={24} color="#00BD75" />}
            />
            <Input
              value={passwordConfirm}
              onChangeText={(passwordConfirm) =>
                this.setState({ passwordConfirm })
              }
              containerStyle={styles.inputContainer}
              placeholder="비밀번호 확인"
              secureTextEntry={true}
              returnKeyType="next"
              ref={(input) => (this.passwordConfirmInput = input)}
              onSubmitEditing={() => this.userNameInput.focus()}
              leftIcon={<MaterialIcons name="lock" size={24} color="#00BD75" />}
            />
            <Input
              value={nickname}
              onChangeText={(nickname) => this.setState({ nickname })}
              containerStyle={styles.inputContainer}
              placeholder="홍길동(닉네임)"
              returnKeyType="next"
              ref={(input) => (this.userNameInput = input)}
              onSubmitEditing={() => this.phoneInput.focus()}
              leftIcon={
                <MaterialIcons name="person" size={24} color="#00BD75" />
              }
            />
            <Input
              value={phone}
              onChangeText={(phone) => this.setState({ phone })}
              containerStyle={styles.inputContainer}
              placeholder="0101234567"
              keyboardType="number-pad"
              ref={(input) => (this.phoneInput = input)}
              onSubmitEditing={this.doSignup}
              leftIcon={
                <MaterialIcons name="smartphone" size={24} color="#00BD75" />
              }
            />
            <View style={styles.buttonsContainer}>
              <Button
                title="회원가입"
                buttonStyle={styles.signUpButton}
                containerStyle={styles.signUpButtonContainer}
                titleStyle={styles.signUpTitle}
                onPress={this.doSignUp}
              />
              <Button
                title="뒤로"
                buttonStyle={styles.backButton}
                containerStyle={styles.backButtonContainer}
                titleStyle={styles.backTitle}
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
  },
  text: {
    fontFamily: 'BMHANNA',
    fontSize: 18,
    marginTop: 20,
  },
  inputContainer: {
    width: 300,
  },
  signUpButton: {
    backgroundColor: '#00BD75',
    borderWidth: 2,
    borderColor: '#00BD75',
    borderRadius: 6,
  },
  backButton: {
    backgroundColor: '#e0e0e0',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 6,
  },
  signUpButtonContainer: {
    marginTop: 10,
    height: 60,
    width: 100,
  },
  backButtonContainer: {
    marginTop: 10,
    marginLeft: 10,
    height: 60,
    width: 70,
  },
  signUpTitle: { fontWeight: 'bold' },
  backTitle: { fontWeight: 'bold', color: '#000' },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 20,
    marginRight: 110,
  },
});
