import React, { Component } from 'react';
import {
  StyleSheet,
  Alert,
  AsyncStorage,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Layout, Text, Input, Button } from 'react-native-ui-kitten';

const axios = require('axios');

// Login
interface Props {
  navigation: any;
  header: string;
}

interface State {
  email: string;
  password: string;
}
export default class LoginScreen extends Component<Props, State> {
  static navigationOptions = {
    header: 'Login',
  };
  state = {
    email: '',
    password: '',
  };

  handleLogin = async () => {
    try {
      console.log(this.state);
      const { email, password } = this.state;
      const data = await axios.post('http://13.125.244.90:8000/auth/login', {
        email,
        password,
      });
      const token = data.data.token;

      if (data.status === 200) {
        this.props.navigation.navigate('Home');
      }
      if (token) {
        await AsyncStorage.setItem('access_token', token);
        console.log(token);
      }
    } catch (err) {
      Alert.alert('아이디 / 비밀번호가 맞지않습니다.');
      console.error(err);
    }
  };

  // TODO: checked valid input
  isValidInputEmail = () => {
    const { email } = this.state;
    return email.length > 0;
  };

  isValidInputPassword = () => {
    const { password } = this.state;
    return password.length >= 6;
  };

  render() {
    const isValidInputEmail = this.isValidInputEmail();
    const isValidInputPassword = this.isValidInputPassword();
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <Layout style={styles.container}>
            <Layout style={styles.titleArea}>
              <Text category="h1" style={styles.title}>
                Holly Ship
              </Text>
            </Layout>

            <Layout style={styles.formArea}>
              <Input
                style={styles.textInput}
                status={isValidInputEmail ? 'info' : 'danger'}
                caption={isValidInputEmail ? 'Correct' : '빈칸은 안되요!'}
                placeholder="ID"
                onChangeText={text => this.setState({ email: text })}
              />
              <Input
                style={styles.textInput}
                status={isValidInputPassword ? 'info' : 'danger'}
                caption={
                  isValidInputPassword
                    ? 'Correct'
                    : '비밀번호는 6자 이상이에요!'
                }
                keyboardType="decimal-pad"
                secureTextEntry={true}
                placeholder={'Password'}
                // value={this.state.password}
                onChangeText={text => this.setState({ password: text })}
              />
            </Layout>
            <Layout style={styles.buttonWrapper}>
              <Button
                style={styles.loginButton}
                status="primary"
                appearance="outline"
                size="large"
                disabled={
                  isValidInputEmail && isValidInputPassword ? false : true
                }
                onPress={this.handleLogin}
              >
                LOGIN
              </Button>
              <Button
                style={styles.signupButton}
                status="danger"
                appearance="outline"
                size="large"
                onPress={this.handleLogin}
              >
                SIGNUP
              </Button>
            </Layout>
            <Layout style={{ height: '10%' }}></Layout>
          </Layout>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: '10%',
    paddingRight: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleArea: {
    marginBottom: 30,
  },
  title: {
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 20,
    textShadowColor: 'red',
  },
  formArea: {
    width: '100%',
    marginBottom: 5,
  },
  textInput: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 30,
    borderColor: 'plum',
  },
  buttonWrapper: {
    padding: 10,
  },
  loginButton: {
    margin: 10,
    width: Dimensions.get('screen').width - 40,
  },
  signupButton: {
    margin: 10,
    width: Dimensions.get('screen').width - 40,
  },
});
