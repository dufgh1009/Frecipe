import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Header, ListItem, Image, Button } from 'react-native-elements';

import SearchBar from 'react-native-dynamic-search-bar/lib/SearchBar';

import { AntDesign } from '@expo/vector-icons';

interface Props {}

interface Recipe {
  recNo: number;
  title: string;
  view: number;
  rate: number;
  mainImg: string;
  comment: number;
  writer: string;
}

interface State {
  selectedCategory: string;
  searchRecipe: string;
  recipes: Array<Recipe>;
}

const TabSelector = ({ selected }: any) => {
  return (
    <View style={styles.selector}>
      <AntDesign name="caretleft" size={24} color="#00BD75" />
      <Text style={styles.selectorText}>{selected}</Text>
      <AntDesign name="caretright" size={24} color="#00BD75" />
    </View>
  );
};

TabSelector.propTypes = {
  selected: PropTypes.string.isRequired,
};

class Community extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedCategory: '업데이트순',
      searchRecipe: '',
      recipes: [
        {
          recNo: 1,
          mainImg:
            'https://image.ajunews.com/content/image/2020/08/09/20200809151032760474.jpg',
          title: '간장계란밥',
          writer: 'kwonsky',
          view: 9,
          rate: 4.5,
          comment: 5,
        },
      ],
    };
  }

  render() {
    const { selectedCategory, recipes } = this.state;
    return (
      <View>
        <Header
          style={{ flex: 1 }}
          backgroundColor="#00BD75"
          centerComponent={{
            text: '커뮤니티',
            style: { color: '#fff', fontSize: 20, fontWeight: '500' },
          }}
          rightComponent={<AntDesign name="edit" size={24} color="white" />}
        />
        <TabSelector selected={selectedCategory} />
        <SearchBar
          style={styles.searchBar}
          onChangeText={(searchRecipe) => this.setState({ searchRecipe })}
          onClearPress={() => this.setState({ searchRecipe: '' })}
          placeholder="레시피를 검색하세요."
        />
        <Text style={styles.myIngredient}>나의 냉장고 재료보기</Text>
        <ScrollView style={styles.recipeList}>
          {recipes.map((recipe) => (
            <TouchableWithoutFeedback key={recipe.recNo}>
              <ListItem bottomDivider>
                <Image
                  source={{ uri: recipe.mainImg }}
                  style={styles.thumbnailImage}
                />
                <ListItem.Content>
                  <ListItem.Title>{recipe.title}</ListItem.Title>
                  <ListItem.Subtitle style={styles.recipeSubtitle}>
                    {recipe.writer} {'\n'}
                    조회수 : {recipe.view} | 평점 : {recipe.rate}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <Button
                  title={recipe.comment}
                  titleStyle={styles.commentButtonTitle}
                  buttonStyle={styles.commentButton}
                />
              </ListItem>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default Community;

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  selectorText: {
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    width: 90,
  },
  searchBar: {
    marginTop: 20,
  },
  myIngredient: {
    marginTop: 15,
    marginRight: 10,
    textAlign: 'right',
    fontSize: 15,
    fontWeight: '500',
  },
  recipeList: {
    marginTop: 10,
  },
  commentButton: {
    backgroundColor: '#00BD75',
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  commentButtonTitle: {
    fontWeight: '600',
  },
  thumbnailImage: {
    width: 120,
    height: 90,
  },
  recipeSubtitle: {
    marginTop: 5,
    color: '#808080',
  },
});
