import React, { Component } from 'react';
import { View, Text, Modal, TextInput, Alert, Keyboard } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchScreen from './SearchScreen';
import { CommentList } from '../components/CommentList';
import { Posting } from '../components/Posting';

import { PREFIX_URL } from '../../config/config';


const axios = require('axios');

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
      commentData: [],
      musicData: [],
      userMusics: [],
      musicId: 0,
      isloading: false,
    };
  }

  componentDidMount() {
    this.getComments();
    this.getMusics();
  }

  getComments() {
    axios
      .get(`http://${PREFIX_URL}/comment`)
      .then(res => {
        this.setState({ commentData: res.data });
      })
      .catch(err => console.log(err));
  }

  getMusics() {
    axios
      .get(`http://${PREFIX_URL}/user`)
      .then(res => {
        const userData = res.data.likeMusics;
        this.setState({ userMusics: userData.map(item => item.id) });
      })

  }

  handleComment() {
    axios


      .post(`${PREFIX_URL}/comment`, {

        comment: this.state.comment,
        postId: this.props.navigation.getParam('post').id,
        musicId: this.state.musicId,
      })
      .catch(err => console.log(err))
      .then(this.setState({ isVisible: !this.state.isVisible }));
  }

  onSaveItem = id => {
    this.setState({ musicId: id });
    console.log(this.state.musicId);
  };

  updateSearch() {
    Keyboard.dismiss();
    axios
      .get(
        `https://itunes.apple.com/search?term=${this.state.query}&limit=25&country=KR&media=music&entity=musicTrack`
      )
      .then(res =>
        this.setState({ musicData: res.data.results, isloading: true })
      )
      .catch(err => console.log(err));
  }

  render() {
    const {
      isVisible,
      isloading,
      musicData,
      userMusics,
      commentData,
      pickedMusic,
    } = this.state;

    return (
      <View style={{ backgroundColor: 'black', flex: 1 }}>
        <Posting post={this.props.navigation.getParam('post')} />

        <View>
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: 'grey',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 20,
              }}
            >
              댓글
            </Text>
            <Icon
              name="message-text-outline"
              color="white"
              size={30}
              onPress={() => this.setState({ isVisible: !isVisible })}
            />
          </View>
          <View>
            <CommentList
              comments={commentData}
              likeMusics={userMusics}
              currentPost={this.props.navigation.getParam('post').id}
              handleLikes={this.getMusics}
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: 'grey',
          }}
        >
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={isVisible}
            onRequestClose={() => {
              Alert.alert('글쓰기 취소', '게시글 입력을 취소하시겠습니까?', [
                { text: '아니오' },
                {
                  text: '네',
                  onPress: () => this.setState({ isVisible: !isVisible }),
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
                  items={musicData}
                  checkLoad={isloading}
                  picked={pickedMusic}
                  onSaveMusic={this.onSaveItem}
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
