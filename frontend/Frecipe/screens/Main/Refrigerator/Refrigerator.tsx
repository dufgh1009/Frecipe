import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';;
import { Header, Overlay, Button, Input } from 'react-native-elements'
import { AntDesign, Entypo } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import SearchBar from "react-native-dynamic-search-bar";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { add, ingredient } from '../../../redux/refrigeratorSlice';
import { RootState } from '../../../redux/rootReducer';
import { connect } from 'react-redux';

interface RefrigeratorProps {
  ingredients: Array<ingredient>;
}


interface RefrigeratorState {
  filter: string,
  addVisible: boolean,
  add_ingredients: Array<ingredient>
}

class Refrigerator extends Component<RefrigeratorProps, RefrigeratorState> {
  state = {
    filter: 'experation',
    addVisible: false,
    add_ingredients: []
  }
  addOverlay = () => {
    this.setState({ addVisible: !this.state.addVisible });
  };
  render() {
    const { addVisible } = this.state
    const newIngredient = this.props.ingredients
    const displayIngredient = newIngredient.map((ingredient: ingredient) => {
      return <Text>{ingredient.status} {ingredient.name} {ingredient.count} {ingredient.date}</Text>;
    });
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <Header style={styles.header}
            backgroundColor='#00BD75'
            centerComponent={{ text: 'MY Refrigerator', style: { color: '#fff' } }}
            rightComponent={<AntDesign name="edit" size={24} color="white" />}
          />
          <View style={styles.searchBar}>
            <SearchBar
              placeholder="재료를 검색하세요..."
            />
          </View>
          <View style={styles.expirationBar}>
            <View style={styles.expirationsBarSub}>
              <Text style={styles.expirationsBarSubYellow}>유통기한 임박</Text>
              <Text style={styles.expirationsBarSubBlack}>1개</Text>
            </View>
            <View style={styles.expirationsBarSub}>
              <Text style={styles.expirationsBarSubRed}>유통기한 만료</Text>
              <Text style={styles.expirationsBarSubBlack}>2개</Text>
            </View>
          </View>
          <View style={{ flex: 10 }}>
            <View style={styles.ingredientsListHeader}>
              <View style={styles.ingredientsListCount}>
                <Text>품목</Text>
                <Text>{newIngredient.length}개</Text>
              </View >
              <View style={{ flex: 0.5 }}>
              </View>
              <View style={{
                flex: 5,
              }}>
                <DropDownPicker
                  zIndex={10}
                  defaultValue={this.state.filter}
                  items={[
                    { label: '유통기한 임박 순', value: 'experation' },
                    { label: '업데이트 순', value: 'update' },
                  ]}
                  containerStyle={{ height: 30 }}
                  style={{ backgroundColor: '#fafafa' }}
                  itemStyle={{
                    justifyContent: 'flex-start'
                  }}
                  dropDownStyle={{ backgroundColor: '#fafafa' }}
                />
              </View>
              <View style={styles.ingredientsListPlus}>
                <Button type="clear" icon={<AntDesign name="plus" size={24} color="black" />} onPress={this.addOverlay}></Button>
              </View>
            </View>
            <View style={styles.ingredient}>
              {displayIngredient}
            </View>
          </View>
          <Overlay
            fullScreen={true}
            isVisible={addVisible}
            onBackdropPress={this.addOverlay}
          >
            <View style={styles.overlay}>
              <View style={styles.overlayHeader}>
                <View style={{ flex: 1 }}></View>
                <View style={styles.overlayHeaderCenter}><Text>제품등록</Text></View>
                <View style={styles.overlayHeaderRight}><Button type='clear' icon={<Entypo name="camera" size={24} color="black" />}></Button></View>
              </View>
              <Text style={styles.overlayAddList}>
                <Input></Input>
                <Input></Input>
                <Input></Input>
                <Input></Input>
              </Text>
              <View style={styles.overlayButtons}>
                <Button type='outline' style={{ flex: 4 }} onPress={this.addOverlay} title='닫기'></Button>
                <Button type='outline' style={{ flex: 4 }} onPress={this.addOverlay} title='저장'></Button>
              </View>
            </View>
          </Overlay>
        </KeyboardAwareScrollView>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  header: {
    flex: 1
  },
  searchBar: {
    flex: 1,
    margin: 10
  },
  expirationBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 4
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
    marginLeft: 10
  },
  expirationsBarSubBlack: {
    color: 'black',
    margin: 3
  },
  expirationsBarSubYellow: {
    color: '#EFB700',
    margin: 3
  },
  expirationsBarSubRed: {
    color: 'red',
    margin: 3
  },
  ingredientsListHeader: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: '#dedcdc',
    padding: 10,
    ...(Platform.OS !== 'android' && {
      zIndex: 10
    })
  },
  ingredientsListCount: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center"
  },
  ingredientsListPlus: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  ingredient: {
    flex: 9,
    flexDirection: 'column',
    marginHorizontal: 10,
    zIndex: 5,
  },
  overlay: {
    flex: 1,
    flexDirection: 'column'
  },
  overlayHeader: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  overlayAddList: {
    flex: 8,
    alignItems: 'center'
  },
  overlayButtons: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  overlayHeaderCenter: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlayHeaderRight: {
    flex: 1,
    justifyContent: 'flex-end'
  }
});

const mapStateToProps = (state: RootState) => {
  return {
    ingredients: state.refrigerator.ingredients,
  }
}

export default connect(mapStateToProps)(Refrigerator)