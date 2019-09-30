import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import { NavigationActions } from 'react-navigation';

import axios from 'axios';

// Login
type Props = {
  navigation: any;
};
interface State {
  email: string;
  username: string;
  password: string;
}
export default class LoginScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
    };
  }

  handleJoin() {
    axios
      .post('http://13.125.244.90:8000/auth/signup', {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      })
      // .then(this.props.navigation.dispatch(NavigationActions.back()))
      .then(this.props.navigation.navigate('Login'))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Text style={styles.title}> WelCome🚀</Text>
            <TextInput
              style={styles.textForm}
              // keyboardType="email-address"
              placeholder={'ID'}
              onChangeText={input => this.setState({ email: input })}
            />
            <TextInput
              style={styles.textForm}
              secureTextEntry={true}
              placeholder={'Password'}
              onChangeText={input => this.setState({ password: input })}
            />
            <TextInput
              style={styles.textForm}
              placeholder={'Username'}
              onChangeText={input => this.setState({ username: input })}
            />
            <View
              style={{
                height: '35%',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%',
              }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={this.handleJoin.bind(this)}
              >
                <Text style={styles.buttonTitle}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 30,
    color: '#fff',
    alignItems: 'center',
    width: '100%',
    padding: '10%',
    paddingTop: 100,
  },
  textForm: {
    // flex: 1,
    width: '70%',
    height: '8%',
    color: 'ghostwhite',
    paddingLeft: 15,
    paddingRight: 5,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#888',
  },
  button: {
    width: '90%',
    height: '30%',
    borderColor: 'plum',
    borderWidth: 3,
    borderRadius: 40,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    fontSize: 20,
    color: 'ghostwhite',
    fontWeight: 'bold',
  },
});
