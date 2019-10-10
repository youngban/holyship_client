import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from 'react-native';
import { PREFIX_URL } from '../config/config';

const axios = require('axios');

interface Props {
  navigation: any;
}
interface State {}
export default class StartScreen extends Component<Props, State> {
  hand() {
    axios.get(`${PREFIX_URL}/auth/logout`).then(console.log('hi'));
    // .catch(err => Alert.alert(err));
  }

  componentDidMount() {
    this.checkAccessToken();
  }

  checkAccessToken = async () => {
    const asyncItem = await AsyncStorage.getItem('access_token');
    console.log('[ACCESS_TOKEN]', asyncItem);
    if (asyncItem) {
      await this.props.navigation.navigate('Home');
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.icon}>
          <Image style={styles.img} source={require('../Image/1.png')} />
        </View>
        <View style={styles.title}>
          <Text style={styles.hollyship}>Hollyship</Text>
        </View>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate('Join');
            }}
          >
            <Text style={styles.signBtn}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate('Login');
            }}
          >
            <Text style={styles.signBtn}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }} onPress={this.hand.bind(this)}>
            <Text style={styles.signBtn}>Log Out</Text>
          </TouchableOpacity>
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
  img: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    paddingTop: 40,
  },
  icon: {
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  title: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
  },
  hollyship: {
    color: 'ghostwhite',
    fontSize: 40,
    marginBottom: 60,
    fontWeight: 'bold',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 20,
    textShadowColor: 'red',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'ghostwhite',
  },
  btn: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '60%',
    borderColor: 'plum',
    borderWidth: 3,
    borderRadius: 40,
    height: '27%',
  },
  signBtn: {
    color: 'ghostwhite',
    fontSize: 25,
    fontWeight: 'bold',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 20,
    textShadowColor: 'red',
  },
});
