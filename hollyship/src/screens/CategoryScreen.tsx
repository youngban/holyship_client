import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Modal,
  Alert,
  Picker,
  StyleSheet,
} from 'react-native';
import {
  createStackNavigator,
  NavigationStackProp,
} from 'react-navigation-stack';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EmotionScreen from './EmotionScreen';
import { TextInput } from 'react-native-gesture-handler';

type MyState = { isVisible: boolean; emotion: string };

type Props = {
  navigation: NavigationStackProp<{ category: 'string' }>;
};

const emotions = ['HAPPY', 'BLANK', 'SAD', 'CHILL', 'ANGRY', 'CONFUSED'];
class CategoryScreen extends Component<Props, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      emotion: '',
    };
  }

  // setState의 category에 변수를 사용해서 handlePress를 다이내믹하게 사용할 수 있도록 리팩토링하기
  // const emotions = [{category:'happy',icon:'emoticon-outline'}]
  handlePress(emotion) {
    this.props.navigation.navigate('EmotionScreen', {
      category: emotion,
    });
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
          <Picker
            selectedValue={this.state.emotion}
            onValueChange={itemValue => this.setState({ emotion: itemValue })}
          >
            {emotions.map(item => (
              <Picker.Item label={item} value={item} key={item} />
            ))}
          </Picker>
          <Button
            title="Post"
            onPress={() => {
              this.setState({ isVisible: !this.state.isVisible });
            }}
          ></Button>
          <TextInput></TextInput>
        </Modal>

        <Button
          title="writing"
          onPress={() => this.setState({ isVisible: !this.state.isVisible })}
        >
          Write
        </Button>

        <View style={{ alignItems: 'center' }}>
          <Icon
            name="emoticon-outline"
            size={60}
            onPress={() => this.handlePress('HAPPY')}
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
              onPress={() => this.handlePress('CHILL')}
            />
            <Text style={styles.iconTitle}>CHILL</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Icon
              name="selection-ellipse"
              size={60}
              onPress={() => this.handlePress('BLANK')}
            ></Icon>
            <Text accessibilityLabel="그냥" style={{ textAlign: 'center' }}>
              BLANK
            </Text>
          </View>

          <View>
            <Icon
              name="emoticon-cry-outline"
              size={60}
              onPress={() => this.handlePress('SAD')}
            />
            <Text style={styles.iconTitle}>SAD</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <View>
            <Icon
              name="emoticon-angry-outline"
              size={60}
              onPress={() => this.handlePress('ANGRY')}
            />
            <Text style={styles.iconTitle}>ANGRY</Text>
          </View>
          <View>
            <Icon
              name="emoticon-sad-outline"
              size={60}
              onPress={() => this.handlePress('CONFUSED')}
            />
            <Text style={styles.iconTitle}>CONFUSED</Text>
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
  },
  {
    defaultNavigationOptions: () => ({
      title: 'Category',
    }),
  }
);

export default CategoryStack;

const styles = StyleSheet.create({
  iconTitle: {
    textAlign: 'center',
  },
});
