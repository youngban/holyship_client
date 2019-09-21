import React from 'react';
import { Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import CategoryScreen from './CategoryScreen';
import HomeScreen from './HomeScreen';
import ChartScreen from './ChartScreen';
import UserScreen from './UserScreen';
import Main from './StartScreen';
import Join from './JoinScreen';
import Login from './LoginScreen';
import HomeStack from './HomeScreen';

// const HomeStack = createStackNavigator(
//   {
//     HomeScreen,
//   },
//   {
//     defaultNavigationOptions: () => ({
//       title: 'Home',
//     }),
//   }
// );
const CategoryStack = createStackNavigator(
  {
    CategoryScreen,
  },
  {
    defaultNavigationOptions: () => ({
      title: 'Category',
    }),
  }
);
const ChartStack = createStackNavigator(
  {
    ChartScreen,
  },
  {
    defaultNavigationOptions: () => ({
      title: 'Chart',
    }),
  }
);
const UserStack = createStackNavigator(
  {
    UserScreen,
  },
  {
    defaultNavigationOptions: () => ({
      title: 'MyPage',
    }),
  }
);

// const Appstack = createStackNavigator(
//   {
//     HomeScreen,
//   },
//   {
//     defaultNavigationOptions: {
//       title: 'Home',
//       headerStyle: {
//         backgroundColor: '#100759',
//       },
//       headerTintColor: '#fff',
//     },
//   }
// );

const AuthStack = createStackNavigator(
  {
    Main,
    Join,
    Login,
  },
  { initialRouteName: 'Main', headerMode: 'none' }
);

// export default createAppContainer(Appstack);

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
          icon = ':flying_saucer:';
        } else if (routeName === 'Chart') {
          icon = ':robot_face:';
        } else if (routeName === 'Category') {
          icon = ':heart_decoration:';
        } else if (routeName === 'Mypage') {
          icon = ':shrug:?‍';
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
    App: TabNavigator,
    Auth: AuthStack,
  },
  { initialRouteName: 'Auth' }
);

export default createAppContainer(Total);
