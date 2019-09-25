import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Text, View, StyleSheet, StatusBar } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';
import AppNavigator from '../components/Mypage/index';

const AppIndex = createAppContainer(AppNavigator);

class UserScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="red" barStyle="light-content" />
        <View style={styles.header}>
          <Icon name="settings" size={28} color="white" />
        </View>
        <AppIndex />
      </View>
    );
  }
}

const UserStack = createStackNavigator(
  {
    UserScreen,
  },
  {
    defaultNavigationOptions: () => ({
      title: 'MyPage',
      headerStyle: {
        backgroundColor: '#100759',
      },
      headerTintColor: '#fff',
    }),
  }
);

export default UserStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'black',
    color: 'white',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
