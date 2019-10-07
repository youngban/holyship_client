import React from 'react';
import { Text, FlatList, View, Image } from 'react-native';

export const CommentList = props => {
  const filtered = props.comments.filter(
    item => item.postId === props.currentPost
  );
  console.log(filtered, '이게 코민드타다');
  return (
    <FlatList
      data={filtered}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{ width: 50, height: 50, margin: 10 }}
              source={{ uri: item.music.thumbnail }}
            ></Image>

            <View>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  alignItems: 'flex-end',
                }}
              >
                {item.commentUsername}
              </Text>
              <Text style={{ color: 'white' }}>
                {item.music.artist} - {item.music.title}
              </Text>
              <Text style={{ color: 'white' }}>{item.comment}</Text>
            </View>
          </View>
        </View>
      )}
    ></FlatList>
  );
};
