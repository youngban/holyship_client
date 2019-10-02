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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
        let icon;
        if (routeName === 'Home') {
          icon = <Icon name="home-variant-outline" size={30}></Icon>;
        } else if (routeName === 'Chart') {
          icon = <Icon name="menu" size={30}></Icon>;
        } else if (routeName === 'Category') {
          icon = <Icon name="emoticon-wink-outline" size={30}></Icon>;
        } else if (routeName === 'Mypage') {
          icon = <Icon name="account" size={30}></Icon>;
        }
        return (
          <Text style={{ color: (focused && '#FFFFFF') || '#888' }}>
            {icon}
          </Text>
        );
      },
    }),
    lazy: false,
    tabBarOptions: {
      activeBackgroundColor: '#272525',
      inactiveBackgroundColor: '#272525',
      activeTintColor: '#FFFFFF',
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
