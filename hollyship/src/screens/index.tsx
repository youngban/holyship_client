import React from 'react';
import { Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Start from './StartScreen';
import Join from './JoinScreen';
import Login from './LoginScreen';
import HomeStack from './HomeScreen';
import CategoryStack from './CategoryScreen';
import ChartStack from './ChartScreen';
import UserStack from './UserScreen';
import Splash from './Splash';

const AuthStack = createStackNavigator(
  {
    Start,
    Join,
    Login,
  },
  { initialRouteName: 'Start', headerMode: 'none' }
);

const TabNavigator = createBottomTabNavigator(
  {
    Category: CategoryStack,
    Home: HomeStack,
    Chart: ChartStack,
    Mypage: UserStack,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let icon = ':thought_balloon:';
        if (routeName === 'Home') {
          icon = '🚀';
        } else if (routeName === 'Chart') {
          icon = '🎡';
        } else if (routeName === 'Category') {
          icon = '💘';
        } else if (routeName === 'Mypage') {
          icon = '💁‍';
        }
        return (
          <Text style={{ color: (focused && '#46c3ad') || '#888' }}>
            {icon}
          </Text>
        );
      },
    }),
    lazy: false,
    tabBarOptions: {
      activeBackgroundColor: '#100759',
      inactiveBackgroundColor: '#100759',
      activeTintColor: '#46c3ad',
      inactiveTintColor: '#888',
    },
  }
);

const Total = createSwitchNavigator(
  {
    Splash,
    App: TabNavigator,
    Auth: AuthStack,
  },
  { initialRouteName: 'Splash' }
);

export default createAppContainer(Total);
