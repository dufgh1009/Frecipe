import React, { Component } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Button, Input } from 'react-native-elements';

import { MaterialIcons } from '@expo/vector-icons';

interface Props {}
interface State {
  email: string;
  password: string;
  passwordConfirm: string;
  nickName: string;
}

export default class SingIn extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      nickName: '',
    };
  }

  isEmail = (email: string) => {
    const regEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return regEx.test(email);
  };

  isFormValid = () => {
    const { email, password, passwordConfirm, nickName } = this.state;
    if (
      email === '' ||
      password === '' ||
      passwordConfirm === '' ||
      nickName === ''
    ) {
      alert('모든 필드를 채워주세요.');
      return false;
    }
    if (!this.isEmail(email)) {
      alert('올바른 이메일을 작성해주세요.');
      return false;
    }
    if (password !== passwordConfirm) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    }
    return true;
  };

  doSignUp = async () => {
    const { email, password, nickName } = this.state;

    if (!this.isFormValid()) {
      return;
    }

    // try {
    //     const { status } = await api.createAccount({
    //         username: email,
    //         email,
    //         password,
    //         nickname: username,
    //         phone_number: phoneNumber,
    //     });
    //     if (status === 201) {
    //         alert("회원가입완료");
    //     }
    // } catch (event) {
    //     console.error(event);
    //     alert("이미 존재하는 이메일입니다.");
    // }
  };

  render() {
    const { email, password, passwordConfirm, nickName } = this.state;
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
              value={email}
              onChangeText={(email) => this.setState({ email })}
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
              value={nickName}
              onChangeText={(nickName) => this.setState({ nickName })}
              containerStyle={styles.inputContainer}
              placeholder="홍길동"
              returnKeyType="next"
              ref={(input) => (this.userNameInput = input)}
              onSubmitEditing={this.doSignup}
              leftIcon={
                <MaterialIcons name="person" size={24} color="#00BD75" />
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
                onPress={() => {}}
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
