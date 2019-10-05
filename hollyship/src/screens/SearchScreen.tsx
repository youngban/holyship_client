import React, { Component } from 'react';
import { Text, ScrollView, View, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

class SearchScreen extends Component {
  render() {
    return (
      <ScrollView>
        <FlatList
          data={this.props.items}
          keyExtractor={item => item.trackId.toString()}
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={{ width: 50, height: 50, margin: 10 }}
                  source={{ uri: item.artworkUrl60 }}
                ></Image>
                <View style={{ flexDirection: 'column' }}>
                  <Text
                    style={{ color: 'white', fontSize: 20, marginTop: 10 }}
                    numberOfLines={1}
                  >
                    {item.trackName}
                  </Text>
                  <Text style={{ color: 'grey' }} numberOfLines={1}>
                    {item.artistName}
                  </Text>
                </View>
              </View>
            </View>
          )}
        ></FlatList>
      </ScrollView>
    );
  }
}

export default SearchScreen;
