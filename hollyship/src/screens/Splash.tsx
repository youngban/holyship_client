import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import { Layout, Text } from 'react-native-ui-kitten';

interface Props {
  navigation: any;
}

export default class Splash extends Component<Props> {
  componentDidMount = () => {
    this.checkAccessToken();
  };

  checkAccessToken = async () => {
    const ascyncItem = await AsyncStorage.getItem('access_token');
    if (ascyncItem) {
      await this.props.navigation.navigate('Home');
    } else {
      setTimeout(() => {
        this.props.navigation.navigate('Login');
      }, 1500);
    }
  };

  render() {
    return (
      <Layout style={styles.container}>
        <Text category="h1" style={styles.title}>
          Holly Ship
        </Text>
        <Image source={require('../Image/mainicon.png')} />
        <ActivityIndicator size="large" color="0000ff" />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    textShadowOffset: { width: 4, height: 2 },
    textShadowRadius: 20,
    textShadowColor: 'red',
  },
});
