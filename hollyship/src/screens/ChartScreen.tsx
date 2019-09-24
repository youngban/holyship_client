import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { ButtonGroup, Button } from 'react-native-elements';
import Sad from '../components/Emotion/Sad';
import Happy from '../components/Emotion/Happy';
import Rage from '../components/Emotion/Rage';
import Fear from '../components/Emotion/Fear';
import Chill from '../components/Emotion/Chill';
import Blank from '../components/Emotion/Blank';

interface Props {
  navigation: any;
  Button: string;
  Props: any;
  title: string;
}
interface State {
  currentEmotion: string;
  selectedIndex: number;
}

class ChartScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      currentEmotion: '',
    };

    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  component1 = () => (
    <Button
      title="Sad"
      type="clear"
      onPress={() => this.setState({ currentEmotion: 'Sad' })}
    />
  );
  component2 = () => (
    <Button
      title="Happy"
      type="clear"
      onPress={() => this.setState({ currentEmotion: 'Happy' })}
    />
  );
  component3 = () => (
    <Button
      title="Rage"
      type="clear"
      onPress={() => this.setState({ currentEmotion: 'Rage' })}
    />
  );
  component4 = () => (
    <Button
      title="Fear"
      type="clear"
      onPress={() => this.setState({ currentEmotion: 'Fear' })}
    />
  );
  component5 = () => (
    <Button
      title="Chill"
      type="clear"
      onPress={() => this.setState({ currentEmotion: 'Chill' })}
    />
  );
  component6 = () => (
    <Button
      title="Blank"
      type="clear"
      onPress={() => this.setState({ currentEmotion: 'Blank' })}
    />
  );

  render() {
    const buttons = [
      { element: this.component1 },
      { element: this.component2 },
      { element: this.component3 },
      { element: this.component4 },
      { element: this.component5 },
      { element: this.component6 },
    ];

    return (
      <View style={styles.container}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedButtonStyle={{ backgroundColor: 'yellow' }}
          buttons={buttons}
          containerStyle={{ height: 60, width: 340 }}
        />
        <View style={styles.container}>
          {this.state.currentEmotion === 'Sad' ? (
            <Sad />
          ) : this.state.currentEmotion === 'Happy' ? (
            <Happy />
          ) : this.state.currentEmotion === 'Rage' ? (
            <Rage />
          ) : this.state.currentEmotion === 'Fear' ? (
            <Fear />
          ) : this.state.currentEmotion === 'Chill' ? (
            <Chill />
          ) : (
            <Blank />
          )}
        </View>
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
    }),
  }
);

export default ChartStack;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: 'black',
    paddingTop: '15%',
  },
  Button: {
    margin: 80,
    marginRight: 40,
    padding: 70,
  },
  // Btn: {
  //   backgroundColor: 'white',
  // },
});
