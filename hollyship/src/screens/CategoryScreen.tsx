import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from 'react-native-elements';

class CategoryScreen extends Component {
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

const CategoryStack = createStackNavigator(
  {
    CategoryScreen,
  },
  {
    defaultNavigationOptions: () => ({
      title: 'Category',
    }),
  }
);

export default CategoryStack;
