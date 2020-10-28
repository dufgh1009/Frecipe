import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Dispatch } from 'redux';
import { Header, Overlay, Button } from 'react-native-elements';
import { AntDesign, Entypo } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import SearchBar from 'react-native-dynamic-search-bar/lib/SearchBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ingredient, add, deleteAll } from '../../../redux/refrigeratorSlice';
import { RootState } from '../../../redux/rootReducer';
import { connect } from 'react-redux';

interface RefrigeratorProps {
  ingredients: Array<ingredient>;
  maxId: number;
  add: typeof add;
  deleteAll: typeof deleteAll;
  yellowFood: number;
  redFood: number;
  orderedIngredients: Array<ingredient>
}

type status = 'freeze' | 'refrigeration';

interface newIngredient {
  id: number;
  date: number;
  name: string;
  status: status;
  count: number;
}

interface RefrigeratorState {
  filter: string;
  addVisible: boolean;
  ingredients: Array<newIngredient>;
  maxId: number;
}

class Refrigerator extends Component<RefrigeratorProps, RefrigeratorState> {
  constructor(props: RefrigeratorProps) {
    super(props);
    this.state = {
      filter: 'update',
      addVisible: false,
      ingredients: [],
      maxId: this.props.maxId,
    };
  }
  addOverlay = () => {
    this.setState({ addVisible: !this.state.addVisible });
    this.setState({ ingredients: [] });
  };

  deleteIngredients() {
    this.props.deleteAll()
  }

  addIngredientList = () => {
    var initList: Array<ingredient> = [];
    var newIngredient = Object.assign(initList, this.state.ingredients);
    var ingredient = {
      id: this.state.maxId,
      name: '',
      count: 0,
      date: 0,
      status: '냉동',
    };
    newIngredient.push(ingredient);
    this.setState({ maxId: this.state.maxId + 1 });
    this.setState({ ingredients: newIngredient });
  };

  addIngredient = (addIngredients: ingredient[]) => {
    this.props.add(addIngredients);
    this.addOverlay();
  };
  scroll: any;

  _scrollToInput(reactNode: any) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.props.scrollToFocusedInput(reactNode);
  }

  onChangeAddlist(id: number, data: any, type: string) {
    const newArray = [...this.state.ingredients];
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i].id === id) {
        if (type === 'name') {
          newArray[i].name = data;
        }
        if (type === 'count') {
          data *= 1
          newArray[i].count = data;
        }
        if (type === 'status') {
          newArray[i].status = data;
        }
        if (type === 'date') {
          data *= 1
          newArray[i].date = data;
        }
      }
    }
    this.setState({
      ingredients: newArray,
    });
  }

  render() {
    const { redFood, yellowFood, orderedIngredients } = this.props
    const { addVisible, ingredients } = this.state;
    var newIngredient = null;

    if (this.state.filter === 'update') {
      newIngredient = this.props.ingredients
    }
    else {
      newIngredient = orderedIngredients
    }
    var displayIngredient = null;

    if (newIngredient === []) {
      displayIngredient = <Text>재료 없음</Text>
    }
    else {
      displayIngredient = newIngredient.map((ingredient: ingredient) => {
        return (
          <Text>
            {ingredient.id} {ingredient.status} {ingredient.name} {ingredient.count}{' '}
            {ingredient.date}
          </Text>
        );
      });
    }
    const addList = ingredients.map((ingredient: ingredient) => {
      const index = ingredient.id;
      return (
        <View style={styles.ingredientInputRow}>
          <View style={{ flex: 2 }}>
            <DropDownPicker
              onChangeItem={(item) =>
                this.onChangeAddlist(index, item.label, 'status')
              }
              defaultValue={'freeze'}
              items={[
                { label: '냉장', value: 'refrigeration' },
                { label: '냉동', value: 'freeze' },
              ]}
              containerStyle={{ height: 30 }}
              style={{ backgroundColor: '#fafafa' }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{ position: 'absolute', backgroundColor: '#fafafa', height: 40 }}
            />
          </View>
          <View style={styles.ingredientInput}>
            <TextInput
              onChange={(e) =>
                this.onChangeAddlist(index, e.nativeEvent.text, 'name')
              }
              style={{ fontSize: 15 }}
              placeholder="이름"
            ></TextInput>
          </View>
          <View style={styles.ingredientInput}>
            <TextInput
              onChange={(e) =>
                this.onChangeAddlist(index, e.nativeEvent.text, 'count')
              }
              style={{ fontSize: 15 }}
              placeholder="개수"
              keyboardType={'numeric'}
            ></TextInput>
          </View>
          <View style={styles.ingredientInput}>
            <TextInput
              onChange={(e) =>
                this.onChangeAddlist(index, e.nativeEvent.text, 'date')
              }
              style={{ fontSize: 15 }}
              placeholder="유통기한"
              keyboardType={'numeric'}
            ></TextInput>
          </View>
        </View>
      );
    });


    return (
      <KeyboardAwareScrollView
        innerRef={(ref) => {
          this.scroll = ref;
        }}
      >
        <View style={styles.container}>
          <Header
            style={styles.header}
            backgroundColor="#00BD75"
            centerComponent={{
              text: 'MY Refrigerator',
              style: { color: '#fff' },
            }}
            rightComponent={<AntDesign name="edit" size={24} color="white" />}
          />

          <View style={styles.searchBar}>
            <SearchBar placeholder="재료를 검색하세요..." />
          </View>
          <View style={styles.expirationBar}>
            <View style={styles.expirationsBarSub}>
              <Text style={styles.expirationsBarSubYellow}>유통기한 임박</Text>
              <Text style={styles.expirationsBarSubBlack}>{yellowFood}개</Text>
            </View>
            <View style={styles.expirationsBarSub}>
              <Text style={styles.expirationsBarSubRed}>유통기한 만료</Text>
              <Text style={styles.expirationsBarSubBlack}>{redFood}개</Text>
            </View>
          </View>
          <View style={{ flex: 10 }}>
            <View style={styles.ingredientsListHeader}>
              <View style={styles.ingredientsListCount}>
                <Text>품목</Text>
                <Text>{this.props.ingredients.length}개</Text>
              </View>
              <View style={{ flex: 0.5 }}></View>
              <View
                style={{
                  flex: 5,
                  flexDirection: 'row'
                }}
              >
                <Button type='clear' titleStyle={styles.filterButton} title="업데이트" onPress={e => {
                  this.setState({
                    filter: 'update'
                  })
                }
                }></Button>
                <Button type='clear' titleStyle={styles.filterButton} title="유통기한" onPress={e => {
                  this.setState({
                    filter: 'experation'
                  })
                }
                }></Button>
              </View>
              <View style={styles.ingredientsListPlus}>
                <Button
                  type="clear"
                  icon={<AntDesign name="plus" size={24} color="black" />}
                  onPress={this.addOverlay}
                ></Button>
              </View>
            </View>
            <View style={styles.ingredient}>{displayIngredient}</View>
            <Button onPress={e => this.deleteIngredients()} title="삭제"></Button>
          </View>

          <Overlay
            fullScreen={true}
            isVisible={addVisible}
            onBackdropPress={this.addOverlay}
          >
            <View style={styles.overlay}>
              <View style={styles.overlayHeader}>
                <View style={{ flex: 1 }}>
                  <Button
                    type="clear"
                    onPress={this.addIngredientList}
                    icon={
                      <AntDesign name="pluscircleo" size={24} color="black" />
                    }
                  ></Button>
                </View>
                <View style={styles.overlayHeaderCenter}>
                  <Text>제품등록</Text>
                </View>
                <View style={styles.overlayHeaderRight}>
                  <Button
                    type="clear"
                    icon={<Entypo name="camera" size={24} color="black" />}
                  ></Button>
                </View>
              </View>

              <View style={styles.overlayAddList}>
                <ScrollView>{addList}</ScrollView>
              </View>
              <View style={styles.overlayButtons}>
                <Button
                  type="outline"
                  style={{ flex: 4 }}
                  onPress={this.addOverlay}
                  title="닫기"
                ></Button>
                <Button
                  type="outline"
                  style={{ flex: 4 }}
                  onPress={(e) => this.addIngredient(ingredients)}
                  title="저장"
                ></Button>
              </View>
            </View>
          </Overlay>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 1,
  },
  searchBar: {
    flex: 1,
    margin: 10,
  },
  expirationBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 4,
  },
  expirationsBarSub: {
    flex: 4,
    borderColor: '#dedcdc',
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  expirationsBarSubBlack: {
    color: 'black',
    margin: 3,
  },
  expirationsBarSubYellow: {
    color: '#EFB700',
    margin: 3,
  },
  expirationsBarSubRed: {
    color: 'red',
    margin: 3,
  },
  ingredientsListHeader: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dedcdc',
    padding: 10,
    zIndex: 10,
  },
  ingredientsListCount: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  ingredientsListPlus: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  ingredient: {
    flex: 9,
    minHeight: 300,
    position: 'relative',
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  overlay: {
    position: 'relative',
    zIndex: 10,
    flex: 1,
    flexDirection: 'column',
  },
  overlayHeader: {
    height: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  overlayButtons: {
    marginVertical: 10,
    height: 50,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  overlayHeaderCenter: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayHeaderRight: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlayAddList: {
    zIndex: 1,
    borderWidth: 2,
    borderColor: 'black',
    height: 500,
    marginTop: 10,
    flexDirection: 'column',
  },
  ingredientInput: {
    flex: 2,
  },
  ingredientInputRow: {
    marginTop: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  filterButton: {
    color: 'grey',
  }
});

const mapStateToProps = (state: RootState) => {
  return {
    ingredients: state.refrigerator.ingredients,
    maxId: state.refrigerator.maxId,
    yellowFood: state.refrigerator.yellowFood,
    redFood: state.refrigerator.redFood,
    orderedIngredients: state.refrigerator.orderedIngredients
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  add: (ingredeients: ingredient[]) => dispatch(add(ingredeients)),
  deleteAll: () => dispatch(deleteAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Refrigerator);
