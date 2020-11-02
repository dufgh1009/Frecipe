import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Dispatch } from 'redux';
import { Header, Overlay, Button } from 'react-native-elements';
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import SearchBar from 'react-native-dynamic-search-bar/lib/SearchBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ingredient, add, deleteIngredient, deleteAll, search, increaseMaxId, order } from '../../../redux/refrigeratorSlice';
import { RootState } from '../../../redux/rootReducer';
import { connect } from 'react-redux';

interface RefrigeratorProps {
  ingredients: Array<ingredient>;
  maxId: number;
  increaseMaxId: typeof increaseMaxId;
  add: typeof add;
  deleteIngredient: typeof deleteIngredient;
  deleteAll: typeof deleteAll;
  search: typeof search;
  order: typeof order;
  yellowFood: number;
  redFood: number;
  searchIngredients: Array<ingredient>
}

interface RefrigeratorState {
  filter: string;
  addVisible: boolean;
  addIngredients: Array<ingredient>;
  maxId: number;
  ingredients: Array<ingredient>;
  searchIngredients: Array<ingredient>;
}

class Refrigerator extends Component<RefrigeratorProps, RefrigeratorState> {
  constructor(props: RefrigeratorProps) {
    super(props);
    this.state = {
      filter: 'update',
      addVisible: false,
      addIngredients: [],
      maxId: this.props.maxId,
      ingredients: this.props.ingredients,
      searchIngredients: this.props.ingredients
    };
  }
  addOverlay = () => {
    this.setState({ addVisible: !this.state.addVisible });
    this.setState({ addIngredients: [] });
  };

  deleteIngredientList(id: number) {
    this.props.deleteIngredient(id)
  }

  addIngredientList = () => {
    var initList: Array<ingredient> = [];
    var newIngredient = Object.assign(initList, this.state.addIngredients);
    var ingredient = {
      id: this.props.maxId,
      name: '',
      count: 0,
      date: -1,
      status: '냉장',
    };

    newIngredient.push(ingredient);
    this.props.increaseMaxId()
    this.setState({ addIngredients: newIngredient });
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
    const newArray = [...this.state.addIngredients];
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
      addIngredients: newArray,
    });
  }

  searchIngredient(keyword: string) {
    this.props.search(keyword)
  }

  orderIngredient(filter: string) {
    this.props.order(filter)
  }
  deleteAllIng() {
    this.props.deleteAll()
    this.setState({
      searchIngredients: []
    })
  }

  render() {
    const { redFood, yellowFood, searchIngredients } = this.props
    const { addVisible, addIngredients } = this.state;
    var displayIngredient = null;
    if (searchIngredients === []) {
      displayIngredient = <Text>재료 없음</Text>
    }
    else {
      displayIngredient =
        <FlatList<ingredient>
          data={searchIngredients}
          renderItem={({ item }: { item: ingredient }) => {
            const rightSwipe = (progress: any, dragX: any) => {
              const scale = dragX.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 1],
                extrapolate: 'clamp'
              });
              return (
                <TouchableOpacity onPress={() => this.deleteIngredientList(item.id)} activeOpacity={0.6}>
                  <View style={{ backgroundColor: 'red' }}>
                    <Animated.Text style={{ color: 'white', transform: [{ scale: scale }] }}>
                      Delete
                    </Animated.Text>
                  </View>
                </TouchableOpacity>
              )
            }
            var statusColor = null
            if (item.status === '냉장') {
              statusColor = 'blue'
            } else {
              statusColor = 'grey'
            }
            var experationIcon = <View style={{ flex: 2 }}></View>
            if (item.date > 3) {
              experationIcon = <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }} ><MaterialCommunityIcons name="emoticon" size={22} color="#008450" /></View>
            } else if (item.date < 1) {
              experationIcon = <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }} ><MaterialCommunityIcons name="emoticon-dead" size={22} color="#B81D13" /></View>
            } else {
              experationIcon = <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }} ><MaterialCommunityIcons name="emoticon-sad" size={22} color="#EFB700" /></View>
            }
            return (
              <Swipeable
                renderRightActions={rightSwipe}
                key={item.id}
              >
                <View style={styles.ingredientsListRow}>
                  <View style={{ flex: 3, justifyContent: 'center' }}><Text style={{ backgroundColor: statusColor, color: 'white', textAlign: 'center', marginHorizontal: 20, borderRadius: 10 }}>{item.status}</Text></View>
                  <Text style={{ flex: 3, textAlign: 'center' }}>{item.name}</Text>
                  <Text style={{ flex: 1, textAlign: 'center' }}>{item.count}</Text>
                  <Text style={{ flex: 1, textAlign: 'center' }}>{item.date}</Text>
                  {experationIcon}
                </View>
              </Swipeable>
            );
          }
          }
        />
    }


    const addList = addIngredients.map((ingredient: ingredient) => {
      const index = ingredient.id;
      if (ingredient.status === '냉장') {
        var statusButton =
          <View key={index} style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
            <Button onPress={() =>
              this.onChangeAddlist(index, '냉장', 'status')}
              type='solid' buttonStyle={{ height: 30, width: 50, marginHorizontal: 3 }} title='냉장'>
            </Button>
            <Button onPress={() =>
              this.onChangeAddlist(index, '냉동', 'status')} type='clear' buttonStyle={{ height: 30, width: 50, marginHorizontal: 3 }} title='냉동'>
            </Button>
          </View>
      } else {
        var statusButton =
          <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
            <Button onPress={() =>
              this.onChangeAddlist(index, '냉장', 'status')}
              type='clear' buttonStyle={{ height: 30, width: 50, marginHorizontal: 3 }} title='냉장'>
            </Button>
            <Button onPress={() =>
              this.onChangeAddlist(index, '냉동', 'status')}
              type='solid' buttonStyle={{ height: 30, width: 50, marginHorizontal: 3 }} title='냉동'>
            </Button>
          </View>
      }
      return (
        <View style={styles.ingredientInputRow}>
          {statusButton}
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
            <SearchBar
              onChangeText={(text) => this.searchIngredient(text)}
              onClearPress={() => this.searchIngredient("")}
              placeholder="재료를 검색하세요..." />
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
                <Button type='clear' titleStyle={styles.filterButton} title="업데이트"
                  onPress={() => this.orderIngredient('update')}>
                </Button>
                <Button type='clear' titleStyle={styles.filterButton} title="유통기한"
                  onPress={() => this.orderIngredient('experation')}>
                </Button>
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
            <Button title="삭제" onPress={() => this.deleteAllIng()}></Button>
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
                  onPress={(e) => this.addIngredient(addIngredients)}
                  title="저장"
                ></Button>
              </View>
            </View>
          </Overlay>
        </View>
      </KeyboardAwareScrollView >
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
    backgroundColor: 'white',
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
    height: 500,
    marginTop: 10,
    flexDirection: 'column',
  },
  ingredientInput: {
    flex: 2,
  },
  ingredientInputRow: {
    marginTop: 20,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  filterButton: {
    color: 'grey',
  }, rowBack: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backTextRed: {
    color: 'red',
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'white',
    right: 0,
  },
  ingredientsListRow: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'flex-end'
  }
});

const mapStateToProps = (state: RootState) => {
  return {
    ingredients: state.refrigerator.ingredients,
    maxId: state.refrigerator.maxId,
    yellowFood: state.refrigerator.yellowFood,
    redFood: state.refrigerator.redFood,
    searchIngredients: state.refrigerator.searchIngredients
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  add: (ingredeients: ingredient[]) => dispatch(add(ingredeients)),
  deleteIngredient: (id: number) => dispatch(deleteIngredient(id)),
  deleteAll: () => dispatch(deleteAll()),
  search: (keyword: string) => dispatch(search(keyword)),
  increaseMaxId: () => dispatch(increaseMaxId()),
  order: (filter: string) => dispatch(order(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Refrigerator);
