import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MainMostLikedStories from '../components/MainMostLikedStories';
import MainFollowPost from '../components/MainFollowPost';
import MainCategoryRank from '../components/MainCategoryRank';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.titleArea}>
            <Text style={styles.title}>Most Liked Stories</Text>
            <View>
              <MainMostLikedStories />
            </View>
          </View>
          <View style={styles.titleArea}>
            <Text style={styles.title}>카테고리별 1위의 노래</Text>
            <View>
              <MainCategoryRank />
            </View>
          </View>
          <View style={styles.titleArea}>
            <Text style={styles.title}>팔로워들의 댓글 및 포스팅</Text>
            <View>
              <MainFollowPost />
            </View>
          </View>
        </ScrollView>
      </View>
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
    }),
  }
);

export default HomeStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  titleArea: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '10%',
  },
  title: {
    color: 'white',
    fontSize: 30,
  },
});
