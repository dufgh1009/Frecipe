import React, { Component } from 'react';
import { ButtonGroup } from 'react-native-elements'
import { View, Text, } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


interface Props {
  onPressAlbum: () => void;
  onPressText: () => void;
  recipe: any[];
}

interface State {

}

class AddButtons extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
    };
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex(selectedIndex: number) {
    if (selectedIndex === 2) {
      this.props.onPressAlbum()
    } else if (selectedIndex === 0) {
      this.props.onPressText()
    }
  }
  render() {
    const text = () => <Text>TEXT</Text>
    const camera = () => <AntDesign name="camerao" size={18} color="black" />
    const album = () => <MaterialIcons name="photo-album" size={18} color="black" />
    const buttons = [{ element: text }, { element: camera }, { element: album }]
    return (
      <ButtonGroup
        selectedButtonStyle={{ backgroundColor: 'white' }}
        onPress={this.updateIndex}
        buttons={buttons}
        containerStyle={{ height: 30 }} />
    )
  }
}

export default AddButtons