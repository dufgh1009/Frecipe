import React, { Component } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Text, Button, Input } from 'react-native-elements';

import { MaterialIcons } from '@expo/vector-icons';

interface Props {}
interface State {
  email: string;
  password: string;
}

export default class SingIn extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  isEmail = (email: string) => {
    const regEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return regEx.test(email);
  };

  isFormValid = () => {
    const { email, password } = this.state;

    if (email === '' || password === '') {
      alert('모든 필드를 채워주세요.');
      return false;
    }
    if (!this.isEmail(email)) {
      alert('올바른 이메일이 아닙니다.');
      return false;
    }
    return true;
  };

  doSignIn = () => {};

  render() {
    const { email, password } = this.state;
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
              onChangeText={(email: string) => this.setState({ email })}
              containerStyle={styles.inputContainer}
              placeholder="email@address.com"
              keyboardType="email-address"
              leftIcon={
                <MaterialIcons name="email" size={24} color="#00BD75" />
              }
            />
            <Input
              value={password}
              onChangeText={(password: string) => this.setState({ password })}
              containerStyle={styles.inputContainer}
              placeholder="비밀번호"
              secureTextEntry={true}
              leftIcon={<MaterialIcons name="lock" size={24} color="#00BD75" />}
            />
            <Button
              title="로그인"
              buttonStyle={styles.button}
              containerStyle={styles.buttonContainer}
              titleStyle={styles.title}
              onPress={this.doSignIn}
            />
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.text}>이메일 / 비밀번호 찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.text}>회원가입</Text>
            </TouchableOpacity>
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
    fontSize: 18,
    marginTop: 20,
  },
  inputContainer: {
    width: 300,
  },
  button: {
    backgroundColor: '#00BD75',
    borderWidth: 2,
    borderColor: '#00BD75',
    borderRadius: 6,
  },
  buttonContainer: {
    marginTop: 10,
    height: 60,
    width: 183,
  },
  title: { fontWeight: 'bold' },
});
