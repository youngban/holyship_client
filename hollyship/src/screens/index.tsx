import React from 'react';
import { Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createSwitchNavigator } from 'react-navigation';

import CategoryScreen from './CategoryScreen';
import HomeScreen from './HomeScreen';
import ChartScreen from './ChartScreen';
import UserScreen from './UserScreen';
import Main from './StartScreen';
import Join from './JoinScreen';
import Login from './LoginScreen';

const HomeStack = createStackNavigator(
  {
    HomeScreen,
  },
  {
    defaultNavigationOptions: () => ({
      title: 'Home',
    }),
  }
);
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
const TabNavigator = createBottomTabNavigator(
  {
    Category: CategoryStack,
    Home: HomeStack,
    Chart: ChartStack,
    Mypage: UserStack,
  },
  {
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
      activeTintColor: '#46c3ad',
      inactiveTintColor: '#888',
    },
  }
);

const Appstack = createStackNavigator(
  {
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Main: { screen: Main },
    Join: { screen: Join },
    // Login: { screen: Login },
  },
  { initialRouteName: 'Main' }
);

const AuthStack = createStackNavigator({
  Login: { screen: Login },
});

// export default createAppContainer(Appstack);

const Total = createSwitchNavigator({
  App: Appstack,
  Auth: AuthStack,
});

export default createAppContainer(Total);
