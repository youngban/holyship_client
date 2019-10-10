import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import axios from 'axios';
import { PREFIX_URL } from '../../config/config';

const { width, height } = Dimensions.get('window');

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      styleStatus: false,
    };
    // this.handlePress = this.handlePress.bind(this);
  }

  onChangeColor = (index, item) => {
    this.setState({
      selectedItem: index,
    });
    Alert.alert(
      'DJ Drop The Beat!!',
      '이 노래로 하시겠습니까?',
      [
        {
          text: '아니오',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: '네',
          onPress: () =>
            axios
              .post(`http://${PREFIX_URL}:8000/music`, {
                id: item.trackId,
                title: item.trackName,
                thumbnail: item.artworkUrl60,
                artist: item.artistName,
                playTime: item.trackTimeMillis,
                genre: item.primaryGenreName,
                youtubeUrl: item.previewUrl,
              })
              .then(res => console.log(res.data))
              .catch(err => console.log(err)),
        },
      ],
      { cancelable: false }
    );
  };

  onSaveItem = id => {
    this.props.onSaveMusic(id);
  };

  render() {
    return (
      <ScrollView>
        <FlatList
          data={this.props.items}
          keyExtractor={item => item.trackId.toString()}
          renderItem={({ item, index }) => {
            const localColor = {
              backgroundColor:
                this.state.selectedItem === index
                  ? 'rgba(52, 52, 52, 0.6)'
                  : 'black',
              flexDirection: 'row',
            };

            return (
              <View style={{ flex: 1 }}>
                <View>
                  <TouchableOpacity
                    style={localColor}
                    onPress={() => {
                      this.onSaveItem(item.trackId);
                      this.onChangeColor(index, item);
                    }}
                  >
                    <Image
                      style={{ width: 50, height: 50, margin: 10 }}
                      source={{ uri: item.artworkUrl60 }}
                    ></Image>
                    <View>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 20,
                          marginTop: 10,
                        }}
                        numberOfLines={1}
                      >
                        {item.trackName}
                      </Text>
                      <Text style={{ color: 'grey' }} numberOfLines={1}>
                        {item.artistName}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        ></FlatList>
      </ScrollView>
    );
  }
}
