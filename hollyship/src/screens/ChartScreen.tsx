import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { ButtonGroup, Button } from 'react-native-elements';
import EmotionNav from '../components/Emotion/index';

const EmotionChart = createAppContainer(EmotionNav);

interface Props {
  navigation: any;
  Button: string;
  Props: any;
  title: string;
}
interface State {}

class ChartScreen extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.line}></View>
        <EmotionChart />
      </View>
    );
  }
}

const ChartStack = createStackNavigator(
  {
    Chart: {
      screen: ChartScreen,
    },
  },
  {
    defaultNavigationOptions: () => ({
      title: 'Chart',
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: 'ghostwhite',
    }),
  }
);

export default ChartStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // paddingTop: '15%',
  },
  line: {
    backgroundColor: 'red',
  },
});
