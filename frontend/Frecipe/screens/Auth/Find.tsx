import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/Auth';
import { RouteProp } from '@react-navigation/native';

import api from '../../api';

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, 'Find'>;
  route: RouteProp<AuthStackParamList, 'Find'>;
}

interface State {
  selectedCategory: number;
  isLoading: boolean;
  email: string;
  nickname: string;
  phone: string;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const TabSelector = ({ selected }: any) => {
  return (
    <View style={styles.selectorContainer}>
      <View style={selected && styles.selected} />
    </View>
  );
};

TabSelector.propTypes = {
  selected: PropTypes.bool.isRequired,
};

export default class Find extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      selectedCategory: 0,
      isLoading: false,
      email: '',
      nickname: '',
      phone: '',
    };

    this.selectCategory = this.selectCategory.bind(this);
  }

  selectCategory(selectedCategory: number) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      selectedCategory,
      isLoading: false,
    });
  }

  find = async (selectedCategory: number) => {
    const { email, nickname, phone } = this.state;
    if (selectedCategory === 0) {
      try {
        const { data } = await api.findId({
          nickname,
          phone,
        });
        Alert.alert(`${nickname}님의 이메일은 ${data}입니다.`);
      } catch (event) {
        console.error(event);
      }
    } else {
    }
  };

  render() {
    const { selectedCategory, isLoading, email, nickname, phone } = this.state;
    const isLoginPage = selectedCategory === 0;
    const isSignUpPage = selectedCategory === 1;
    const { navigation } = this.props;

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
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Button
                  disabled={isLoading}
                  type="clear"
                  activeOpacity={0.7}
                  onPress={() => this.selectCategory(0)}
                  containerStyle={{ flex: 1 }}
                  titleStyle={[
                    styles.categoryText,
                    isLoginPage && styles.selectedCategoryText,
                  ]}
                  title={'이메일 찾기'}
                />
                <Button
                  disabled={isLoading}
                  type="clear"
                  activeOpacity={0.7}
                  onPress={() => this.selectCategory(1)}
                  containerStyle={{ flex: 1 }}
                  titleStyle={[
                    styles.categoryText,
                    isSignUpPage && styles.selectedCategoryText,
                  ]}
                  title={'비밀번호 찾기'}
                />
              </View>
              <View style={styles.rowSelector}>
                <TabSelector selected={isLoginPage} />
                <TabSelector selected={isSignUpPage} />
              </View>
              <View style={styles.formContainer}>
                {isSignUpPage && (
                  <Input
                    value={email}
                    onChangeText={(email) => this.setState({ email })}
                    containerStyle={styles.inputContainer}
                    placeholder="email@address.com"
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() => this.userNameInput.focus()}
                    leftIcon={
                      <MaterialIcons name="email" size={24} color="#00BD75" />
                    }
                  />
                )}
                {isSignUpPage ? (
                  <Input
                    value={nickname}
                    onChangeText={(nickname) => this.setState({ nickname })}
                    containerStyle={styles.inputContainer}
                    placeholder="홍길동(닉네임)"
                    returnKeyType="next"
                    ref={(input) => (this.userNameInput = input)}
                    onSubmitEditing={() => this.phoneNumberInput.focus()}
                    leftIcon={
                      <MaterialIcons name="person" size={24} color="#00BD75" />
                    }
                  />
                ) : (
                  <Input
                    value={nickname}
                    onChangeText={(nickname) => this.setState({ nickname })}
                    containerStyle={styles.inputContainer}
                    placeholder="홍길동(닉네임)"
                    returnKeyType="next"
                    onSubmitEditing={() => this.phoneNumberInput.focus()}
                    leftIcon={
                      <MaterialIcons name="person" size={24} color="#00BD75" />
                    }
                  />
                )}

                <Input
                  value={phone}
                  onChangeText={(phone) => this.setState({ phone })}
                  containerStyle={styles.inputContainer}
                  placeholder="0101234567"
                  ref={(input) => (this.phoneNumberInput = input)}
                  onSubmitEditing={() => this.find(selectedCategory)}
                  leftIcon={
                    <MaterialIcons
                      name="smartphone"
                      size={24}
                      color="#00BD75"
                    />
                  }
                />
                <View style={styles.buttonsContainer}>
                  <Button
                    title="확인"
                    buttonStyle={styles.findButton}
                    containerStyle={styles.findButtonContainer}
                    titleStyle={styles.findTitle}
                    loading={isLoading}
                    disabled={isLoading}
                    onPress={() => this.find(selectedCategory)}
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
  rowSelector: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorContainer: {
    flex: 1,
    alignItems: 'center',
  },
  selected: {
    position: 'absolute',
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  formContainer: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  categoryText: {
    textAlign: 'center',
    color: '#00BD75',
    fontSize: 24,
    backgroundColor: 'transparent',
    opacity: 0.54,
  },
  selectedCategoryText: {
    opacity: 1,
  },
  inputContainer: {
    width: 350,
  },
  findButton: {
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
  findButtonContainer: {
    marginTop: 10,
    height: 60,
    width: 80,
  },
  backButtonContainer: {
    marginTop: 10,
    marginLeft: 10,
    height: 60,
    width: 80,
  },
  findTitle: { fontWeight: 'bold' },
  backTitle: { fontWeight: 'bold', color: '#000' },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 30,
    marginRight: 50,
  },
});
