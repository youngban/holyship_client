import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class FollowBtn extends Component {
  state = {
    toggle: true,
  };

  _onPress() {
    const newState = !this.state.toggle;
    this.setState({ toggle: newState });
  }

  render() {
    const { toggle } = this.state;
    const textValue = toggle ? 'Follow' : 'UnFollow';
    const buttonChange = toggle ? 'dodgerblue' : 'green';
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => this._onPress()}
            style={{
              margin: 10,
              width: 150,
              height: 50,
              backgroundColor: buttonChange,
              justifyContent: 'center',
              borderColor: 'white',
              borderRadius: 10,
            }}
          >
            <Text style={styles.text}>{textValue}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  // touch: {
  //   margin: 10,
  //   width: 150,
  //   height: 50,
  //   backgroundColor: this.buttonChange,
  //   justifyContent: 'center',
  //   borderColor: 'white',
  //   borderRadius: 10,
  // },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
});
