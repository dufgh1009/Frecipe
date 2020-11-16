import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Header, Button, ListItem, Image } from 'react-native-elements';

import { Feather, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

import axios from 'axios';
import { unescape } from 'lodash';

import { connect, Dispatch } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';

import { list, detail, Recipe } from '../../../redux/communitySlice';
import api from '../../../api';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const API_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_YOUTUBE_KEY = 'AIzaSyBFPXqfcFfZ6jhcDYgdyMSsEaknL1Yl9NM';

interface Props {
  list: typeof list;
  detail: typeof detail;
  navigation: any;
  user: {
    token: string;
    userNo: number;
    username: string;
    nickname: string;
    phone: string;
    img: string;
  };
}

interface Video {
  etag: string;
  id: Object;
  snippet: Object;
}

interface Ingredient {
  category: string;
  description: string;
  exp: string;
  fridgeNo: number;
  ingName: string;
  ingNo: number;
  status: string;
}

interface State {
  ingredients: Array<Ingredient>;
  selectIngredients: Array<string>;
  videos: Array<Video>;
  recipes: Array<Recipe>;
  totalRecipes: Array<Recipe>;
}

class RecipeRecommend extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ingredients: [],
      selectIngredients: [],
      videos: [],
      recipes: [],
      totalRecipes: [],
    };
  }

  componentDidMount = async () => {
    const { data }: any = await api.sevenIngredient(this.props.user.token);
    this.setState({ ingredients: data });

    const getRecipe: any = await api.getRecipe();
    this.setState({ totalRecipes: getRecipe.data });

    let temp = this.randomIngredients();
    this.userRecipes();
    this.searchVideo(temp);
  };

  refresh = () => {
    this.userRecipes();

    let temp = this.randomIngredients();
    this.searchVideo(temp);
  };

  randomIngredients = () => {
    const { ingredients }: any = this.state;

    // 재료 랜덤으로 3개 추출
    let random: Array<number> = [];
    let i = 0;
    while (i < 3) {
      let n = Math.floor(Math.random() * 7);
      if (!random.includes(n)) {
        random.push(n);
        i++;
      }
    }
    let temp: Array<string> = [];
    random.map((n) => temp.push(ingredients[n].ingName));
    this.setState({ selectIngredients: temp });

    return temp;
  };

  userRecipes = async () => {
    var newIndex: number[] = new Array();
    var newRecipe: Recipe[] = new Array();

    for (const d of this.state.totalRecipes) {
      var tempIngredient: any = new Array();
      for (const i of d.mainIngredients) {
        tempIngredient.push(i.name);
      }
      var cnt = 0;
      for (const s of this.state.selectIngredients) {
        if (tempIngredient.includes(s)) {
          cnt++;
        }
      }
      if (cnt >= 1) {
        if (newIndex.includes(d.recipeNo) == false) {
          newRecipe.push(d);
          newIndex.push(d.recipeNo);
        }
      }
    }

    this.setState({ recipes: newRecipe });
  };

  searchVideo = (temp: Array<string>) => {
    var keyword = '';
    temp.map((t) => (keyword += t + ' '));
    keyword += '레시피';

    if (keyword.trim()) {
      axios
        .get(API_URL, {
          params: {
            key: API_YOUTUBE_KEY,
            part: 'snippet',
            q: keyword,
            type: 'video',
          },
        })
        .then((res) => {
          res.data.items.forEach((item: any) => {
            item.snippet.title = unescape(item.snippet.title);
          });
          this.setState({ videos: res.data.items });
        })
        .catch((err: any) => console.error(err));
    }
  };

  supportedURL = 'https://www.youtube.com/watch?v=';

  showVideo = async (videoId: string) => {
    const url = this.supportedURL + `${videoId}`;
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  recipeDetail = async (recipeNo: number) => {
    const recipeDetail = await api.recipeDetail(recipeNo);
    this.props.detail(recipeDetail.data);
    const recipe = await api.getRecipe();
    this.props.list(recipe.data);
    this.props.navigation.navigate('RecipeDetail');
  };

  render() {
    const { selectIngredients, recipes, videos } = this.state;
    return (
      <View>
        <Header
          style={{ flex: 1 }}
          backgroundColor="#00BD75"
          centerComponent={{
            text: '레시피 추천',
            style: { color: '#fff', fontSize: 20, fontWeight: '500' },
          }}
          rightComponent={
            <Feather
              name="refresh-cw"
              size={24}
              color="white"
              onPress={this.refresh}
            />
          }
        />
        <View style={styles.buttonContainer}>
          {selectIngredients.map((ingredient, i) => (
            <Button
              key={i}
              title={ingredient}
              buttonStyle={styles.ingredientButton}
              titleStyle={styles.buttonTitle}
            />
          ))}
        </View>
        <View style={styles.recipeContainer}>
          <View style={styles.titleContainer}>
            <MaterialCommunityIcons
              name="food-variant"
              size={30}
              color="#00BD75"
            />
            <Text style={styles.title}>사용자 레시피</Text>
          </View>
          <ScrollView style={[styles.recipeList, { height: 235 }]}>
            {recipes.map((recipe) => (
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
                    <ListItem.Subtitle style={styles.videoSubtitle}>
                      {recipe.nickname} {'\n'}
                      조회수 : {recipe.view} | 평점 : {recipe.rate}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <Button
                    title={String(recipe.comments.length)}
                    buttonStyle={styles.commentButton}
                  />
                </ListItem>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.recipeContainer}>
          <View style={styles.titleContainer}>
            <Entypo name="video" size={30} color="#00BD75" />
            <Text style={styles.title}>유튜브 레시피</Text>
          </View>
          <ScrollView style={[styles.recipeList, { height: 235 }]}>
            {videos.map((video) => (
              <TouchableWithoutFeedback
                key={video.etag}
                onPress={() => this.showVideo(video.id.videoId)}
              >
                <ListItem bottomDivider>
                  <Image
                    source={{ uri: video.snippet.thumbnails.default.url }}
                    style={styles.thumbnailImage}
                  />
                  <ListItem.Content>
                    <ListItem.Title>{video.snippet.title}</ListItem.Title>
                    <ListItem.Subtitle style={styles.videoSubtitle}>
                      {video.snippet.channelTitle}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return { user: state.usersReducer };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    list: (form: Array<Recipe>) => dispatch(list(form)),
    detail: (form: any) => dispatch(detail(form)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeRecommend);

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  ingredientButton: {
    backgroundColor: '#FFD700',
    width: 100,
    height: 30,
    padding: 0,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  buttonTitle: {
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
  },
  recipeContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 10,
    alignSelf: 'center',
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
  thumbnailImage: {
    width: 120,
    height: 90,
  },
  videoSubtitle: {
    marginTop: 5,
    color: '#808080',
  },
});
