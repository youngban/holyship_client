import React, { Component } from 'react';
import { Text, View, Button, Modal, Alert, Picker } from 'react-native';
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

class CategoryScreen extends Component<Props, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      emotion: '',
    };
  }

  // setState의 category에 변수를 사용해서 handlePress를 다이내믹하게 사용할 수 있도록 리팩토링하기
  // 인자로 받아서 if문 처리
  handlePress1(emotion) {
    this.props.navigation.navigate('EmotionScreen', {
      category: emotion,
    });
  }

  handlePress2() {
    this.props.navigation.navigate('EmotionScreen', {
      category: 'BLANK',
    });
  }

  handlePress3() {
    this.props.navigation.navigate('EmotionScreen', {
      category: 'SAD',
    });
  }

  handlePress4() {
    this.props.navigation.navigate('EmotionScreen', {
      category: 'CHILL',
    });
  }

  handlePress5() {
    this.props.navigation.navigate('EmotionScreen', {
      category: 'ANGRY',
    });
  }

  handlePress6() {
    this.props.navigation.navigate('EmotionScreen', {
      category: 'CONFUSED',
    });
  }

  render() {
    // console.log(this.props);
    return (
      <View>
        <Icon
          name="sentiment-neutral"
          type="MaterialIcons"
          size={60}
          onPress={props => this.props.navigation.navigate('EmotionScreen')}
    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed');
          }}
        >
          <Picker
            selectedValue={this.state.emotion}
            onValueChange={itemValue => this.setState({ emotion: itemValue })}
          >
            <Picker.Item label="HAPPY" value="HAPPY" />
            <Picker.Item label="BLANK" value="BLANK" />
            <Picker.Item label="SAD" value="SAD" />
            <Picker.Item label="CHILL" value="CHILL" />
            <Picker.Item label="ANGRY" value="ANGRY" />
            <Picker.Item label="CONFUSED" value="CONFUSED" />
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
            onPress={() => this.handlePress1('HAPPY')}
          />
          <Text style={{ textAlign: 'center' }}>HAPPY</Text>
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
              onPress={() => this.handlePress4()}
            />
            <Text style={{ textAlign: 'center' }}>CHILL</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Icon
              name="selection-ellipse"
              size={60}
              onPress={() => this.handlePress2()}
            ></Icon>
            <Text accessibilityLabel="그냥" style={{ textAlign: 'center' }}>
              BLANK
            </Text>
          </View>

          <View>
            <Icon
              name="emoticon-cry-outline"
              size={60}
              onPress={() => this.handlePress3()}
            />
            <Text style={{ textAlign: 'center' }}>SAD</Text>
          </View>
        </View>
        {/* <View style={{ flexDirection: 'row' }}></View> */}

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <View>
            <Icon
              name="emoticon-angry-outline"
              size={60}
              onPress={() => this.handlePress5()}
            />
            <Text style={{ textAlign: 'center' }}>ANGRY</Text>
          </View>
          <View>
            <Icon
              // style={{ alignItems: 'flex-end' }}
              name="emoticon-sad-outline"
              size={60}
              onPress={() => this.handlePress6()}
            />
            <Text style={{ textAlign: 'center' }}>CONFUSED</Text>
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
