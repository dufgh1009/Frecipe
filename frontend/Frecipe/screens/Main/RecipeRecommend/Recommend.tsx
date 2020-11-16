import React from 'react';
import RecipeRecommend from './RecipeRecommend';
import RecipeDetail from '../Community/RecipeDetail';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { enableScreens } from 'react-native-screens';

enableScreens();
const Stack = createNativeStackNavigator();

interface Props {}

export function Recommend(props: Props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="RecipeRecommend" component={RecipeRecommend} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
    </Stack.Navigator>
  );
}
