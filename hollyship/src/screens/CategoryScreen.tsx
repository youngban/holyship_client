import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from 'react-native-elements';
import EmotionScreen from './EmotionScreen';

class CategoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { category: '' };
  }

  // setState의 category에 변수를 사용해서 handlePress를 다이내믹하게 사용할 수 있도록 리팩토링하기
  handlePress1() {
    this.setState({ category: 'HAPPY' });
    this.props.navigation.navigate('EmotionScreen', {
      key: this.state.category,
    });
  }

  handlePress2() {
    this.setState({ category: '그냥' });
    this.props.navigation.navigate('EmotionScreen', {
      key: this.state.category,
    });
  }

  handlePress3() {
    this.setState({ category: 'SAD' });
    this.props.navigation.navigate('EmotionScreen', {
      key: this.state.category,
    });
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', marginTop: 30 }}>
        <View>
          <Icon name="mood" size={60} onPress={() => this.handlePress1()} />
          <Text style={{ textAlign: 'center' }}>HAPPY</Text>
        </View>
        <View>
          <Icon
            name="sentiment-neutral"
            size={60}
            onPress={() => this.handlePress2()}
          ></Icon>
          <Text accessibilityLabel="그냥" style={{ textAlign: 'center' }}>
            그냥
          </Text>
        </View>
        <View>
          <Icon name="mood-bad" size={60} onPress={() => this.handlePress3()} />
          <Text style={{ textAlign: 'center' }}>SAD</Text>
        </View>
      </View>
    );
  }
}

const CategoryStack = createStackNavigator(
  {
    CategoryScreen,
    EmotionScreen,
  },
  {
    defaultNavigationOptions: () => ({
      title: 'Category',
    }),
  }
);

export default CategoryStack;
