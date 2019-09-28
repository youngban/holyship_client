import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

type Props = {
  navigation: NavigationStackProp<{}>;
};
export default class ReadScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const post = this.props.navigation.getParam('post');
    return (
      <View>
        <Text>{post.title}</Text>
        <Text>{post.user.username}</Text>
        <Text>{post.createdAt}</Text>
        <Text>{post.content}</Text>
      </View>
    );
  }
}
