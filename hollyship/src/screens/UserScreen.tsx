import React, { Component } from 'react';
import { Layout, Text, Button, Avatar, Modal } from 'react-native-ui-kitten';
import {
  StyleSheet,
  AsyncStorage,
  Dimensions,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import MypagePosts from '../../src/components/Mypage-Posts/MypagePosts';

interface Props {
  navigation: any;
}

interface State {
  userId: number;
  username: string;
  postingNumber: number;
  followerCounter: number;
  followingCounter: number;
  modalVisible: boolean;
  userImage: any;
}

// TODO : Class
export default class UserScreen extends Component<Props, State> {
  state = {
    userId: 0,
    username: '',
    postingNumber: 0,
    followerCounter: 0,
    followingCounter: 0,
    modalVisible: false,
    userImage: null,
  };

  // TODO : 모달
  setModalVisible = () => {
    const modalVisible = !this.state.modalVisible;
    this.setState({ modalVisible });
  };

  // TODO : 이미지 유지 및 화면 cdm
  componentDidMount = () => {
    this.getUserImage();
    this.getUserInfo();
    this.postingConter();
    // this.followerCounter();
    // this.followingCounter();
  };

  // TODO: iOS Allow Camera Album Permission
  getPermissionAsync = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  // TODO : 이미지 선택 및 이미지 POST 날리기
  pickImage = async () => {
    await this.getPermissionAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      const data = new FormData();
      data.append('photo', {
        uri: result.uri,
        name: result.uri.split('/').pop(),
        type: result.type,
      });

      // TODO: Upload UserImage to AWS S3 Bucket
      const res = await axios.post(
        'http://13.125.244.90:8000/user/upload',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const userImage = res.data.file.location;
      this.setState({ ...this.state, userImage });
      // TODO: Change UserImage in User Info
      await axios.patch(`http://13.125.244.90:8000/user`, {
        userImage,
      });
    }
  };

  // // TODO : 이미지 바뀌면 Asyncstorage 에 저장
  // setImage = value => {
  //   AsyncStorage.setItem('image', value);
  //   this.setState({ image: value });
  // };

  // TODO : 유저 이미지 가져오기
  getUserImage = async () => {
    try {
      const response = await axios.get('http://13.125.244.90:8000/user');
      this.setState({
        ...this.state,
        userImage: response.data.userImage,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // TODO : 유저 이름 가져오기
  getUserInfo = async () => {
    try {
      const response = await axios.get('http://13.125.244.90:8000/user');
      this.setState({
        ...this.state,
        userId: response.data.userId,
        username: response.data.username,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // TODO: Axios 포스팅 카운터
  postingConter = async () => {
    try {
      const response = await axios.get(
        'http://13.125.244.90:8000/post/user/my'
      );

      this.setState({
        ...this.state,
        postingNumber: response.data.posts.length,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // TODO: Axios 팔로워 카운터
  // followerCounter = async () => {
  //   try {
  //     const response = await axios.get(
  //       'http://13.125.244.90:8000/follow/follower'
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // TODO: Axios 팔로잉 카운터
  // followingCounter = async () => {
  //   try {
  //     const response = await axios.get(
  //       'http://13.125.244.90:8000/follow/following'
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // TODO: 로그아웃 요청
  async handleLogout() {
    try {
      await axios.get('http://13.125.244.90:8000/auth/logout');
      await this.props.navigation.navigate('Login');
      await AsyncStorage.removeItem('access_token');
      Alert.alert('로그아웃되었습니다.');
    } catch (err) {
      Alert.alert('There is No User Info.\n Have To ReLogin.');
      await this.props.navigation.navigate('Login');
    }
  }

  // TODO : 모달 페이지
  renderModalElement = () => {
    return (
      <Layout level="1" style={styles.modalContainer}>
        <Button
          style={{
            marginTop: 15,
            padding: 2,
            marginRight: 5,
            alignSelf: 'flex-end',
          }}
          size="giant"
          status="danger"
          appearance="ghost"
          onPress={this.setModalVisible}
        >
          ❌
        </Button>
        <MypagePosts />
      </Layout>
    );
  };

  render() {
    let { userImage } = this.state;
    return (
      <Layout style={styles.container}>
        <LinearGradient
          colors={['rgba(150,150,255,0.5)', 'transparent']}
          style={styles.gradientBg}
        ></LinearGradient>
        <Layout style={styles.imageContainer}>
          <Avatar
            style={styles.avatarStyle}
            appearance="default"
            size="large"
            shape="round"
            source={
              !userImage ? require('../Image/user.png') : { uri: userImage }
            }
          />
          <Button
            style={styles.imageBtn}
            appearance="filled"
            status="danger"
            size="tiny"
            onPress={this.pickImage}
          >
            +
          </Button>
        </Layout>

        <Text category="h5">{this.state.username}</Text>
        <Layout style={styles.logoutBtn}>
          <Button
            style={styles.topButton}
            appearance="ghost"
            status="danger"
            size="large"
            onPress={this.handleLogout.bind(this)}
          >
            Log-Out
          </Button>
        </Layout>
        <Layout style={styles.buttonGroupContainer}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text category="h6" status="primary" style={styles.button}>
              Followers
            </Text>
            <Text category="h6">{this.state.followerCounter}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text category="h6" status="primary" style={styles.button}>
              Following
            </Text>
            <Text category="h6">{this.state.followingCounter}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.setModalVisible}
          >
            <Text
              category="h6"
              status="primary"
              style={styles.button}
              onPress={this.setModalVisible}
            >
              Posts
            </Text>

            <Modal
              allowBackdrop={true}
              backdropStyle={{ backgroundColor: 'black', opacity: 0.5 }}
              onBackdropPress={this.setModalVisible}
              visible={this.state.modalVisible}
            >
              {this.renderModalElement()}
            </Modal>

            <Text category="h6">{this.state.postingNumber}</Text>
          </TouchableOpacity>
        </Layout>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '20%',
  },
  avatarStyle: {
    height: 150,
    width: 150,
    marginBottom: 30,
  },
  imageContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  // TODO: Button Style
  imageBtn: {
    position: 'absolute',
    left: 130 - 40 / 2,
    top: 140 - 40 / 2,
  },
  logoutBtn: {
    flex: 0.5,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  topButton: {
    paddingBottom: 10,
  },
  outBtn: {
    justifyContent: 'flex-end',
  },
  modalBtn: {},
  buttonGroupContainer: {
    paddingTop: '20%',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
    width: Dimensions.get('screen').width,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    width: Dimensions.get('screen').width * 0.3,
    margin: 6,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  gradientBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get('screen').height * 0.5,
  },
});
