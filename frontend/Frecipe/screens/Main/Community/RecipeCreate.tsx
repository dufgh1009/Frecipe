import React, { Component } from 'react';

import { View, Text, Button } from 'react-native'

interface Props {
  navigation: any;
}

class RecipeCreate extends Component<Props> {
  render() {
    return (
      <View>
        <Text style={{ color: 'black' }}>hi</Text>
        <Text style={{ color: 'black' }}>hi</Text>
        <Text style={{ color: 'black' }}>hi</Text>
        <Text style={{ color: 'black' }}>hi</Text>
        <Text style={{ color: 'black' }}>hi</Text>
        <Text style={{ color: 'black' }}>hi</Text>
        <Text style={{ color: 'black' }}>hi</Text>
        <Text style={{ color: 'black' }}>hi</Text>
        <Text style={{ color: 'black' }}>hi</Text>
        <Text style={{ color: 'black' }}>hi</Text>
        <Text style={{ color: 'black' }}>hi</Text>
        <Button onPress={() => this.props.navigation.goBack()} title="goBack"></Button>

      </View>
    );
  }
}

export default RecipeCreate