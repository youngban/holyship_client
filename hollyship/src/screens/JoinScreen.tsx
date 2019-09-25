import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
const axios = require('axios');

// Login
type Props = {};
export default class LoginScreen extends Component<Props> {
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
      .post('http://192.168.0.10:8000/auth/signup', {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      })
      .then(this.props.navigation.dispatch(NavigationActions.back()))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleArea}>
          <Text style={styles.title}>Wellcome 🚀</Text>
        </View>
        <View style={styles.formArea}>
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
        </View>
        <View style={styles.buttomArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleJoin.bind(this)}
          >
            <Text style={styles.buttonTitle}>Sign Up</Text>
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
    paddingLeft: '10%',
    paddingRight: '10%',
    justifyContent: 'center',
  },
  titleArea: {
    width: '100%',
    padding: '10%',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: 'white',
    paddingTop: '10%',
  },
  formArea: {
    width: '100%',
    paddingTop: '15%',
    paddingBottom: -40,
  },
  textForm: {
    borderWidth: 0.5,
    borderColor: '#888',
    width: '100%',
    height: '17%',
    paddingLeft: 15,
    paddingRight: 5,
    marginBottom: 30,
    borderRadius: 30,
    color: 'white',
  },
  buttomArea: {
    width: '100%',
    height: '10%',
  },
  button: {
    backgroundColor: '#46c3ad',
    borderRadius: 30,
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
