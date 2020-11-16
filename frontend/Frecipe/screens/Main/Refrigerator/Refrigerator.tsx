import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  Animated,
  TouchableOpacity,
  LogBox,
} from 'react-native';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Dispatch } from 'redux';
import { Header, Overlay, Button } from 'react-native-elements';
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import SearchBar from 'react-native-dynamic-search-bar/lib/SearchBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  list,
  search,
  increaseMaxId,
  order,
  ingredient,
  addIngredient,
  deleteIngredient,
  deleteIngredientAll,
  changeAddIngredient,
} from '../../../redux/refrigeratorSlice';
import { changeCamera } from '../../../redux/cameraSlice';
import { RootState } from '../../../redux/rootReducer';
import { connect } from 'react-redux';

import api from '../../../api';

LogBox.ignoreAllLogs();

interface RefrigeratorProps {
  deleteIngredientAll: typeof deleteIngredientAll;
  onCamera: () => void;
  ingredients: Array<ingredient>;
  maxId: number;
  increaseMaxId: typeof increaseMaxId;
  changeCamera: typeof changeCamera;
  list: typeof list;
  addIngredients: Array<ingredient>;
  addIngredient: typeof addIngredient;
  changeAddIngredient: typeof changeAddIngredient;
  deleteIngredient: typeof deleteIngredient;
  search: typeof search;
  order: typeof order;
  yellowFood: number;
  redFood: number;
  searchIngredients: Array<ingredient>;
  token: string;
}

interface RefrigeratorState {
  forAddId: number;
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
      forAddId: 0,
      filter: 'update',
      addVisible: false,
      addIngredients: [],
      maxId: this.props.maxId,
      ingredients: this.props.ingredients,
      searchIngredients: this.props.ingredients,
    };
  }
  addOverlay = () => {
    this.props.deleteIngredientAll();
    this.setState({ addVisible: !this.state.addVisible });
    // this.setState({ addIngredients: [] });
  };

  listIngredients = async () => {
    const {
      data: { ingredient },
    } = await api.getFridges(this.props.token);
    this.props.list(ingredient);
  };

  deleteIngredientList = async (id: number) => {
    await api.delFridge(id, this.props.token);
    this.listIngredients();
  };

  addIngredientList = () => {
    this.props.addIngredient();
  };

  addIngredient = async (addIngredients: ingredient[]) => {
    try {
      const newAddIngredients: any[] = [];
      addIngredients.map((addIngredient) =>
        newAddIngredients.push({
          ingName: addIngredient.name,
          count: addIngredient.count,
          status: addIngredient.status,
          exp: addIngredient.exp,
        }),
      );
      await api.addFridges(newAddIngredients, this.props.token);
      this.listIngredients();
      this.addOverlay();
    } catch (event) {
      console.error(event);
    }
  };
  scroll: any;

  _scrollToInput(reactNode: any) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.props.scrollToFocusedInput(reactNode);
  }

  onChangeAddlist(id: number, data: any, type: string) {
    this.props.changeAddIngredient(id, data, type);
  }

  delelteAddIngredient(num: number) {
    this.props.deleteIngredient(num);
  }

  searchIngredient(keyword: string) {
    this.props.search(keyword);
  }

  orderIngredient(filter: string) {
    this.props.order(filter);
  }

  deleteAllIng = async () => {
    await api.delFridges(this.props.token);
    this.listIngredients();
  };

  takePicture() {
    this.props.changeCamera('receipt', 0);
    this.addOverlay();
    this.props.onCamera();
  }
  render() {
    const { redFood, yellowFood, searchIngredients } = this.props;
    const { addVisible, addIngredients } = this.state;
    var displayIngredient = null;
    if (searchIngredients === []) {
      displayIngredient = <Text>재료 없음</Text>;
    } else {
      displayIngredient = (
        <FlatList<ingredient>
          data={searchIngredients}
          renderItem={({ item }: { item: ingredient }) => {
            const rightSwipe = (progress: any, dragX: any) => {
              const scale = dragX.interpolate({
                inputRange: [100, 100],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              });
              return (
                <TouchableOpacity
                  style={{
                    backgroundColor: 'red',
                    width: 60,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  key={item.id}
                  onPress={() => this.deleteIngredientList(item.id)}
                  activeOpacity={0.6}
                >
                  <Animated.Text
                    style={{
                      width: 40,
                      textAlign: 'center',
                      fontSize: 18,
                      color: 'white',
                      transform: [{ scale: scale }],
                    }}
                  >
                    삭제
                  </Animated.Text>
                </TouchableOpacity>
              );
            };
            var statusColor = null;
            if (item.status === '냉장') {
              statusColor = 'blue';
            } else {
              statusColor = 'grey';
            }
            var experationIcon = <View style={{ flex: 2 }}></View>;
            if (item.date > 3) {
              experationIcon = (
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MaterialCommunityIcons
                    name="emoticon"
                    size={22}
                    color="#008450"
                  />
                </View>
              );
            } else if (item.date < 1) {
              experationIcon = (
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MaterialCommunityIcons
                    name="emoticon-dead"
                    size={22}
                    color="#B81D13"
                  />
                </View>
              );
            } else {
              experationIcon = (
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MaterialCommunityIcons
                    name="emoticon-sad"
                    size={22}
                    color="#EFB700"
                  />
                </View>
              );
            }
            return (
              <Swipeable renderRightActions={rightSwipe} key={item.id}>
                <View style={styles.ingredientsListRow}>
                  <View style={{ flex: 3, justifyContent: 'center' }}>
                    <Text
                      style={{
                        backgroundColor: statusColor,
                        color: 'white',
                        textAlign: 'center',
                        marginHorizontal: 20,
                        borderRadius: 10,
                      }}
                    >
                      {item.status}
                    </Text>
                  </View>
                  <Text style={{ flex: 3, textAlign: 'center' }}>
                    {item.name}
                  </Text>
                  <Text style={{ flex: 1, textAlign: 'center' }}>
                    {item.count}
                  </Text>
                  <Text style={{ flex: 2, textAlign: 'center' }}>
                    {item.date}
                  </Text>
                  {experationIcon}
                </View>
              </Swipeable>
            );
          }}
        />
      );
    }

    const addList = this.props.addIngredients.map((ingredient: ingredient) => {
      const index = ingredient.id;
      if (ingredient.status === '냉장') {
        var statusButton = (
          <View
            key={index}
            style={{
              width: 90,
              marginLeft: 5,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              onPress={() => this.onChangeAddlist(index, '냉장', 'status')}
              type="solid"
              buttonStyle={{
                height: 32,
                width: 40,
              }}
              titleStyle={{ fontSize: 15 }}
              title="냉장"
            ></Button>
            <Button
              onPress={() => this.onChangeAddlist(index, '냉동', 'status')}
              type="clear"
              buttonStyle={{ height: 32, width: 40 }}
              title="냉동"
              titleStyle={{ fontSize: 15 }}
            ></Button>
          </View>
        );
      } else {
        var statusButton = (
          <View
            style={{
              width: 90,
              marginLeft: 5,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              onPress={() => this.onChangeAddlist(index, '냉장', 'status')}
              type="clear"
              buttonStyle={{ height: 32, width: 40 }}
              titleStyle={{ fontSize: 15 }}
              title="냉장"
            ></Button>
            <Button
              onPress={() => this.onChangeAddlist(index, '냉동', 'status')}
              type="solid"
              buttonStyle={{ height: 32, width: 40 }}
              titleStyle={{ fontSize: 15 }}
              title="냉동"
            ></Button>
          </View>
        );
      }
      return (
        <View key={index} style={styles.ingredientInputRow}>
          {statusButton}
          <View style={{ width: 80, marginLeft: 5 }}>
            <TextInput
              onChange={(e) =>
                this.onChangeAddlist(index, e.nativeEvent.text, 'name')
              }
              value={ingredient.name}
              style={{ fontSize: 15, height: 32, width: 80 }}
              placeholder="이름"
              placeholderTextColor="gray"
            ></TextInput>
          </View>
          <View style={styles.ingredientInput}>
            <TextInput
              onChange={(e) =>
                this.onChangeAddlist(index, e.nativeEvent.text, 'count')
              }
              style={{ fontSize: 15, height: 32 }}
              placeholder="개수"
              keyboardType={'numeric'}
              placeholderTextColor="gray"
            ></TextInput>
          </View>
          <View style={{ width: 80 }}>
            <TextInput
              onChange={(e) =>
                this.onChangeAddlist(index, e.nativeEvent.text, 'exp')
              }
              style={{ fontSize: 15, height: 32 }}
              placeholder="2020-11-15"
              placeholderTextColor="gray"
            ></TextInput>
          </View>
          <View
            style={{
              width: 40,
              justifyContent: 'center',
              height: 32,
              marginLeft: 3,
            }}
          >
            <Button
              type="clear"
              onPress={() => this.delelteAddIngredient(ingredient.id)}
              icon={<AntDesign name="minuscircleo" size={15} color="black" />}
            ></Button>
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
              text: '나의 냉장고',
              style: { color: '#fff', fontSize: 20, fontWeight: '500' },
            }}
            rightComponent={
              <Button
                type="clear"
                icon={<AntDesign name="edit" size={24} color="white" />}
              ></Button>
            }
          />

          <View style={styles.searchBar}>
            <SearchBar
              onChangeText={(text) => this.searchIngredient(text)}
              onClearPress={() => this.searchIngredient('')}
              placeholder="재료를 검색하세요..."
            />
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
                  flexDirection: 'row',
                }}
              >
                <Button
                  type="clear"
                  titleStyle={styles.filterButton}
                  title="업데이트"
                  onPress={() => this.orderIngredient('update')}
                ></Button>
                <Button
                  type="clear"
                  titleStyle={styles.filterButton}
                  title="유통기한"
                  onPress={() => this.orderIngredient('experation')}
                ></Button>
              </View>
              <View style={styles.ingredientsListPlus}>
                <Button
                  type="clear"
                  icon={<AntDesign name="plus" size={24} color="black" />}
                  onPress={this.addOverlay}
                ></Button>
              </View>
            </View>
            <View style={styles.ingredientHeader}>
              <Text style={{ flex: 3, textAlign: 'center' }}>보관방법</Text>
              <Text style={{ flex: 3, textAlign: 'center' }}>재료</Text>
              <Text style={{ flex: 1, textAlign: 'center' }}>재고</Text>
              <Text style={{ flex: 2, textAlign: 'center' }}>유통기한</Text>
              <Text style={{ flex: 2, textAlign: 'center' }}>비고</Text>
            </View>
            <View style={styles.ingredient}>{displayIngredient}</View>
          </View>

          <Overlay
            fullScreen={true}
            isVisible={addVisible}
            onBackdropPress={this.addOverlay}
          >
            <View style={[styles.overlay, { marginTop: 50 }]}>
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
                  <Text style={{ fontSize: 20 }}>제품 등록</Text>
                </View>
                <View style={styles.overlayHeaderRight}>
                  <Button
                    onPress={() => {
                      this.takePicture();
                    }}
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
                  onPress={() => this.addIngredient(this.props.addIngredients)}
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
    marginLeft: 2,
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
  ingredientHeader: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
  ingredient: {
    flex: 8,
    minHeight: 300,
    backgroundColor: 'white',
    flexDirection: 'column',
    marginHorizontal: 10,
    height: 440,
  },
  overlay: {
    position: 'relative',
    zIndex: 10,
    flex: 1,
    flexDirection: 'column',
  },
  overlayHeader: {
    height: 40,
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
    height: 600,
    marginTop: 10,
    flexDirection: 'column',
  },
  ingredientInput: {
    width: 30,
    marginHorizontal: 10,
  },
  ingredientInputRow: {
    marginTop: 20,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    color: 'grey',
  },
  rowBack: {
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
    marginVertical: 5,
    alignItems: 'flex-end',
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    ingredients: state.refrigerator.ingredients,
    maxId: state.refrigerator.maxId,
    yellowFood: state.refrigerator.yellowFood,
    redFood: state.refrigerator.redFood,
    searchIngredients: state.refrigerator.searchIngredients,
    token: state.usersReducer.token,
    addIngredients: state.refrigerator.addIngredients,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addIngredient: () => dispatch(addIngredient()),
  deleteIngredient: (id: number) => dispatch(deleteIngredient(id)),
  changeCamera: (status: string, index: number) =>
    dispatch(changeCamera(status, index)),
  list: (data: ingredient[]) => dispatch(list(data)),
  search: (keyword: string) => dispatch(search(keyword)),
  increaseMaxId: () => dispatch(increaseMaxId()),
  order: (filter: string) => dispatch(order(filter)),
  deleteIngredientAll: () => dispatch(deleteIngredientAll()),
  changeAddIngredient: (id: number, data: any, type: string) =>
    dispatch(changeAddIngredient(id, data, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Refrigerator);
