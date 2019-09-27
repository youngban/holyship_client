import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class Info extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
            }}
            source={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1nyTt4wpJCXHlUjIhlpbMqAgjcxNeF8_bLD4Mo6GyBnRKNrrrQA',
            }}
          />
        </View>
        <View style={styles.new}>
          <Text>이름</Text>

          <Text>좋아하는 장르</Text>
          <Text>힙합, 멜로</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  new: {
    flex: 1,
    backgroundColor: 'yellow',
  },
});
