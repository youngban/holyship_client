import React, { Component } from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { Layout } from 'react-native-ui-kitten';
import MainRecentPost from '../components/MainRecentPost';
import { Image } from 'react-native-elements';

// TODO: URL
const PREFIX_URL = 'http://13.125.244.90:8000';

// TODO: MAIN
class HomeScreen extends Component {
  render() {
    return (
      <Layout style={styles.container}>
        <ScrollView>
          <Image
            source={require('../Image/main-banner.jpg')}
            style={{
              width: Dimensions.get('screen').width,
              height: 300,
            }}
          />
          <MainRecentPost />
        </ScrollView>
      </Layout>
    );
  }
}

const HomeStack = createStackNavigator(
  {
    HomeScreen,
  },
  {
    defaultNavigationOptions: () => ({
      title: 'Home',
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTintColor: '#fff',
    }),
  }
);

export default HomeStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleArea: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '10%',
  },
  title: {},
});
