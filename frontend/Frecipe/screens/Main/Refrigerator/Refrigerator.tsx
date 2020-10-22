import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Header, Overlay, Button } from 'react-native-elements'
import { AntDesign, Entypo } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import SearchBar from "react-native-dynamic-search-bar/lib/SearchBar";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface RefrigeratorProps { }
interface RefrigeratorState {
  filter: string,
  addVisible: boolean,
}

class Refrigerator extends Component<RefrigeratorProps, RefrigeratorState> {
  state = {
    filter: 'eod',
    addVisible: false,
  }
  addOverlay = () => {
    this.setState({ addVisible: !this.state.addVisible });
  };
  render() {
    const { addVisible } = this.state
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <KeyboardAwareScrollView>
          <Header style={{ flex: 1 }}
            backgroundColor='#00BD75'
            centerComponent={{ text: 'MY Refrigerator', style: { color: '#fff' } }}
            rightComponent={<AntDesign name="edit" size={24} color="white" />}
          />
          <View style={{ flex: 1, margin: 10 }}>
            <SearchBar
              placeholder="재료를 검색하세요..."
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', margin: 4 }}>
            <View style={{ flex: 4, borderColor: '#dedcdc', borderWidth: 1, borderRadius: 3, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10 }}>
              <Text style={{ color: '#EFB700', margin: 3 }}>유통기한 임박</Text>
              <Text style={{ color: 'black', margin: 3 }}>1개</Text>
            </View>
            <View style={{ flex: 4, borderColor: '#dedcdc', borderWidth: 1, borderRadius: 3, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>
              <Text style={{ color: 'red', margin: 3 }}>유통기한 만료</Text>
              <Text style={{ color: 'black', margin: 3 }}>2개</Text>
            </View>
          </View>
          <View style={{ flex: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10, alignItems: "center", borderBottomWidth: 1, borderBottomColor: '#dedcdc', padding: 10 }}>
              <View style={{ flex: 1.5, flexDirection: 'row', justifyContent: 'space-around', alignItems: "center" }}>
                <Text>품목</Text>
                <Text>5개</Text>
              </View >
              <View style={{ flex: 0.5 }}>
              </View>
              <View style={{ flex: 5 }}>
                <DropDownPicker
                  defaultValue={this.state.filter}
                  items={[
                    { label: '유통기한 임박 순', value: 'eod' },
                    { label: '????', value: '??' },
                  ]}
                  containerStyle={{ height: 40 }}
                  style={{ backgroundColor: '#fafafa' }}
                  itemStyle={{
                    justifyContent: 'flex-start'
                  }}
                  dropDownStyle={{ backgroundColor: '#fafafa' }}
                />
              </View>
              <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button type="clear" icon={<AntDesign name="plus" size={24} color="black" />} onPress={this.addOverlay}></Button>
              </View>
            </View>
            <View style={{ flex: 9, flexDirection: 'column', marginHorizontal: 10 }}>
              <Text>hi</Text>
              <Text>hi</Text>
              <Text>hi</Text>
              <Text>hi</Text>
            </View>
          </View>
          <Overlay
            fullScreen={true}
            isVisible={addVisible}
            onBackdropPress={this.addOverlay}
          >
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center' }}><Text>제품등록</Text></View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}><Button type='clear' icon={<Entypo name="camera" size={24} color="black" />}></Button></View>
              </View>
              <Text style={{ flex: 8, alignItems: 'center' }}>hi, im overlay</Text>
              <View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'row' }}>
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

export default Refrigerator;