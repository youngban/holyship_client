import React, { Component } from 'react';
import { Layout, Text, Button, Avatar, Modal } from 'react-native-ui-kitten';
import {
  StyleSheet,
  AsyncStorage,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import MypageModal from '../components/MypageModal/MypagePosts';
import MypageFollowers from '../components/MypageModal/MypageFollowers';

interface Props {
  navigation: any;
}

interface State {
  username: string;
  postingNumber: number;
  followerCounter: number;
  followingCounter: number;
  modalVisible: boolean;
  modalVisible1: boolean;
  userImage: any;
}

// TODO : Class
export default class UserScreen extends Component<Props, State> {
  state = {
    username: '',
    postingNumber: 0,
    followerCounter: 0,
    followingCounter: 0,
    modalVisible: false,
    modalVisible1: false,
    userImage:
      'https://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png',
  };

  //? *******************************************************************************

  //?                      모달 페이지 상태

  //? *******************************************************************************

  // TODO : 모달
  setModalVisible = () => {
    const modalVisible = !this.state.modalVisible;
    this.setState({ modalVisible });
  };

  setFollowModal = () => {
    const modalVisible1 = !this.state.modalVisible1;
    this.setState({ modalVisible1 });
  };

  //? *******************************************************************************

  //?                      COMPONENT DID MOUNT

  //? *******************************************************************************

  // TODO : 이미지 유지 및 화면 cdm
  componentDidMount = () => {
    this.getUserImage();
    this.getUserInfo();
    this.postingConter();
    // this.followerCounter();
    // this.followingCounter();
  };

  //? *******************************************************************************

  //?                     서버 요청 ( 이미지, 유저 이미지, 팔로우, 포스팅)

  //? *******************************************************************************

  // TODO : 이미지 선택 및 이미지 POST 날리기
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    //! console.log('[changeImage]', result);
    this.setState({ userImage: result.uri });

    if (!result.cancelled) {
      // this.setState({ image: result.uri });
      const data = new FormData();
      data.append('photo', {
        uri: result.uri,
        name: result.uri.split('/').pop(),
        type: result.type,
      });

      const res = await axios.post('http://13.125.244.90:8000/user/upload', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        // body: data,
      });
    }
  };

  // TODO : 유저 이미지 가져오기
  getUserImage = async () => {
    try {
      const response = await axios.get('http://13.125.244.90:8000/user');
      // console.log('[iWantImage] : ', response.data);
      // this.setState({
      //   ...this.state,
      //   userImage: response.data.userImage,
      // });
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
  handleLogout() {
    axios
      .get('http://13.125.244.90:8000/auth/logout')
      .then(this.props.navigation.navigate('Login'))
      .then(AsyncStorage.removeItem('access_token'))
      .catch(err => Alert.alert('logout'));
  }

  //? *******************************************************************************

  //?                      포스터, 팔로우, 팔로잉 모달 페이지

  //? *******************************************************************************

  // TODO : 포스터 모달 페이지
  renderModalElement = () => {
    return (
      <Layout level="2" style={styles.modalContainer}>
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
        <MypageModal />
      </Layout>
    );
  };

  // TODO : 팔로우 모달 페이지
  showFollowModal = () => {
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
          onPress={this.setFollowModal}
        >
          ❌
        </Button>
        <MypageFollowers />
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
          {userImage && (
            <Avatar
              style={styles.avatarStyle}
              appearance="default"
              size="large"
              shape="round"
              source={{ uri: userImage }}
            />
          )}
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
          {/* Follower */}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.setFollowModal}
          >
            <Text category="h6" status="primary" style={styles.button}>
              Followers
            </Text>
            <Modal
              allowBackdrop={true}
              backdropStyle={{ backgroundColor: 'black', opacity: 0.5 }}
              onBackdropPress={this.setFollowModal}
              visible={this.state.modalVisible1}
            >
              {this.showFollowModal()}
            </Modal>
            <Text category="h6">{this.state.followerCounter}</Text>
          </TouchableOpacity>
          {/* Following */}
          <TouchableOpacity style={styles.buttonContainer}>
            <Text category="h6" status="primary" style={styles.button}>
              Following
            </Text>
            <Text category="h6">{this.state.followingCounter}</Text>
          </TouchableOpacity>
          {/* Posts */}
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
