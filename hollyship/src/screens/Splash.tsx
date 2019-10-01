import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';

interface Props {
  navigation: any;
}

export default class Splash extends Component<Props> {
  constructor(props) {
    super(props);
    setTimeout(() => {
      this.props.navigation.navigate('Start');
    }, 1500);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Holly Ship</Text>
        <Image source={require('../Image/mainicon.png')} />
        <ActivityIndicator size="large" color="0000ff" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    textShadowOffset: { width: 4, height: 2 },
    textShadowRadius: 20,
    textShadowColor: 'red',
  },
});
