import React, { Component } from 'react';
import { View, Text, Modal, TextInput, Alert, Button } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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

  render() {
    const post = this.props.navigation.getParam('post');
    const comments = this.props.navigation.getParam('comment');
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
            name="comment-multiple-outline"
            size={20}
            onPress={() => this.setState({ isVisible: !this.state.isVisible })}
          />
        </View>
        <View>
          {console.log(comments)}
          {comments.map(item => {
            return <Text key={item.comment}>{item.comment}</Text>;
          })}
        </View>
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
          <View>
            <Text>노래를 추천해주세요</Text>
            <TextInput
              placeholder={'댓글을 입력해주세요'}
              onChangeText={text => this.setState({ comment: text })}
            ></TextInput>
            <Button title={'등록'} onPress={this.handleComment.bind(this)}>
              등록
            </Button>
          </View>
        </Modal>
      </View>
    );
  }
}
