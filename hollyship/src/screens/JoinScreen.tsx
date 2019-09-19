import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// Login
type Props = {};
export default class LoginScreen extends Component<Props> {
  // static navigationOptions = {
  //   header: 2,
  // };

  // _doLogin() {
  //   this.props.navigation.replace('TabNavigator');
  // }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleArea}>
          <Text style={styles.title}>Wellcome 🚀</Text>
        </View>
        <View style={styles.formArea}>
          <TextInput style={styles.textForm} placeholder={'ID'} />
          <TextInput style={styles.textForm} placeholder={'Password'} />
          <TextInput style={styles.textForm} placeholder={'Nickname or Name'} />
        </View>
        <View style={styles.buttomArea}>
          <TouchableOpacity
            style={styles.button}
            // onPress={this._doLogin.bind(this)}
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
