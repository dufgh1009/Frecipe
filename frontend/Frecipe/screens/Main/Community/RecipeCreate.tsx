import React, { Component } from 'react';

import { View, TextInput } from 'react-native'
import { Header, Input, Image, Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import AddButtons from './ButtonGroup';

export interface image {
  id: number,
  uri: string,
  type: string
}

interface Props {
  navigation: any;
}

interface Context {
  id: number,
  context: string,
  type: string,
}

interface State {
  maxId: number;
  recipe: any[]
}

class RecipeCreate extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      recipe: [],
      maxId: 0,
    };
  };
  render() {
    let { recipe } = this.state

    const addList = recipe.map((element: any) => {
      const index = element.id;
      if (element.type === 'image') {
        return (
          <View key={index}>
            <Image source={{ uri: element.uri }} style={{ width: 200, height: 200 }} />
          </View>
        );
      } else {
        return (
          <View key={index} style={{ height: 50, marginHorizontal: 10, marginVertical: 5, justifyContent: 'flex-start' }}>
            <TextInput style={{ backgroundColor: 'white', minHeight: 40, fontSize: 10, paddingVertical: 5, textAlignVertical: 'top' }} multiline={true} placeholder="레시피를 입력하세요"></TextInput>
          </View>
        );
      }

    });
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Header
          style={{ flex: 1 }}
          backgroundColor="#00BD75"
          centerComponent={{
            text: '레시피 만들기',
            style: { color: '#fff', fontSize: 20, fontWeight: '500' },
          }}
          leftComponent={<Button type='clear' onPress={() => this.props.navigation.goBack()} icon={<AntDesign name="left" size={24} color="black" />}></Button>}
        />
        <View style={{ flex: 9, flexDirection: 'column', marginTop: 20 }}>
          <Input placeholder="제목을 입력하세요"></Input>
          <View>
            {addList}
            <AddButtons
              onPressAlbum={() => this._pickImage()}
              onPressText={() => this.onPressText()}
              recipe={recipe} />
          </View>
        </View>
      </View >
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }


  getPermissionAsync = async () => {
    if (Constants.platform?.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    var newRecipe = Object.assign([], this.state.recipe)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if (!result.cancelled) {
      let image = {
        id: this.state.maxId,
        uri: result.uri,
        type: 'image',
      }
      newRecipe.push(image)
      this.setState({
        recipe: newRecipe,
        maxId: this.state.maxId + 1
      });
    }
  }

  onPressText() {
    var newRecipe = Object.assign([], this.state.recipe)
    var context = {
      id: this.state.maxId,
      content: "",
      type: 'context'
    }
    newRecipe.push(context)
    this.setState({
      maxId: this.state.maxId + 1,
      recipe: newRecipe
    })
  }

};

export default RecipeCreate