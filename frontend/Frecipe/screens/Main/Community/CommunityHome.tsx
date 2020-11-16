import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Header, ListItem, Image, Button } from 'react-native-elements';

import SearchBar from 'react-native-dynamic-search-bar/lib/SearchBar';

import { AntDesign } from '@expo/vector-icons';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import {
  list,
  filter,
  search,
  Recipe,
  filterType,
  detail,
} from '../../../redux/communitySlice';

import api from '../../../api';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

interface Props {
  navigation: any;
  list: typeof list;
  filter: typeof filter;
  search: typeof search;
  detail: typeof detail;
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

  componentWillMount = async () => {
    const { data } = await api.getRecipe();
    this.props.list(data);
  };

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

  recipeDetail = async (recipeNo: number) => {
    const recipeDetail = await api.recipeDetail(recipeNo);
    this.props.detail(recipeDetail.data);
    const recipe = await api.getRecipe();
    this.props.list(recipe.data);
    this.props.navigation.navigate('RecipeDetail');
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
        <ScrollView style={styles.recipeList}>
          {searchRecipes.map((recipe: Recipe) => (
            <TouchableOpacity
              key={recipe.recipeNo}
              onPress={() => this.recipeDetail(recipe.recipeNo)}
            >
              <ListItem bottomDivider>
                <Image
                  source={{ uri: recipe.completeImage[0].image }}
                  style={styles.thumbnailImage}
                />
                <ListItem.Content>
                  <ListItem.Title>{recipe.title}</ListItem.Title>
                  <ListItem.Subtitle style={styles.recipeSubtitle}>
                    {recipe.nickname} {'\n'}
                    조회수 : {recipe.view} | 평점 : {recipe.rate}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <Button
                  title={String(recipe.comments.length)}
                  titleStyle={styles.commentButtonTitle}
                  buttonStyle={styles.commentButton}
                />
              </ListItem>
            </TouchableOpacity>
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
    detail: (form: any) => dispatch(detail(form)),
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
    height: SCREEN_HEIGHT - 280,
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
