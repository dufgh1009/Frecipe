import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Header,
  Text,
  ListItem,
  Image,
  Button,
  Card,
  Icon,
} from 'react-native-elements';

import { AntDesign } from '@expo/vector-icons';

import { connect, Dispatch } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { detail } from '../../../redux/communitySlice';

interface Recipe {
  recNo: number;
  title: string;
  view: number;
  rate: number;
  mainImg: string;
  comment: string;
  writer: string;
}

interface Props {
  navigation: any;
  detail: typeof detail;
  recipeDetail: Object;
}

class RecipeDetail extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    const { detail } = this.props;
    detail({
      recNo: 1,
      mainImg:
        'https://image.ajunews.com/content/image/2020/08/09/20200809151032760474.jpg',
      title: '간장계란밥',
      writer: 'kwonsky',
      content: '간장계란밥 응~ 맛있어^^',
      view: 9,
      rate: 4.5,
      commentCount: '5',
      comments: [
        { writer: '성중이', content: '맛없겠다.' },
        { writer: '성여로', content: '나도 간계밥!!!' },
        { writer: '아잉으니야', content: '난 언제 해줌?' },
        { writer: '엄...', content: '하늘이 집 가면 돼?' },
        { writer: 'kwonsky', content: '다 나가주세요. 혼자 있고 싶으니깐...' },
      ],
      ingredients: ['계란', '간장'],
    });
  }

  render() {
    const { recipeDetail } = this.props;
    const {
      recipeDetail: { comments },
    } = this.props;
    return (
      <View>
        <Header
          style={{ flex: 1 }}
          backgroundColor="#00BD75"
          leftComponent={
            <Button
              icon={<AntDesign name="back" size={24} color="white" />}
              buttonStyle={styles.backButton}
              onPress={() => this.props.navigation.goBack()}
            />
          }
        />
        <Card>
          <Card.Title h3 style={styles.leftAlign}>
            {recipeDetail.title}
          </Card.Title>
          <Card.Title style={styles.leftAlign}>
            {recipeDetail.writer}
            {'\n'}
            조회수 : {recipeDetail.view} | 평점 : {recipeDetail.rate}
          </Card.Title>
          <Card.Divider />
          {/* <Card.Image source={require('../images/pic2.jpg')} /> */}
          <Text style={{ marginBottom: 10 }}>{recipeDetail.content}</Text>
        </Card>
        <Card>
          <Card.Title h4 style={styles.leftAlign}>
            댓글
          </Card.Title>
          {comments.map((comment: Object, i: number) => (
            <View key={i}>
              <Card.Divider />
              <Text>{comment.writer}</Text>
              <Text style={{ marginBottom: 10 }}>{comment.content}</Text>
            </View>
          ))}
        </Card>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    recipeDetail: state.community.recipeDetail,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    detail: (recipe: Object) => dispatch(detail(recipe)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: '#00BD75',
  },
  leftAlign: {
    textAlign: 'left',
  },
});
