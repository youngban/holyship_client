import React, { Component } from 'react';
import {
  Text,
  View,
  Modal,
  Alert,
  Picker,
  FlatList,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {
  createStackNavigator,
  NavigationStackProp,
} from 'react-navigation-stack';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
import EmotionScreen from './EmotionScreen';
import ReadScreen from './ReadScreen';
import SearchScreen from './SearchScreen';
import { TextInput } from 'react-native-gesture-handler';
import { PREFIX_URL } from '../config/config';
const axios = require('axios');

type MyState = {
  isVisible: boolean;
  emotion: string;
  title: string;
  content: string;
};

type Props = {
  navigation: NavigationStackProp<{ category: 'string' }>;
};
// const { height } = Dimensions.get('window');

const emotions = [
  { title: 'HAPPY', img: require('../img/happy.jpeg') },
  { title: 'SAD', img: require('../img/sad.jpg') },
  { title: 'BLANK', img: require('../img/blank2.jpeg') },
  { title: 'CHILL', img: require('../img/chill.jpeg') },
  { title: 'UPSET', img: require('../img/anger.jpg') },
];

class CategoryScreen extends Component<Props, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      emotion: '',
      title: '',
      content: '',
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Category',
      headerRight: (
        <Icon
          name="lead-pencil"
          color="white"
          size={30}
          onPress={() => navigation.state.params.openModal()}
        ></Icon>
      ),
    };
  };

  handlePress(emotion) {
    axios
      .get(`${PREFIX_URL}/emoji/${emotion}`)
      .then(res => {
        this.props.navigation.navigate('EmotionScreen', {
          category: emotion,
          data: res.data,
        });
      })
      .catch(err => console.log(err));
  }

  handleModal() {
    this.setState({
      isVisible: true,
    });
  }

  componentDidMount() {
    this.props.navigation.setParams({
      openModal: this.handleModal.bind(this),
    });
  }

  handlePost() {
    axios
      .post(`${PREFIX_URL}/post`, {
        title: this.state.title,
        content: this.state.content,
        emotion: this.state.emotion,
      })
      .then(res => Alert.alert('', '글이 등록되었습니다'))
      .catch(err => console.log(err));
    this.setState({ isVisible: !this.state.isVisible });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => {
            Alert.alert('글쓰기 취소', '게시글 입력을 취소하시겠습니까?', [
              { text: '아니오' },
              {
                text: '네',
                onPress: () => {
                  this.setState({ isVisible: !this.state.isVisible });
                },
              },
            ]);
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'black' }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: 10,
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                  }}
                >
                  오늘 기분을 얘기해주세요
                </Text>
                <View>
                  <Icon
                    name="check-outline"
                    size={30}
                    color="white"
                    onPress={this.handlePost.bind(this)}
                  />
                </View>
              </View>
            </View>
            <Picker
              style={styles.darkTheme}
              itemStyle={styles.darkTheme}
              selectedValue={this.state.emotion}
              onValueChange={itemValue => this.setState({ emotion: itemValue })}
            >
              {emotions.map((item, idx) => (
                <Picker.Item label={item.title} value={item.title} key={idx} />
              ))}
            </Picker>
            <View
              style={{
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
                backgroundColor: 'black',
                padding: 10,
              }}
            >
              <TextInput
                style={styles.darkTheme}
                placeholder={'제목'}
                onChangeText={text => this.setState({ title: text })}
              ></TextInput>
            </View>
            <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
              <TextInput
                style={styles.darkTheme}
                placeholder={'내용'}
                onChangeText={text => this.setState({ content: text })}
                multiline={true}
              ></TextInput>
            </View>
          </View>
        </Modal>

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'black',
          }}
        >
          <FlatList
            style={{ flex: 1 }}
            data={emotions}
            renderItem={({ item }) => (
              <ImageBackground
                source={item.img}
                style={{
                  width: '100%',
                  height: 120,
                  justifyContent: 'center',
                  margin: 2,
                  alignContent: 'stretch',
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'white',
                    opacity: 0.8,
                  }}
                  onPress={() => this.handlePress(`${item.title}`)}
                >
                  {item.title}
                </Text>
              </ImageBackground>
            )}
            keyExtractor={item => item.title}
            numColumns={1}
          ></FlatList>
        </View>
      </View>
    );
  }
}

const CategoryStack = createStackNavigator(
  {
    CategoryScreen,
    EmotionScreen,
    ReadScreen,
    SearchScreen,
  },
  {
    defaultNavigationOptions: () => ({
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#fff',
    }),
  }
);

export default CategoryStack;

const styles = StyleSheet.create({
  iconTitle: {
    textAlign: 'center',
  },
  darkTheme: {
    color: 'white',
    backgroundColor: 'black',
    fontSize: 20,
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 30,
    width: '80%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
