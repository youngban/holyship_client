import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Text } from 'react-native';

class ChartScreen extends Component {
  render() {
    return <Text>Chart</Text>;
  }
}

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

export default ChartStack;
