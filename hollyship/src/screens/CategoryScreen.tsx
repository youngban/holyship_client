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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EmotionScreen from './EmotionScreen';
import ReadScreen from './ReadScreen';
import { TextInput } from 'react-native-gesture-handler';
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

const emotions = [
  { title: 'happy', img: require('../img/happy.jpg') },
  { title: 'chill', img: require('../img/chill.jpeg') },
  { title: 'blank', img: require('../img/blank.jpg') },
  { title: 'sad', img: require('../img/sad.jpg') },
  { title: 'tired', img: require('../img/tired.jpg') },
  { title: 'angry', img: require('../img/angry.jpg') },
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
      .get(`http://13.125.244.90:8000/emoji/${emotion}`)
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
      .post('http://13.125.244.90:8000/post', {
        title: this.state.title,
        content: this.state.content,
        emotion: this.state.emotion,
      })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
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
                onPress: () =>
                  this.setState({ isVisible: !this.state.isVisible }),
              },
            ]);
          }}
        >
          <View style={styles.darkTheme}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                }}
              >
                글쓰기
              </Text>
              <View style={{ paddingEnd: '15%' }}>
                <Icon
                  name="check-outline"
                  size={20}
                  color="white"
                  onPress={this.handlePost.bind(this)}
                />
              </View>
            </View>

            <Picker
              style={styles.darkTheme}
              itemStyle={styles.darkTheme}
              selectedValue={this.state.emotion}
              onValueChange={itemValue => this.setState({ emotion: itemValue })}
            >
              {emotions.map((item, idx) => (
                <Picker.Item
                  label={item.title}
                  value={item.title}
                  key={idx}
                  color={'black'}
                />
              ))}
            </Picker>
            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}>
              <TextInput
                style={styles.darkTheme}
                placeholder={'제목'}
                onChangeText={text => this.setState({ title: text })}
              ></TextInput>
            </View>

            <TextInput
              style={styles.darkTheme}
              placeholder={'내용'}
              onChangeText={text => this.setState({ content: text })}
              multiline={true}
            ></TextInput>
          </View>
        </Modal>

        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'black',
            }}
          >
            <View style={{ flex: 1 }}>
              <FlatList
                data={emotions}
                renderItem={({ item }) => (
                  <ImageBackground
                    source={item.img}
                    style={{
                      flexDirection: 'column',
                      margin: 2,
                      alignContent: 'stretch',
                      backgroundColor: 'grey',
                    }}
                  >
                    <Text
                      style={{
                        flex: 1,
                        height: hp('13.3%'),
                        fontSize: 20,
                        justifyContent: 'center',
                        textAlign: 'center',
                        alignContent: 'center',
                        color: 'white',
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
