import React from 'react';
import { StyleSheet, View } from 'react-native';
// import StartScreen from './src/screens/StartScreen';
import LoginScreen from './src/screens/LoginScreen';
// import JoinScrzeen from './src/screens/JoinScreen';

export default function App() {
  return <View style={styles.container}>{<LoginScreen />}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
