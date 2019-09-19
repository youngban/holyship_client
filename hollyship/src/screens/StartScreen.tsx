import React, { Component } from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';

type Props = {};
export default class StartScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <View>
          <Text style={styles.title}>Hollyship</Text>
        </View>
        <View>
          <Button title="Join us" onPress={() => alert('click')} />
        </View>
        <View>
          <Button title="Log in" onPress={() => alert('click')} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    height: '5%',
    //backgroundColor: '#ff9a9a',
  },
  title: {
    fontSize: 35,
    color: 'white',
    width: '100%',
    paddingTop: '10%',
    justifyContent: 'center',
    //backgroundColor: '#9aa9ff',
  },
  content: {
    alignItems: 'center',
    paddingBottom: 30,
    marginBottom: 30,
    //backgroundColor: '#d6ca1a',
  },
});
