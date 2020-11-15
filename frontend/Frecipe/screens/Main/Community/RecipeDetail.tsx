import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { Header, Text, Button, Card, Input } from 'react-native-elements';

import { AntDesign } from '@expo/vector-icons';

import { connect, Dispatch } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import {
  list,
  detail,
  Context,
  Ingredient,
  Sauces,
  Img,
} from '../../../redux/communitySlice';

import api from '../../../api';

interface Props {
  navigation: any;
  route: any;
  detail: typeof detail;
  list: typeof list;
  recipeDetail: {
    recipeNo: number;
    mainImage: string;
    title: string;
    nickname: string;
    contexts: Array<Context>;
    view: number;
    rate: number;
    comments: Array<Comment>;
    mainIngredients: Array<Ingredient>;
    ingredients: Array<Ingredient>;
    sauces: Array<Sauces>;
    completeImage: Array<Img>;
  };
  token: string;
}

interface State {
  comment: string;
}

class RecipeDetail extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      comment: '',
    };
  }

  commentCreate = async () => {
    const commentObject = {
      content: this.state.comment,
      recipeNo: this.props.recipeDetail.recipeNo,
    };
    await api.createComment(commentObject, this.props.token);

    const recipeDetail = await api.recipeDetail(
      this.props.recipeDetail.recipeNo,
    );
    this.props.detail(recipeDetail.data);
    const recipe = await api.getRecipe();
    this.props.list(recipe.data);
  };

  render = () => {
    const recipeDetail = this.props.recipeDetail;
    return (
      <ScrollView>
        <Header
          style={{ flex: 1 }}
          backgroundColor="#00BD75"
          leftComponent={
            <Button
              icon={<AntDesign name="back" size={24} color="white" />}
              buttonStyle={styles.backButton}
              onPress={() => this.props.navigation.navigate('CommunityHome')}
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
            <Card.Image source={{ uri: recipeDetail.completeImage[0].image }} />
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
            {recipeDetail.sauces.map((s: any, i: number) => (
              <Text key={i} style={styles.centerAlign}>
                {s.name} : {s.quantity}
              </Text>
            ))}
            {recipeDetail.contexts.map((c: any, i: number) => (
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
          <Input
            placeholder="댓글을 입력해주세요."
            rightIcon={
              <Button
                title="확인"
                buttonStyle={styles.backButton}
                titleStyle={{ fontSize: 15 }}
                onPress={this.commentCreate}
              ></Button>
            }
            onChangeText={(value: string) => this.setState({ comment: value })}
          />
          {recipeDetail.comments.map((comment: any, i: number) => (
            <View key={i}>
              <Card.Divider />
              <Text>{comment.nickname}</Text>
              <Text style={{ marginBottom: 10 }}>{comment.content}</Text>
            </View>
          ))}
        </Card>
      </ScrollView>
    );
  };
}

const mapStateToProps = (state: RootState) => {
  return {
    recipeDetail: state.community.recipeDetail,
    token: state.usersReducer.token,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    list: (form: any) => dispatch(list(form)),
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
