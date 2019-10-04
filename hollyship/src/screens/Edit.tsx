import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  AsyncStorage,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
interface Props {
  navigation: any;
}

interface State {
  nickname: any;
  genre: any;
  image: any;
}

export default class Info extends Component<Props, State> {
  componentDidMount = () => {
    AsyncStorage.getItem('nickname').then(value =>
      this.setState({ nickname: value })
    );
    AsyncStorage.getItem('genre').then(value =>
      this.setState({ genre: value })
    );
    AsyncStorage.getItem('image').then(value =>
      this.setState({ image: value })
    );
  };

  setNickname = value => {
    AsyncStorage.setItem('nickname', value);
    this.setState({ nickname: value });
  };

  setGenre = value => {
    AsyncStorage.setItem('genre', value);
    this.setState({ genre: value });
  };

  setImage = value => {
    AsyncStorage.setItem('image', value);
    this.setState({ image: value });
  };
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      genre: '',
      image:
        'https://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png',
    };
  }
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log(result);
    if (!result.cancelled) {
      AsyncStorage.setItem('image', result.uri);
      this.setState({ image: result.uri });
    }
  };
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Edit',
      headerRight: (
        <Icon
          name="check-outline"
          color="white"
          size={30}
          onPress={async () => {
            await navigation.pop();
          }}
        ></Icon>
      ),
    };
  };
  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.mainContain}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 100 / 2,
                borderWidth: 1,
                borderColor: 'white',
              }}
            />
          )}
          <TouchableOpacity style={styles.circleImage} onPress={this.pickImage}>
            <Text style={styles.imageText}>Choice Image</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContain}>
          <View style={styles.textArea}>
            <Text style={styles.textStyle}>닉네임</Text>
            <TextInput
              style={styles.input}
              placeholder={'Rename'}
              onChangeText={this.setNickname}
              value={this.state.nickname}
            />
          </View>

          <View style={styles.textArea}>
            <Text style={styles.textStyle}>좋아하는 장르</Text>
            <TextInput
              style={styles.input}
              placeholder={'Edit'}
              onChangeText={this.setGenre}
              value={this.state.genre}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  mainContain: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleImage: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
  },

  imageText: {
    color: 'tomato',
    fontWeight: 'bold',
  },
  formContain: {
    flex: 1,
    backgroundColor: 'gray',
  },
  textArea: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
  },
  textStyle: {
    color: 'ghostwhite',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: 'plum',
    // margin: 10,
    color: 'ghostwhite',
  },
});
