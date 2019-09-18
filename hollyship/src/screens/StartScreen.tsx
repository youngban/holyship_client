import React, { Component } from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';

type Props = {};
export default class StartScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <View style={styles.title}>
          <Text style={{ fontSize: 35, color: 'white' }}>Hollyship</Text>
        </View>
        <View>
          <Button title="Join us" onPress={() => alert('click')} />
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
  },
  header: {
    width: '100%',
    height: '5%',
    //backgroundColor: '#ff9a9a',
  },
  title: {
    width: '100%',
    height: '18%',
    justifyContent: 'center',
    //backgroundColor: '#9aa9ff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    //backgroundColor: '#d6ca1a',
  },
  footer: {
    width: '100%',
    height: '20%',
    //backgroundColor: '#1ad657',
  },
});
