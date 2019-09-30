import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Angry from './Angry';
import Blank from './Blank';
import Chill from './Chill';
import Confused from './Confused';
import Happy from './Happy';
import Sad from './Sad';

const EmotionNav = createMaterialTopTabNavigator(
  {
    Happy,
    Sad,
    Chill,
    Confused,
    Angry,
    Blank,
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 15,
      },
      activeTintColor: 'ghostwhite',
      inactiveTintColor: 'tomato',
      style: {
        backgroundColor: 'black',
        borderTopColor: 'tomato',
        borderTopWidth: 1,
      },
    },
  }
);

export default createAppContainer(EmotionNav);
