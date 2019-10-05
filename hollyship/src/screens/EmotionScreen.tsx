import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, Image } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
const axios = require('axios');

type Props = {
  navigation: NavigationStackProp<{ category: 'string'; data: 'array' }>;
};

export default class EmotinScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('category'),
    };
  };

  handlePress(id) {
    axios
      .get(`http://13.125.244.90:8000/post/${id}`)
      .then(res => {
        this.props.navigation.navigate('ReadScreen', {
          post: res.data,
          comment: res.data.comments,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const songs = [
      {
        id: '1',
        title: '워커홀릭',
        singer: '볼빤간사춘기',
        uri:
          'https://img5.yna.co.kr/etc/inner/KR/2019/09/11/AKR20190911044800005_01_i_P2.jpg',
      },
      {
        id: '2',
        title: '가을밤 떠난 너',
        singer: '케이시',
        uri:
          'data:image/jpeg;base64,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',
      },
      {
        id: '3',
        title: 'MidNight',
        singer: '크루셜스타',
        uri:
          'http://shop1.phinf.naver.net/20151225_285/ephcomm3_1450972212701thrkS_JPEG/57593211220377551_2036812376.jpg',
      },
      {
        id: '4',
        title: 'Fuxx With Me(Feat.JUSTICE)',
        singer: 'Leellamarz',
        uri:
          'http://blogfiles.naver.net/MjAxOTAzMDJfMTgw/MDAxNTUxNTI2MzU2ODU0.UfNC5_2LyUSMjjVnSl2VX6NGDTdw0_Uor3cylrh4oRMg.KCBzwcS5Dq42cplAoiGHAaFlqRModW_vZgh0h_y3xBUg.JPEG.9999days/1.jpg',
      },
    ];

    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 7,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>차트 Top5</Text>
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            data={songs}
            horizontal={true}
            initialNumToRender={5}
            renderItem={({ item }) => (
              <View style={{ margin: 7 }}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{ uri: item.uri }}
                ></Image>
                <Text numberOfLines={1} style={{ color: 'white', width: 100 }}>
                  {item.title}
                </Text>
                <Text style={{ color: 'grey' }}>{item.singer}</Text>
              </View>
            )}
          />
        </View>
        <View style={{ flex: 3, marginTop: 10 }}>
          <FlatList
            data={this.props.navigation.getParam('data')}
            renderItem={({ item }) => (
              <View style={{ margin: 7 }}>
                <Text
                  style={{ fontSize: 20, color: 'white' }}
                  onPress={() => this.handlePress(item.id)}
                >{`${item.title}`}</Text>
                <Text
                  style={{
                    color: 'white',
                    marginBottom: 10,
                  }}
                >
                  {item.user.username}
                </Text>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'grey',
                  }}
                ></View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconTitle: {
    textAlign: 'center',
  },
  darkTheme: {
    color: 'white',
    backgroundColor: 'black',
  },
});
