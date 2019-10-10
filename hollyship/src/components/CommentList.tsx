import React, { useState, useEffect } from 'react';
import { Text, FlatList, View, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const axios = require('axios');

export const CommentList = props => {
  console.log(props.likeMusics, 'vmkqfmvkfqfda2332');
  const [isLiked, setLiked] = useState(false);
  const [likedMusics, setMusics] = useState([]);

  const filtered = props.comments.filter(
    item => item.postId === props.currentPost
  );

  // useEffect(() => {
  //   axios
  //     .get(`http://13.125.244.90:8000/user`)
  //     .then(res => {
  //       setMusics(res.data.likeMusics);
  //     })
  //     .catch(err => console.log(err));
  //   console.log(likedMusics, '!!!!!!!여기');
  // }, [isLiked]);

  const handleLike = (musicId, index) => {
    setLiked(!isLiked);
    if (isLiked) {
      axios
        .post(`http://${PREFIX_URL}/music/${musicId}/like`)
        .then(res => alert(res.data.message))
        .catch(err => console.log(err));
    } else {
      axios
        .delete(`http://${PREFIX_URL}/music/${musicId}/like`)
        .then(res => alert(res.data.message))
        .catch(err => console.log(err));
    }
  };

  const likedStyles = isLiked ? styles.liked : null;

  return (
    <FlatList
      data={filtered}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
            }}
          >
            <Image
              style={{ width: 50, height: 50, margin: 10 }}
              source={{ uri: item.music.thumbnail }}
            ></Image>

            <View style={{ alignSelf: 'center' }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                {item.commentUsername}
              </Text>
              <Text style={{ color: 'white' }}>
                {item.music.artist} - {item.music.title}
              </Text>
              <Text style={{ color: 'white' }}>{item.comment}</Text>
            </View>
            <Icon
              name="heart-outline"
              color={
                props.likeMusics.includes(item.music.id) ? 'white' : 'pink'
              }
              size={20}
              style={[styles.icon]}
              onPress={() => {
                handleLike(item.music.id, item.id);
              }}
            ></Icon>
          </View>
        </View>
      )}
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
  },
  liked: {
    color: 'pink',
  },
  unliked: {
    color: 'white',
  },
});
