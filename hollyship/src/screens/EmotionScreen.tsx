import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
const axios = require('axios');

type Props = {
  navigation: NavigationStackProp<{ category: 'string'; data: 'array' }>;
};

export default class EmotinScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('category'),
    };
  };

  handlePress(id) {
    axios
      .get(`http://13.125.244.90:8000/post/${id}`)
      .then(res => {
        this.props.navigation.navigate('ReadScreen', {
          post: res.data,
          comment: res.data.comments,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.props.navigation.getParam('data')}
          renderItem={({ item }) => (
            <Text
              onPress={() => this.handlePress(item.id)}
              key={item.id}
            >{`${item.title}`}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
