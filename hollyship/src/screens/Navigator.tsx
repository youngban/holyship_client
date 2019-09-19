import React, { Component } from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './StartScreen';
import Join from './JoinScreen';
import { createSwitchNavigator } from 'react-navigation';

const PressJoin = createStackNavigator(
  {
    Main: { screen: Main },
    Join: { screen: Join },
  },

  { initialRouteName: 'Main' }
);

export default createAppContainer(PressJoin);

const MainNavi = createStackNavigator({});

const PressLogin = createSwitchNavigator({
  MainNavi,
});
