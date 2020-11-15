import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {
  Header,
  Text,
  ListItem,
  Button,
  Card,
  Icon,
} from 'react-native-elements';

import { AntDesign } from '@expo/vector-icons';

import { connect, Dispatch } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import {
  detail,
  Context,
  Ingredient,
  Sauce,
  Img,
} from '../../../redux/communitySlice';

interface Props {
  navigation: any;
  detail: typeof detail;
  recipeDetail: {
    recipeNo: number;
    mainImage: string;
    title: string;
    nickname: string;
    context: Array<Context>;
    view: number;
    rate: number;
    comments: Array<Comment>;
    mainIngredients: Array<Ingredient>;
    ingredients: Array<Ingredient>;
    sauce: Array<Sauce>;
    completeImage: Array<Img>;
  };
}

class RecipeDetail extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    const { detail } = this.props;
    detail({
      recipeNo: 1,
      mainImage:
        'https://image.ajunews.com/content/image/2020/08/09/20200809151032760474.jpg',
      title: '간장계란밥',
      nickname: 'kwonsky',
      context: [
        {
          text: '긴 하루의 끝에서 전해오는~',
          image:
            'http://imbbsfile.imbc.com/entertain07/goldfish_photo/201507/goldfish_photo150713135723entertain2.jpg',
        },
        {
          text: '내 마음 속에 꼭 숨겨둔 이야기이이이',
          image:
            'https://pds.joins.com/news/component/htmlphoto_mmdata/201905/21/2a82311c-9907-435d-bcaa-579cebafefb1.jpg',
        },
        {
          text: 'ㅋㅋ 먼 훗날 언젠가는',
          image:
            'https://post-phinf.pstatic.net/MjAxOTA2MjZfMTg1/MDAxNTYxNTI3MTI4MDU4.6jdvCViU0lmNqVm-z2cEp-LjFuMmb67-KS9erNMkVy4g.l7-fRM8FHbaNb7dU7nebEnCyY3oNrOGVXPkQDDPiCNMg.JPEG/%EC%9C%A0%EB%85%B8%EC%9C%A4%ED%98%B8_2.jpg',
        },
      ],
      view: 9,
      rate: 4.5,
      comments: [
        { nickname: '성중이', content: '맛없겠다.', rate: 5 },
        { nickname: '성여로', content: '나도 간계밥!!!', rate: 5 },
        { nickname: '아잉으니야', content: '난 언제 해줌?', rate: 5 },
        { nickname: '엄...', content: '하늘이 집 가면 돼?', rate: 5 },
        {
          nickname: 'kwonsky',
          content: '다 나가주세요. 혼자 있고 싶으니깐...',
          rate: 5,
        },
      ],
      mainIngredients: [{ name: '간장' }, { name: '계란' }, { name: '참기름' }],
      ingredients: [{ name: '밥' }, { name: '숟가락' }, { name: '젓가락' }],
      sauce: [
        {
          name: '지으니',
          quantity: '10명',
        },
      ],
      completeImage: [{ image: '' }, { image: '' }, { image: '' }],
    });
  }

  render() {
    const { recipeDetail } = this.props;
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
            {recipeDetail.nickname}
            {'\n'}
            조회수 : {recipeDetail.view} | 평점 : {recipeDetail.rate}
          </Card.Title>
          <Card.Divider />
          <ScrollView>
            <View style={styles.buttonContainer}>
              {recipeDetail.mainIngredients.map(
                (ingredient: any, i: number) => (
                  <Button
                    key={i}
                    title={ingredient.name}
                    buttonStyle={styles.ingredientButton}
                    titleStyle={styles.buttonTitle}
                  />
                ),
              )}
            </View>
            <Card.Image source={{ uri: recipeDetail.mainImage }} />
            <Text h4 style={styles.centerAlign}>
              재료
            </Text>
            {recipeDetail.ingredients.map((ingredient: any, i: number) => (
              <Text key={i} style={styles.centerAlign}>
                {ingredient.name}
              </Text>
            ))}
            <Text h4 style={styles.centerAlign}>
              양념재료
            </Text>
            {recipeDetail.sauce.map((s: any, i: number) => (
              <Text key={i} style={styles.centerAlign}>
                {s.name} : {s.quantity}
              </Text>
            ))}
            {recipeDetail.context.map((c: any, i: number) => (
              <View key={i}>
                {c.image ? <Card.Image source={{ uri: c.image }} /> : <View />}
                <Text style={[{ marginBottom: 10 }, styles.centerAlign]}>
                  {c.text}
                </Text>
              </View>
            ))}
          </ScrollView>
        </Card>
        <Card>
          <Card.Title h4 style={styles.leftAlign}>
            댓글
          </Card.Title>
          {recipeDetail.comments.map((comment: any, i: number) => (
            <View key={i}>
              <Card.Divider />
              <Text>{comment.nickname}</Text>
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
  centerAlign: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 15,
  },
  ingredientButton: {
    backgroundColor: '#FFD700',
    width: 95,
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
});
