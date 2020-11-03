import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CommunityHome from "./CommunityHome";
import RecipeCreate from "./RecipeCreate";

import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';



enableScreens();
const Stack = createNativeStackNavigator();


export function Community() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="CommunityHome" children={({ navigation }) => <CommunityHome navigation={navigation}></CommunityHome>}
      />
      <Stack.Screen name="RecipeCreate" children={({ navigation }) => <RecipeCreate navigation={navigation}></RecipeCreate>} />
    </Stack.Navigator>
  );
}