import React, { Component } from 'react';
import { View, Text, TextInput, SafeAreaView, ScrollView } from 'react-native'
import { Header, Input, Image, Button, Icon } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import AddButtons from './ButtonGroup';
// import { ingredient } from '../../../redux/refrigeratorSlice';

interface content {
  id: number,
  text: string,
  image: string
}

interface ingredient {
  id: number
  name: string,
  quantity: string,
}

interface Recipe {
  title: string,
  mainIngredients: any[],
  ingredients: ingredient[],
  sauce: any[],
  representationImage: string,
  context: content[],
  completeImage: any[],
}

interface Props {
  navigation: any;
}

interface State {
  recipe: Recipe;
}

class RecipeCreate extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      recipe: {
        title: "",
        mainIngredients: [{ id: 0, ingredient: "" }, { id: 1, ingredient: "" }, { id: 2, ingredient: "" }],
        ingredients: [
          {
            id: 0,
            name: '',
            quantity: '',
          },
        ],
        sauce: [
          {
            id: 0,
            name: '',
            quantity: '',
          },
        ],
        representationImage: '',
        context: [{
          id: 0,
          text: '과정을 설명하시오.',
          image: ''
        }],
        completeImage: [{ id: 0, image: '' }, { id: 1, image: '' }, { id: 2, image: '' }],
      },
    };
  };
  render() {
    const { recipe: { context, mainIngredients, ingredients, completeImage, sauce } } = this.state
    const mainIngredientsInput = mainIngredients.map((element: any) => {
      const index = element.id
      return <TextInput key={element.id} onChange={(e) => this.changeMainIgredient(index, e.nativeEvent.text)} style={{ marginHorizontal: 20, width: 60, height: 30, borderBottomWidth: 1 }} placeholder='재료'></TextInput>;
    })
    const ingredientsInput = ingredients.map((element: any) => {
      const index = element.id
      return <View key={element.id} style={{ flexDirection: 'row', borderColor: 'black', marginHorizontal: 5, height: 50 }}>
        <TextInput onChange={(e) => this.changeIngredients(index, e.nativeEvent.text, 'name')} style={{ marginHorizontal: 20, width: 80, height: 40, borderBottomWidth: 1 }} placeholder='재료'></TextInput>
        <TextInput onChange={(e) => this.changeIngredients(index, e.nativeEvent.text, 'quantity')} style={{ marginHorizontal: 20, height: 40, borderBottomWidth: 1 }} placeholder='양 ex) 3T, 300g'></TextInput>
      </View>
    })
    const completeImageInput = completeImage.map((element: any) => {
      const index = element.id
      if (element.image == "") {
        return <View style={{ flex: 3, marginVertical: 10, height: 60, width: 60, justifyContent: 'center', alignItems: 'center' }}>
          <Button onPress={() => this.changeCompleteImage(index)} type='clear' icon={<AntDesign name="pluscircleo" size={24} color="black" />}></Button>
        </View>
      } else {
        return <View style={{ flex: 3, marginVertical: 10, height: 60, width: 60, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{
              width: 60,
              height: 60,
            }}
            onPress={() => this.changeCompleteImage(index)}
            source={{ uri: element.image }}
          />
        </View>
      }
    })
    const sauceInput = sauce.map((element: any) => {
      const index = element.id
      return <View key={element.id} style={{ flexDirection: 'row', borderColor: 'black', marginHorizontal: 5, height: 50 }}>
        <TextInput onChange={(e) => this.changeSauce(index, e.nativeEvent.text, 'name')} style={{ marginHorizontal: 20, width: 80, height: 40, borderBottomWidth: 1 }} placeholder='재료'></TextInput>
        <TextInput onChange={(e) => this.changeSauce(index, e.nativeEvent.text, 'quantity')} style={{ marginHorizontal: 20, height: 40, borderBottomWidth: 1 }} placeholder='양 ex) 3T, 300g'></TextInput>
      </View>
    })
    const addList = context.map((element: content) => {
      if (element.image === '') {
        return <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, height: 50, marginVertical: 10 }} key={element.id}>
          <Text style={{ textAlignVertical: 'center', textAlign: 'center', width: 40 }}>{element.id + 1}</Text>
          <TextInput multiline style={{ height: 50, width: 200, textAlignVertical: 'top', borderWidth: 1, borderColor: 'black', padding: 2 }} placeholder={element.text}></TextInput>
          <Button buttonStyle={{ width: 60, marginHorizontal: 20 }} onPress={() => this.changeContentImage(element.id)} type='clear' icon={<AntDesign name="pluscircleo" size={24} color="black" />}></Button>
        </View>
      } else {
        return <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, height: 50, marginVertical: 10 }} key={element.id}>
          <Text style={{ textAlignVertical: 'center', textAlign: 'center', width: 40 }}>{element.id + 1}</Text>
          <TextInput multiline style={{ height: 50, width: 200, textAlignVertical: 'top', borderWidth: 1, borderColor: 'black', padding: 2 }} placeholder={element.text}></TextInput>
          <Image
            style={{
              width: 60,
              height: 60,
              marginHorizontal: 20
            }}
            onPress={() => this.changeContentImage(element.id)}
            source={{ uri: element.image }}
          />
        </View>
      }
    }
    )
    return (
      <ScrollView>
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
            <TextInput onChange={(e) => {
              var newRecipe = Object.assign({}, this.state.recipe)
              newRecipe.title = e.nativeEvent.text
              this.setState({
                recipe: newRecipe
              })
            }
            } style={{ fontSize: 20, width: 300, borderBottomWidth: 1, borderColor: 'black', marginHorizontal: 10, marginBottom: 10 }} placeholder="제목을 입력하세요"></TextInput>
            <View>
              <Text style={{ paddingHorizontal: 10, backgroundColor: '#9FCEB0', height: 40, textAlignVertical: 'center' }}>메인재료</Text>
              <View style={{ flexDirection: 'row', borderColor: 'black', margin: 5, height: 50, alignItems: 'center' }}>
                {mainIngredientsInput}
              </View>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, backgroundColor: '#9FCEB0', height: 40 }}>
                <Text style={{ textAlignVertical: 'center' }}>재료</Text>
                <Button type='clear' onPress={() => this.addIngredeints()} icon={<AntDesign name="plus" size={24} color="black" />}></Button>
              </View>
              {ingredientsInput}
            </View>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, backgroundColor: '#9FCEB0', height: 40, }}>
                <Text style={{ textAlignVertical: 'center' }}>양념재료</Text>
                <Button type='clear' onPress={() => this.addSauceIngredient()} icon={<AntDesign name="plus" size={24} color="black" />}></Button>
              </View>
              {sauceInput}
            </View>
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, backgroundColor: '#9FCEB0', height: 40, }}>
                <Text style={{ textAlignVertical: 'center' }}>조리과정</Text>
                <Button type='clear' onPress={() => this.plusContext()} icon={<AntDesign name="plus" size={24} color="black" />}></Button>
              </View>
              {addList}
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ paddingHorizontal: 10, backgroundColor: '#9FCEB0', height: 40, textAlignVertical: 'center' }}>완성사진</Text>
              <View style={{ flexDirection: 'row' }}>
                {completeImageInput}
              </View>
            </View>
          </View>
        </View >
      </ScrollView >
    );
  }


  componentDidMount() {
    this.getPermissionAsync();
  }

  addIngredeints() {
    var newIngredients = Object.assign([], this.state.recipe.ingredients)
    var newIngredient = {
      id: newIngredients.length,
      name: '',
      quantity: ''
    }
    newIngredients.push(newIngredient)
    var newRecipe: Recipe = Object.assign({}, this.state.recipe, { ingredients: newIngredients })
    this.setState({
      recipe: newRecipe
    })
  }

  addSauceIngredient() {
    var newSauceIngredients = Object.assign([], this.state.recipe.sauce)
    var newSauceIngredient = {
      id: newSauceIngredients.length,
      name: '',
      quantity: ''
    }
    newSauceIngredients.push(newSauceIngredient)
    var newRecipe: Recipe = Object.assign({}, this.state.recipe, { sauce: newSauceIngredients })
    this.setState({
      recipe: newRecipe
    })
  }

  changeMainIgredient(index: number, ingredient: any) {
    var newMainIngredients: any[] = Object.assign([], this.state.recipe.mainIngredients)
    newMainIngredients[index] = {
      id: index,
      ingredient: ingredient,
    }
    var newRecipe: Recipe = Object.assign({}, this.state.recipe)
    newRecipe.mainIngredients = newMainIngredients
    this.setState({
      recipe: newRecipe
    })
  }
  changeSauce(index: number, value: any, what: string) {
    var newSauce: any[] = Object.assign([], this.state.recipe.sauce)
    if (what === 'name') {
      newSauce[index].name = value
    } else {
      newSauce[index].quantity = value
    }
    var newRecipe: Recipe = Object.assign({}, this.state.recipe)
    newRecipe.ingredients = newSauce
    this.setState({
      recipe: newRecipe
    })
  }


  changeIngredients(index: number, value: any, what: string) {
    var newIngredients: any[] = Object.assign([], this.state.recipe.ingredients)
    if (what === 'name') {
      newIngredients[index].name = value
    } else {
      newIngredients[index].quantity = value
    }
    var newRecipe: Recipe = Object.assign({}, this.state.recipe)
    newRecipe.ingredients = newIngredients
    this.setState({
      recipe: newRecipe
    })
  }


  getPermissionAsync = async () => {
    if (Constants.platform?.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  changeCompleteImage = async (id: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1
    });
    if (!result.cancelled) {
      var newCompleteImage: any[] = Object.assign([], this.state.recipe.completeImage)
      newCompleteImage[id] = {
        ...newCompleteImage[id],
        image: result.uri,
      }
      this.setState({
        recipe: {
          ...this.state.recipe,
          completeImage: newCompleteImage
        }
      })
    }
  }


  changeContentImage = async (id: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1
    });
    if (!result.cancelled) {
      var newContext: content[] = Object.assign([], this.state.recipe.context)
      console.log(result.uri)
      newContext[id] = {
        id: newContext[id].id,
        image: result.uri,
        text: newContext[id].text,
      }
      this.setState({
        recipe: {
          ...this.state.recipe,
          context: newContext
        }
      })
    }
  }

  plusContext() {
    var newContext = Object.assign([], this.state.recipe.context)
    const content = {
      id: newContext.length,
      text: '과정을 설명하시오',
      image: ''
    }
    newContext.push(content)
    var newRecipe = Object.assign({}, this.state.recipe, { context: newContext })
    this.setState({
      recipe: newRecipe
    })
  }

};

export default RecipeCreate