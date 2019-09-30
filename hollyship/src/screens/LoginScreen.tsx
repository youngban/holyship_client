import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  KeyboardAvoidingView,
} from 'react-native';

const axios = require('axios');

// Login
interface Props {
  navigation: any;
  header: string;
}

interface State {
  email: string;
  password: string;
  isLogin: boolean;
}
export default class LoginScreen extends Component<Props, State> {
  static navigationOptions = {
    header: 'Login',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLogin: false,
    };
  }
  _saveData = () => {
    const obj = {
      email: this.state.email,
      password: this.state.password,
    };
    AsyncStorage.setItem('obj', JSON.stringify(obj));
  };

  _loadData = async () => {
    try {
      const data = await AsyncStorage.getItem('data');
      console.log(data);
      alert(data);
    } catch (error) {
      alert(error);
    }
  };

  //! 진짜

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
        console.log(res.config.data);
        if (res.status === 200) {
          this.props.navigation.navigate('Home');
        }
      })
      .catch(err => Alert.alert('아이디 / 비밀번호가 맞지않습니다.'));
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.container}>
          <View style={styles.titleArea}>
            <Text style={styles.title}>Holly Ship</Text>
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
          <View style={{ height: '10%' }}></View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingLeft: '10%',
    paddingRight: '10%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  titleArea: {
    width: '100%',
    padding: '10%',
    alignItems: 'center',
    paddingTop: '20%',
    paddingBottom: '10%',
  },
  title: {
    fontSize: 35,
    color: 'ghostwhite',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 20,
    textShadowColor: 'red',
  },
  formArea: {
    width: '100%',
    // paddingBottom: '10%',
  },
  textForm: {
    width: '100%',
    height: '20%',
    paddingLeft: 15,
    paddingRight: 5,
    marginBottom: '10%',
    borderRadius: 30,
    color: 'white',
    borderBottomWidth: 1,
    borderColor: 'plum',
  },
  buttomArea: {
    width: '50%',
    height: '10%',
  },
  button: {
    borderColor: 'plum',
    borderWidth: 3,
    borderRadius: 40,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: 'ghostwhite',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 20,
    textShadowColor: 'red',
  },
});
