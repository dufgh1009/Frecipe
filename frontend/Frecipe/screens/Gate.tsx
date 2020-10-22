import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from '../navigation/Auth';
import Main from '../navigation/Main';

export default class Gate extends Component {
  render() {
    return (
      <NavigationContainer>
        {/* <Auth/> */}
        <Main />
      </NavigationContainer >
    );
  }
}
