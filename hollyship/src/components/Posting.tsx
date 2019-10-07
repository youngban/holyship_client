import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const Posting = props => {
  console.log(props);
  return (
    <View style={{ backgroundColor: 'black' }}>
      <Text
        style={{
          fontWeight: 'bold',
          color: 'white',
          fontSize: 30,
          marginBottom: 10,
        }}
      >
        {props.post.title}
      </Text>
      <Text style={styles.darkTheme}>{props.post.user.username}</Text>
      <Text style={styles.darkTheme}>{props.post.createdAt}</Text>
      <Text style={styles.darkTheme}>{props.post.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  darkTheme: {
    color: 'white',
  },
});
