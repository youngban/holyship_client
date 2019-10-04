import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  navigation: any;
}

interface State {
  nickname: any;
  genre: any;
  image: any;
}

export default class Info extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      genre: '',
      image:
        'https://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png',
    };
  }
  // pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //   });
  //   console.log(result);
  //   if (!result.cancelled) {
  //     this.setState({ image: result.uri });
  //   }
  // };

  componentDidMount() {
    this.updateState();
  }

  updateState = async () => {
    const nickname = await AsyncStorage.getItem('nickname');
    const genre = await AsyncStorage.getItem('genre');
    const image = await AsyncStorage.getItem('image');
    await this.setState({ ...this.state, nickname, genre, image });
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'My Info',
      headerRight: (
        <Icon
          name="circle-edit-outline"
          color="white"
          size={30}
          onPress={() => navigation.navigate('Edit')}
        ></Icon>
      ),
    };
  };

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
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
          {/* <TouchableOpacity style={styles.circleImage} onPress={this.pickImage}>
            <Text style={styles.imageText}>Choice Image</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.formContain}>
          <View style={styles.textArea}>
            <Text style={styles.textStyle}>닉네임 : </Text>
            <Text style={styles.textStyle}>{this.state.nickname}</Text>
          </View>
          <View style={styles.textArea}>
            <Text style={styles.textStyle}>좋아하는 장르 : </Text>
            <Text style={styles.textStyle}>{this.state.genre}</Text>
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
  header: {
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
    flexDirection: 'row',
  },
  textStyle: {
    color: 'ghostwhite',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
