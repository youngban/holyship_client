import React, { Component } from 'react';
import { Text } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

type Props = {
  navigation: NavigationStackProp<{ category: 'string' }>;
};
export default class EmotinScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('category'),
    };
  };
  render() {
    const header = this.props.navigation.state.params.category;

    return <Text>{header}</Text>;
  }
}
