import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
const axios = require('axios');

// Login
type Props = {
  navigation: any;
};
type State = {
  email: string;
  password: string;
};

export default class LoginScreen extends Component<Props, State> {
  static navigationOptions = {
    header: 'Login',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleLogin() {
    console.log(this.state);

    axios
      .post('http://13.125.244.90:8000/auth/login', {
        email: this.state.email,
        password: this.state.password,
      })
      .then(res => {
        console.log(res);
        console.log(res.status);
        if (res.status === 200) {
          this.props.navigation.navigate('Home');
        }
      })
      .catch(err => Alert.alert('아이디 / 비밀번호가 맞지않습니다.'));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleArea}>
          <Text style={styles.title}>Holly Ship 🚀</Text>
        </View>
        <View style={styles.formArea}>
          <TextInput
            style={styles.textForm}
            placeholder="ID"
            // value={this.state.username}
            onChangeText={text => this.setState({ email: text })}
          />
          <TextInput
            style={styles.textForm}
            secureTextEntry={true}
            placeholder={'Password'}
            // value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
          />
        </View>
        <View style={styles.buttomArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleLogin.bind(this)}
            // onPress={() => {
            //   this.props.navigation.navigate('Home');
            // }}
          >
            <Text style={styles.buttonTitle}>Login</Text>
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
    paddingBottom: '20%',
  },
  title: {
    fontSize: 30,
    color: 'white',
  },
  formArea: {
    width: '100%',
    paddingBottom: '10%',
  },
  textForm: {
    borderWidth: 0.5,
    borderColor: '#888',
    width: '100%',
    height: '20%',
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
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
