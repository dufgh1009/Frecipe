import React, { Component } from 'react';
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

import { connect, Dispatch } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { list, filter, search } from '../../../redux/communitySlice';

interface Recipe {
  recNo: number;
  title: string;
  view: number;
  rate: number;
  mainImg: string;
  commentCount: string;
  comment: Array<Comment>;
  ingredients: Array<String>;
  writer: string;
}

interface filterType {
  selected: string;
  clickSelect: number;
}

interface Props {
  navigation: any;
  list: typeof list;
  filter: typeof filter;
  search: typeof search;
  recipes: Array<Recipe>;
  searchRecipes: Array<Recipe>;
  searchKeyword: string;
  selected: string;
  clickSelect: number;
}

class Community extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  leftFilter = () => {
    const { clickSelect } = this.props;
    const { filter } = this.props;
    const selectedList: Array<string> = [
      '업데이트순',
      '조회수순',
      '평점순',
      '댓글순',
    ];
    filter({
      selected: selectedList[(clickSelect + 3) % 4],
      clickSelect: (clickSelect + 3) % 4,
    });
  };

  rightFilter = () => {
    const { clickSelect } = this.props;
    const { filter } = this.props;
    const selectedList: Array<string> = [
      '업데이트순',
      '조회수순',
      '평점순',
      '댓글순',
    ];
    filter({
      selected: selectedList[(clickSelect + 1) % 4],
      clickSelect: (clickSelect + 1) % 4,
    });
  };

  searchRecipe = (keyword: string) => {
    const { search } = this.props;
    search(keyword);
  };

  render() {
    const { selected, searchRecipes } = this.props;
    return (
      <View>
        <Header
          style={{ flex: 1 }}
          backgroundColor="#00BD75"
          centerComponent={{
            text: '커뮤니티',
            style: { color: '#fff', fontSize: 20, fontWeight: '500' },
          }}
          rightComponent={
            <Button
              onPress={() => this.props.navigation.navigate('RecipeCreate')}
              icon={<AntDesign name="edit" size={24} color="white" />}
              buttonStyle={styles.createButton}
            />
          }
        />
        <View style={styles.selected}>
          <AntDesign
            name="caretleft"
            size={24}
            color="#00BD75"
            onPress={this.leftFilter}
          />
          <Text style={styles.selectorText}>{selected}</Text>
          <AntDesign
            name="caretright"
            size={24}
            color="#00BD75"
            onPress={this.rightFilter}
          />
        </View>
        <SearchBar
          style={styles.searchBar}
          onChangeText={(keyword: string) => this.searchRecipe(keyword)}
          onClearPress={() => this.searchRecipe('')}
          placeholder="레시피를 검색하세요."
        />
        <Text style={styles.myIngredient}>나의 냉장고 재료로 보기</Text>
        <ScrollView style={styles.recipeList}>
          {searchRecipes.map((recipe: Recipe) => (
            <TouchableWithoutFeedback
              key={recipe.recNo}
              onPress={() => this.props.navigation.navigate('RecipeDetail')}
            >
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

const mapStateToProps = (state: RootState) => {
  return {
    recipes: state.community.recipes,
    selected: state.community.selected,
    searchRecipes: state.community.searchRecipes,
    searchKeyword: state.community.searchKeyword,
    clickSelect: state.community.clickSelect,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    list: (form: Array<Recipe>) => dispatch(list(form)),
    filter: (form: filterType) => dispatch(filter(form)),
    search: (keyword: string) => dispatch(search(keyword)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Community);

const styles = StyleSheet.create({
  createButton: {
    backgroundColor: '#00BD75',
  },
  selected: {
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
    width: 100,
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
