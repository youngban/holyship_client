import React, { Component } from 'react';
import { StyleSheet, Button, View, Text, Alert } from 'react-native';
const axios = require('axios');

interface Props {
  navigation: any;
}
interface State {}
export default class StartScreen extends Component<Props, State> {
  hand() {
    axios.get('http://13.125.244.90:8000/auth/logout').then(console.log('hi'));
    // .catch(err => Alert.alert(err));
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <View>
          <Text style={styles.title}>Hollyship</Text>
        </View>
        <View>
          <Button
            title="Join us"
            onPress={() => {
              navigation.navigate('Join');
            }}
          />
        </View>
        <View>
          <Button
            title="Log in"
            onPress={() => {
              navigation.navigate('Login');
            }}
          />
        </View>
        <View>
          <Button title="Log-Out" onPress={this.hand.bind(this)} />
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
