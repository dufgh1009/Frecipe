import React from 'react';
import CommunityHome from './CommunityHome';
import RecipeCreate from './RecipeCreate';
import RecipeDetail from './RecipeDetail';

import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

enableScreens();
const Stack = createNativeStackNavigator();

interface Props {
  onCamera: () => void;
}

export function Community(props: Props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CommunityHome" component={CommunityHome} />
      <Stack.Screen
        name="RecipeCreate"
        children={({ navigation }) => (
          <RecipeCreate
            navigation={navigation}
            onCamera={props.onCamera}
          ></RecipeCreate>
        )}
      />
      <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
    </Stack.Navigator>
  );
}
