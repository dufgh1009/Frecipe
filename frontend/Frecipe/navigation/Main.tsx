import * as React from 'react';
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons';
import Refrigerator from '../screens/Main/Refrigerator/Refrigerator';
import Setting from '../screens/Main/Setting/Setting';
import { Recommend } from '../screens/Main/RecipeRecommend/Recommend';
import { Community } from '../screens/Main/Community/Community';
import MyCamera from './Camera';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

interface Props {
  onCamera: () => void;
}

function MainPage(props: Props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';
          if (route.name === '냉장고') {
            iconName = focused ? 'cart' : 'cart-outline';
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === '마이페이지') {
            iconName = focused ? 'person' : 'person-outline';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === '레시피 추천') {
            iconName = focused ? 'book-open' : 'book-open-outline';
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === '커뮤니티') {
            iconName = focused ? 'card-text' : 'card-text-outline';
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        activeBackgroundColor: '#00BD75',
        inactiveBackgroundColor: '#00BD75',
        activeTintColor: '#017a4c',
        inactiveTintColor: 'white',
      }}
    >
      <Tab.Screen name="냉장고">
        {() => <Refrigerator onCamera={props.onCamera} />}
      </Tab.Screen>
      <Tab.Screen name="레시피 추천" component={Recommend} />
      <Tab.Screen name="커뮤니티">
        {() => <Community onCamera={props.onCamera} />}
      </Tab.Screen>
      <Tab.Screen name="마이페이지" component={Setting} />
    </Tab.Navigator>
  );
}

enableScreens();
const Stack = createNativeStackNavigator();

export default function Main() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="MainPage"
        children={({ navigation }) => (
          <MainPage onCamera={() => navigation.navigate('MyCamera')}></MainPage>
        )}
      />
      <Stack.Screen
        name="MyCamera"
        children={({ navigation }) => (
          <MyCamera navigation={navigation}></MyCamera>
        )}
      />
    </Stack.Navigator>
  );
}
