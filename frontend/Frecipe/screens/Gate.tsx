import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Auth from '../navigation/Auth';
import Main from '../navigation/Main';

import { connect } from 'react-redux';
import { RootState } from '../redux/rootReducer';

interface user {
  isLogin: boolean,
  token: string,
}

interface Props {
  user: user;
}

class Gate extends Component<Props> {
  render() {
    const {
      user: { isLogin },
    } = this.props;
    return (
      <NavigationContainer>{isLogin ? <Main /> : <Auth />}</NavigationContainer>
    );
    // return (
    //   <NavigationContainer>
    //     <Main />
    //   </NavigationContainer>
    // );
  }
}

const mapStateToProps = (state: RootState) => {
  return { user: state.users };
};

export default connect(mapStateToProps, null)(Gate);
