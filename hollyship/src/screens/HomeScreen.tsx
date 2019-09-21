import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MainMostLiked from '../components/MainMostLiked';
import MainCategory from '../components/MainCategory';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.titleArea}>
            <Text style={styles.title}>Most Liked Stories</Text>
            <View>
              <MainMostLiked />
            </View>
          </View>
          <View style={styles.titleArea}>
            <Text style={styles.title}>카테고리별 1위의 노래</Text>
          </View>
          <View style={styles.titleArea}>
            <Text style={styles.title}>팔로워들의 댓글 및 포스팅</Text>
            <View>
              <MainCategory />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

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
