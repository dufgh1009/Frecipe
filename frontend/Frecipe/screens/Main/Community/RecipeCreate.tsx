import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native'
import { Header, Image, Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';


import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../../redux/rootReducer';
import {
  addContext,
  addIngredient,
  addSauce,
  changeMainIngredient,
  changeContext,
  changeIngredient,
  changeTitle,
  recipeToAdd,
  initRecipeToAdd,
  Recipe
} from '../../../redux/communitySlice'


import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


interface Props {
  onCamera: () => void,
  navigation: any,
  addContext: typeof addContext,
  addIngredient: typeof addIngredient,
  addSauce: typeof addSauce,
  changeMainIngredient: typeof changeMainIngredient,
  changeContext: typeof changeContext,
  changeIngredient: typeof changeIngredient,
  changeTitle: typeof changeTitle,
  initRecipeToAdd: typeof initRecipeToAdd,
  recipeAdd: recipeToAdd,
  recipes: Recipe[]
}

class RecipeCreate extends Component<Props> {
  constructor(props: Props) {
    super(props);
  };

  render() {
    console.log(this.props.recipes)
    console.log(this.props.recipeAdd)
    // const { recipe: { context, mainIngredients, ingredients, completeImage, sauce } } = this.props
    // console.log(context)
    // const mainIngredientsInput = mainIngredients.map((element: any) => {
    //   const index = element.id
    //   return <TextInput key={element.id} onChange={(e) => this.props.changeMainIngredient(index, e.nativeEvent.text)} style={{ marginHorizontal: 20, width: 60, height: 30, borderBottomWidth: 1 }} placeholder='재료'></TextInput>;
    // })
    // const ingredientsInput = ingredients.map((element: any) => {
    //   const index = element.id
    //   return <View key={element.id} style={{ flexDirection: 'row', borderColor: 'black', marginHorizontal: 5, height: 50 }}>
    //     <TextInput onChange={(e) => this.props.changeIngredient(index, e.nativeEvent.text, 'name', 'ingredient')} style={{ marginHorizontal: 20, width: 80, height: 40, borderBottomWidth: 1 }} placeholder='재료'></TextInput>
    //     <TextInput onChange={(e) => this.props.changeIngredient(index, e.nativeEvent.text, 'quantity', 'ingredient')} style={{ marginHorizontal: 20, height: 40, borderBottomWidth: 1 }} placeholder='양 ex) 3T, 300g'></TextInput>
    //   </View>
    // })
    // const completeImageInput = completeImage.map((element: any) => {
    //   const index = element.id
    //   if (element.image == "") {
    //     return <View key={index} style={{ flex: 3, marginVertical: 10, height: 60, width: 60, justifyContent: 'center', alignItems: 'center' }}>
    //       <Button onPress={this.props.onCamera} type='clear' icon={<AntDesign name="pluscircleo" size={24} color="black" />}></Button>
    //     </View>
    //   } else {
    //     return <View key={index} style={{ flex: 3, marginVertical: 10, height: 60, width: 60, justifyContent: 'center', alignItems: 'center' }}>
    //       <Image
    //         style={{
    //           width: 60,
    //           height: 60,
    //         }}
    //         onPress={() => this.props.onCamera}
    //         source={{ uri: element.image }}
    //       />
    //     </View>
    //   }
    // })
    // const sauceInput = sauce.map((element: any) => {
    //   const index = element.id
    //   return <View key={element.id} style={{ flexDirection: 'row', borderColor: 'black', marginHorizontal: 5, height: 50 }}>
    //     <TextInput onChange={(e) => this.props.changeIngredient(index, e.nativeEvent.text, 'name', 'sauce')} style={{ marginHorizontal: 20, width: 80, height: 40, borderBottomWidth: 1 }} placeholder='재료'></TextInput>
    //     <TextInput onChange={(e) => this.props.changeIngredient(index, e.nativeEvent.text, 'quantity', 'sauce')} style={{ marginHorizontal: 20, height: 40, borderBottomWidth: 1 }} placeholder='양 ex) 3T, 300g'></TextInput>
    //   </View>
    // })
    // const addList = context.map((element: any) => {
    //   if (element.image === '') {
    //     return <View key={element.id} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, height: 50, marginVertical: 10 }}>
    //       <Text style={{ textAlignVertical: 'center', textAlign: 'center', width: 40 }}>{element.id + 1}</Text>
    //       <TextInput onChange={(e) => this.props.changeContext(element.id, e.nativeEvent.text)} multiline style={{ height: 50, width: 200, textAlignVertical: 'top', borderWidth: 1, borderColor: 'black', padding: 2 }} placeholder='설명....'></TextInput>
    //       <Button buttonStyle={{ width: 60, marginHorizontal: 20 }} onPress={() => this.changeContentImage(element.id)} type='clear' icon={<AntDesign name="pluscircleo" size={24} color="black" />}></Button>
    //     </View>
    //   } else {
    //     return <View key={element.id} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, height: 50, marginVertical: 10 }}>
    //       <Text style={{ textAlignVertical: 'center', textAlign: 'center', width: 40 }}>{element.id + 1}</Text>
    //       <TextInput onChange={(e) => this.props.changeContext(element.id, e.nativeEvent.text)} multiline style={{ height: 50, width: 200, textAlignVertical: 'top', borderWidth: 1, borderColor: 'black', padding: 2 }} placeholder='설명....'></TextInput>
    //       <Image
    //         style={{
    //           width: 60,
    //           height: 60,
    //           marginHorizontal: 20
    //         }}
    //         onPress={() => this.changeContentImage(element.id)}
    //         source={{ uri: element.image }}
    //       />
    //     </View>
    //   }
    // }
    // )
    return (
      <Text>ㅗㅑㅗㅑㅗㅑㅗㅑ</Text>
      // <ScrollView>
      //   <View style={{ flex: 1, flexDirection: 'column' }}>
      //     <Header
      //       style={{ flex: 1 }}
      //       backgroundColor="#00BD75"
      //       centerComponent={{
      //         text: '레시피 만들기',
      //         style: { color: '#fff', fontSize: 20, fontWeight: '500' },
      //       }}
      //       leftComponent={<Button type='clear' onPress={() => {
      //         this.props.initRecipeToAdd()
      //         this.props.navigation.goBack()
      //       }} icon={<AntDesign name="left" size={24} color="black" />}></Button>}
      //     />
      //     <View style={{ flex: 9, flexDirection: 'column', marginTop: 20 }}>
      //       <TextInput onChange={(e) => this.props.changeTitle(e.nativeEvent.text)} style={{ fontSize: 20, width: 300, borderBottomWidth: 1, borderColor: 'black', marginHorizontal: 10, marginBottom: 10 }} placeholder="제목을 입력하세요"></TextInput>
      //       <View>
      //         <Text style={{ paddingHorizontal: 10, backgroundColor: '#9FCEB0', height: 40, textAlignVertical: 'center' }}>메인재료</Text>
      //         <View style={{ flexDirection: 'row', borderColor: 'black', margin: 5, height: 50, alignItems: 'center' }}>
      //           {mainIngredientsInput}
      //         </View>
      //       </View>
      //       <View style={{ flexDirection: 'column' }}>
      //         <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, backgroundColor: '#9FCEB0', height: 40 }}>
      //           <Text style={{ textAlignVertical: 'center' }}>재료</Text>
      //           <Button type='clear' onPress={() => this.props.addIngredient()} icon={<AntDesign name="plus" size={24} color="black" />}></Button>
      //         </View>
      //         {ingredientsInput}
      //       </View>
      //       <View style={{ flexDirection: 'column' }}>
      //         <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, backgroundColor: '#9FCEB0', height: 40, }}>
      //           <Text style={{ textAlignVertical: 'center' }}>양념재료</Text>
      //           <Button type='clear' onPress={() => this.props.addSauce()} icon={<AntDesign name="plus" size={24} color="black" />}></Button>
      //         </View>
      //         {sauceInput}
      //       </View>
      //       <View>
      //         <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, backgroundColor: '#9FCEB0', height: 40, }}>
      //           <Text style={{ textAlignVertical: 'center' }}>조리과정</Text>
      //           <Button type='clear' onPress={() => this.props.addContext()} icon={<AntDesign name="plus" size={24} color="black" />}></Button>
      //         </View>
      //         {addList}
      //       </View>
      //       <View style={{ flexDirection: 'column' }}>
      //         <Text style={{ paddingHorizontal: 10, backgroundColor: '#9FCEB0', height: 40, textAlignVertical: 'center' }}>완성사진</Text>
      //         <View style={{ flexDirection: 'row' }}>
      //           {completeImageInput}
      //         </View>
      //       </View>
      //     </View>
      //   </View >
      // </ScrollView >
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

  // changeCompleteImage = async (id: number) => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [3, 3],
  //     quality: 1
  //   });
  //   if (!result.cancelled) {
  //     var newCompleteImage: any[] = Object.assign([], this.props.recipeToAdd.completeImage)
  //     newCompleteImage[id] = {
  //       ...newCompleteImage[id],
  //       image: result.uri,
  //     }
  // this.setState({
  //   recipe: {
  //     ...this.state.recipe,
  //     completeImage: newCompleteImage
  //   }
  // })
  //   }
  // }


  changeContentImage = async (id: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1
    });

  };
}
const mapStateToProps = (state: RootState) => {
  return {
    recipes: state.community.recipes,
    recipeAdd: state.community.recipeAdd
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeTitle: (value: string) => dispatch(changeTitle(value)),
    addIngredient: () => dispatch(addIngredient()),
    addSauce: () => dispatch(addSauce()),
    addContext: () => dispatch(addContext()),
    changeMainIngredient: (index: number, value: string) => dispatch(changeMainIngredient(index, value)),
    changeIngredient: (index: number, value: string, what: string, category: string) => dispatch(changeIngredient(index, value, what, category)),
    changeContext: (index: number, value: string) => dispatch(changeContext(index, value)),
    initRecipeToAdd: () => dispatch(initRecipeToAdd())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCreate);