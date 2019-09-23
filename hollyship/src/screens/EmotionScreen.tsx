import React, { Component } from 'react';
import { Text } from 'react-native';

export default class EmotinScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('key'),
    };
  };
  render() {
    const key = this.props.navigation.state.params.key;

    return <Text>{key}</Text>;
  }
}
