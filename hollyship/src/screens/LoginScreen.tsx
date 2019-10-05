import React, { Component } from 'react';
import {
  StyleSheet,
  Alert,
  AsyncStorage,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
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
  isLoading: boolean;
}
export default class LoginScreen extends Component<Props, State> {
  static navigationOptions = {
    header: 'Login',
  };
  state = {
    email: '',
    password: '',
    isLoading: false,
  };

  componentDidMount = () => {
    this.setState({
      ...this.state,
      isLoading: false,
    });
  };

  componentWillUnmount = () => {
    this.setState({
      ...this.state,
      isLoading: false,
    });
  };

  handleLogin = async () => {
    Keyboard.dismiss();
    this.setState({
      ...this.state,
      isLoading: true,
    });
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
      this.setState({
        ...this.state,
        isLoading: false,
      });
      return Alert.alert('아이디 / 비밀번호가 맞지않습니다.');
    }
  };

  // TODO: checked valid input
  isValidInputEmail = () => {
    const { email } = this.state;
    return email.length > 0;
  };

  isValidInputPassword = () => {
    const { password } = this.state;
    return password.length >= 4;
  };

  render() {
    const isValidInputEmail = this.isValidInputEmail();
    const isValidInputPassword = this.isValidInputPassword();
    const { isLoading } = this.state;
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
                status={isValidInputEmail ? 'info' : ''}
                caption={isValidInputEmail ? 'Done' : 'ID를 입력해주세요'}
                placeholder="ID"
                onChangeText={text => this.setState({ email: text })}
              />
              <Input
                style={styles.textInput}
                status={isValidInputPassword ? 'info' : ''}
                caption={
                  isValidInputPassword ? 'Done' : '비밀번호를 입력해주세요'
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
                onPress={this.handleLogin.bind(this)}
              >
                LOGIN
              </Button>
              <Button
                style={styles.signupButton}
                status="danger"
                appearance="outline"
                size="large"
                onPress={() => this.props.navigation.navigate('Join')}
              >
                SIGNUP
              </Button>
            </Layout>
            {isLoading && <ActivityIndicator size="large" color="0000ff" />}
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
