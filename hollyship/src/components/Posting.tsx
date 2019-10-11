import React from 'react';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import moment from 'moment';

export const Posting = props => {
  console.log(props.post);
  return (
    <FlatList
      data={[props.post]}
      renderItem={({ item }) => (
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: 'rgba(52,52,52,0.8)',
              borderBottomWidth: 1,
            }}
          >
            <Image
              style={{ width: 50, height: 50, margin: 10 }}
              source={{ uri: item.user.userImage }}
            ></Image>
            <View style={{ justifyContent: 'center' }}>
              <Text style={styles.user}>{item.user.username}</Text>
              <Text style={styles.date}>
                {moment(item.createdAt, 'YYYY-MM-DD').fromNow()}
              </Text>
            </View>
          </View>
          <Text style={styles.content}>{item.content}</Text>
        </View>
      )}
      keyExtractor={item => item.createdAt}
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  title: { color: 'white', fontWeight: 'bold', fontSize: 30, marginBottom: 10 },
  user: { color: 'white', fontSize: 15 },
  date: { color: 'grey' },
  content: { color: 'white', fontSize: 18, marginTop: 10 },
});
