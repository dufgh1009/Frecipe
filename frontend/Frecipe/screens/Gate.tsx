import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Auth from '../navigation/Auth';
import Main from '../navigation/Main';

import { connect } from 'react-redux';
import { RootState } from '../redux/rootReducer';

interface Props {
  isLogin: boolean;
}

class Gate extends Component<Props> {
  render() {
    const { isLogin } = this.props;
    return (
      <NavigationContainer>{isLogin ? <Main /> : <Auth />}</NavigationContainer>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return { isLogin: state.usersReducer };
};

export default connect(mapStateToProps, null)(Gate);
