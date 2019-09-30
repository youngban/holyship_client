import React from 'react';
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
      activeTintColor: 'ghostwhite',
      inactiveTintColor: 'tomato',
      style: {
        backgroundColor: 'black',
      },
    },
  }
);

export default createAppContainer(AppNavigator);
