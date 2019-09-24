import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
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

    return <View>{/* flat List로 해당 카테고리의 글들을 렌더링*/}</View>;
  }
}
