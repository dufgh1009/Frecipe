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
  Sauces,
  Img,
} from '../../../redux/communitySlice';

import api from '../../../api';

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
    sauce: Array<Sauces>;
    completeImage: Array<Img>;
  };
}

class RecipeDetail extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount = () => {
    const recipeNo = this.props.navigation.getParam('recipeNo');
    console.log(recipeNo);
    // const { data } = await api.recipeDetail(recipeNo);
    // console.log(data);
    // this.props.detail()
  };

  render() {
    const { recipeDetail } = this.props;

    return (
      <View>
        {/* <Header
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
        </Card> */}
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
