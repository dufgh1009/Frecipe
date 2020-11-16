import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';
import Find from '../screens/Auth/Find';

type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Find: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export default class Auth extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Find" component={Find} />
      </Stack.Navigator>
    );
  }
}
