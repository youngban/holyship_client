import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Follow from './Follow';
import Like from './Like';
import PlayList from './PlayList';
import Posting from './Posting';

const AppNavigator = createMaterialTopTabNavigator(
  {
    PlayList,
    Like,
    Follow,
    Posting,
  },
  {
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'tomato',
      showIcon: true,
      style: {
        backgroundColor: '#100759',
      },
    },
  }
);

export default createAppContainer(AppNavigator);
