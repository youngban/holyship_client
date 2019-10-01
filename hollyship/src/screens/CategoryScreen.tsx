import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Modal,
  Alert,
  Picker,
  FlatList,
  StyleSheet,
  TouchableOpacity,
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

type MyState = { isVisible: boolean; emotion: string };

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
      emotion: '',
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Category',
    headerRight: (
      <Icon
        name="lead-pencil"
        color="white"
        size={30}
        // onPress={navigation.state.params.handleModal}
      ></Icon>
    ),
  });

  // setState의 category에 변수를 사용해서 handlePress를 다이내믹하게 사용할 수 있도록 리팩토링하기
  // const emotions = [{category:'happy',icon:'emoticon-outline'}]
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

  // handleModal = () => {
  //   this.setState({
  //     isVisible: !this.state.isVisible,
  //   });
  // };

  componentDidMount() {
    // this.props.navigation.setParams({
    //   handleSave: this.handleModal,
    // });
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

              <View style={{ paddingEnd: '10%' }}>
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
              {emotions.map(item => (
                <Picker.Item
                  label={item.title}
                  value={item.title}
                  key={item.title}
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
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Button
              title="writing"
              onPress={() =>
                this.setState({ isVisible: !this.state.isVisible })
              }
            >
              Write
            </Button>
            <View style={{ flex: 1, backgroundColor: 'black' }}>
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
                        height: hp('12.5%'),
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
                numColumns={1}
                keyExtractor={index => index.toString()}
              ></FlatList>
            </View>
          </View>
        </View>

        {/* 
        <View style={{ alignItems: 'center' }}>
          <Icon
            name="emoticon-outline"
            size={60}
            onPress={() => this.handlePress('happy')}
          />
          <Text style={styles.iconTitle}>HAPPY</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 30,
            marginBottom: 30,
          }}
        >
          <View>
            <Icon
              name="emoticon-cool-outline"
              size={60}
              onPress={() => this.handlePress('chill')}
            />
            <Text style={styles.iconTitle}>CHILL</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Icon
              name="selection-ellipse"
              size={60}
              onPress={() => this.handlePress('blank')}
            ></Icon>
            <Text accessibilityLabel="그냥" style={{ textAlign: 'center' }}>
              BLANK
            </Text>
          </View>

          <View>
            <Icon
              name="emoticon-cry-outline"
              size={60}
              onPress={() => this.handlePress('sad')}
            />
            <Text style={styles.iconTitle}>SAD</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <View>
            <Icon
              name="emoticon-angry-outline"
              size={60}
              onPress={() => this.handlePress('angry')}
            />
            <Text style={styles.iconTitle}>ANGRY</Text>
          </View>
          <View>
            <Icon
              name="emoticon-sad-outline"
              size={60}
              onPress={() => this.handlePress('confused')}
            />
            <Text style={styles.iconTitle}>CONFUSED</Text>
          </View>
        </View> */}
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
      title: 'Category',
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
