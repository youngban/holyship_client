import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

export default class CategoryScreen extends Component {
  render() {
    console.log(this.props);
    return (
      <View>
        <Icon
          name="sentiment-neutral"
          type="MaterialIcons"
          size={60}
          onPress={() => this.props.navigation.navigate('EmotionScreen')}
        >
          <Text>happy</Text>
        </Icon>
      </View>
    );
  }
}
