import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Alert,
  Button,
  Keyboard,
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AsyncStorage } from 'react-native';
import SearchScreen from './SearchScreen';

const axios = require('axios');
const searchAuth = 'Bearer ' + AsyncStorage.getItem('spotify_token');

type Props = {
  navigation: NavigationStackProp<{}>;
};
export default class ReadScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      comment: '',
      query: '',
      data: [],
      isloading: false,
    };
  }

  handleComment() {
    axios
      .post(`http://13.125.244.90:8000/comment`, {
        comment: this.state.comment,
        postId: this.props.navigation.getParam('post').id,
      })
      .then(this.setState({ isVisible: !this.state.isVisible }));
  }

  displayComment() {
    if (this.props.navigation.getParam('post').comments) {
      return (
        <Text>{this.props.navigation.getParam('post').comments.comment}</Text>
      );
    } else {
      return <Text>댓글을 입력해주세요</Text>;
    }
  }

  updateSearch() {
    Keyboard.dismiss();
    axios
      .get(
        `https://itunes.apple.com/search?term=${this.state.query}&limit=25&country=KR&media=music&entity=musicTrack`
      )
      .then(res => this.setState({ data: res.data.results, isloading: true }))
      .catch(err => console.log(err));
    console.log(this.state.data);
  }

  render() {
    const post = this.props.navigation.getParam('post');
    const comments = this.props.navigation.getParam('comment');
    const result = this.state.data;
    return (
      <View>
        <Text>{post.title}</Text>
        <Text>{post.user.username}</Text>
        <Text>{post.createdAt}</Text>
        <Text>{post.content}</Text>
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: 'grey',
            flexDirection: 'row',
          }}
        >
          <Text>댓글</Text>
          <Icon
            name="message-text-outline"
            size={30}
            onPress={() => this.setState({ isVisible: !this.state.isVisible })}
          />
        </View>
        <View>
          {/* {console.log(comments)} */}
          {/* {if(comments.length > 0){
              comments.map(item => {
                return <Text key={item.comment}>{item.comment}</Text>;
              })
          }} */}
        </View>
        <View
          style={{
            backgroundColor: 'grey',
          }}
        >
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={this.state.isVisible}
            onRequestClose={() => {
              Alert.alert('글쓰기 취소', '게시글 입력을 취소하시겠습니까?', [
                { text: '아니오' },
                {
                  text: '네',
                  onPress: () =>
                    this.setState({ isVisible: !this.state.isVisible }),
                },
              ]);
            }}
          >
            <View
              style={{ flex: 1, backgroundColor: 'black', height: '100 %' }}
            >
              <View style={{ flex: 9 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10,
                  }}
                >
                  <TextInput
                    style={{
                      color: 'white',
                      fontSize: 20,
                      marginBottom: 20,
                    }}
                    placeholder={'노래를 추천해주세요'}
                    onChangeText={text => this.setState({ query: text })}
                  ></TextInput>
                  <Icon
                    name="magnify"
                    size={40}
                    color="white"
                    onPress={this.updateSearch.bind(this)}
                  ></Icon>
                </View>

                <SearchScreen
                  items={this.state.data}
                  checkLoad={this.state.isloading}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderTopWidth: 1,
                  borderTopColor: 'grey',
                  margin: 10,
                }}
              >
                <TextInput
                  style={{ color: 'white', width: '90%' }}
                  placeholder={'댓글을 입력해주세요'}
                  onChangeText={text => this.setState({ comment: text })}
                ></TextInput>
                <Icon
                  style={{ width: '10%' }}
                  name="fingerprint"
                  color="white"
                  size={30}
                  onPress={this.handleComment.bind(this)}
                ></Icon>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}
