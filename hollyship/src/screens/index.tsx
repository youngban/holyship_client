import React from 'react';
import { Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import CategoryScreen from './CategoryScreen';
import HomeScreen from './HomeScreen';
import ChartScreen from './ChartScreen';
import UserScreen from './UserScreen';

const HomeStack = createStackNavigator(
  {
    HomeScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: 'Home',
    }),
  }
);
const CategoryStack = createStackNavigator(
  {
    CategoryScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: 'Category',
    }),
  }
);

const ChartStack = createStackNavigator(
  {
    ChartScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: 'Chart',
    }),
  }
);

const UserStack = createStackNavigator(
  {
    UserScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: 'MyPage',
    }),
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Category: CategoryStack,
    Home: HomeStack,
    Chart: ChartStack,
    Mypage: UserStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;

        let icon = ':thought_balloon:';
        if (routeName === 'Home') {
          icon = ':flying_saucer:';
        } else if (routeName === 'Chart') {
          icon = ':robot_face:';
        } else if (routeName === 'Category') {
          icon = ':heart_decoration:';
        } else if (routeName === 'Mypage') {
          icon = ':shrug:?‍';
        let icon = '💭';
        if (routeName === 'Home') {
          icon = '🛸';
        } else if (routeName === 'Chart') {
          icon = '🤖';
        } else if (routeName === 'Category') {
          icon = '💟';
        } else if (routeName === 'Mypage') {
          icon = '🤷‍';

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
      activeTintColor: '#46c3ad',
      inactiveTintColor: '#888',
    },
  }
);

const Appstack = createStackNavigator({
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
});

export default createAppContainer(Appstack);
