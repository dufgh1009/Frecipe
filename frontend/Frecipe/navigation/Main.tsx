import * as React from 'react';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import Refrigerator from "../screens/Main/Refrigerator";
import Setting from "../screens/Main/Setting";
import RecipeRecommend from "../screens/Main/RecipeRecommend";
import Community from "../screens/Main/Community";


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


export default function Main() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = "";
            if (route.name === '냉장고') {
              iconName = focused ? 'cart' : 'cart-outline';
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            } else if (route.name === '마이페이지') {
              iconName = focused ? 'person' : 'person-outline';
              return <MaterialIcons name={iconName} size={size} color={color} />;
            } else if (route.name === '레시피 추천') {
              iconName = focused ? 'book-open' : 'book-open-outline';
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            } else if (route.name === '커뮤니티') {
              iconName = focused ? 'card-text' : 'card-text-outline';
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
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
        <Tab.Screen name="냉장고" component={Refrigerator} />
        <Tab.Screen name="레시피 추천" component={RecipeRecommend} />
        <Tab.Screen name="커뮤니티" component={Community} />
        <Tab.Screen name="마이페이지" component={Setting} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}