import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import { Header, Button, ListItem, Image } from 'react-native-elements';

import { Feather, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

import axios from 'axios';
import { unescape } from 'lodash';

const API_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_YOUTUBE_KEY = 'AIzaSyBFPXqfcFfZ6jhcDYgdyMSsEaknL1Yl9NM';

interface Props {}

interface Video {
  etag: string;
  id: Object;
  snippet: Object;
}

interface Recipe {
  recNo: number;
  title: string;
  content: string;
  view: number;
}

interface State {
  ingredients: Array<string>;
  videos: Array<Video>;
  recipes: Array<Recipe>;
}

class RecipeRecommend extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ingredients: ['양파', '계란', '토마토'],
      videos: [],
      recipes: [],
    };
  }

  componentDidMount() {
    const { ingredients } = this.state;
    var searchStr = '';
    ingredients.map((ingredient) => (searchStr += ingredient + ' '));
    this.searchVideo(searchStr);
  }

  searchVideo = (keyword: string) => {
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

  render() {
    const { ingredients, videos } = this.state;
    return (
      <View>
        <Header
          style={{ flex: 1 }}
          backgroundColor="#00BD75"
          centerComponent={{
            text: '레시피 추천',
            style: { color: '#fff', fontSize: 20, fontWeight: '500' },
          }}
          rightComponent={<Feather name="refresh-cw" size={24} color="white" />}
        />
        <View style={styles.buttonContainer}>
          {ingredients.map((ingredient, i) => (
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
        </View>
        <View style={styles.recipeContainer}>
          <View style={styles.titleContainer}>
            <Entypo name="video" size={30} color="#00BD75" />
            <Text style={styles.title}>유튜브 레시피</Text>
          </View>
          <ScrollView style={styles.recipeList}>
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

export default RecipeRecommend;

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
  thumbnailImage: {
    width: 120,
    height: 90,
  },
  videoSubtitle: {
    marginTop: 5,
    color: '#808080',
  },
});
