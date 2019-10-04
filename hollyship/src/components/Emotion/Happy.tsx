import React, { Component } from 'react';
import {
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';

// * UI Part
function Item({ id, title, artist, playTime, genre, thumbnail }) {
  return (
    <View>
      <TouchableOpacity>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: `${thumbnail}`,
          }}
        />
        <Text style={styles.title}>
          {id}
          {title}
          {artist}
          {playTime}
          {genre}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

interface Props {}
interface State {}

export default class Happy extends React.Component<Props, State> {
  state = {
    selected: new Map(),
    happyMusics: null,
  };

  fetchMusics = async () => {
    const response = await axios.get(`http://13.125.244.90:8000/music`);
    this.setState({
      ...this.state,
      happyMusics: response.data,
    });
    console.log(response.data);
  };

  componentDidMount() {
    this.fetchMusics();
  }

  render() {
    const { selected } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.happyMusics}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              thumbnail={item.thumbnail}
              title={item.title}
              artist={item.artist}
              playTime={item.playTime}
              genre={item.genre}

              // onPress={() => Alert.alert('hi')}
            />
          )}
          // keyExtractor={item => item.id}
          extraData={selected}
          horizontal={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f59042',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
