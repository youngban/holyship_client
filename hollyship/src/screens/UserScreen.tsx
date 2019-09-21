import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Text } from 'react-native';

class UserScreen extends Component {
  render() {
    return <Text>User</Text>;
  }
}

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

export default UserStack;
