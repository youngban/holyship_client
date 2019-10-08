import React, { Component } from 'react';
import { Layout, Text, Button } from 'react-native-ui-kitten';
import { Card } from 'react-native-elements';
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

interface State {}
interface Props {}

export default class MypagePosts extends Component<Props, State> {
  state = {
    total: null,
  };

  componentDidMount() {
    this.getPostTitle();
  }

  getPostTitle = async () => {
    try {
      const response = await axios.get(
        'http://13.125.244.90:8000/post/user/my'
      );
      this.setState({
        ...this.state,
        total: response.data.posts,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { total } = this.state;

    const setModalVisible = this.props;
    return !total ? (
      <ActivityIndicator />
    ) : (
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        style={{
          width: Dimensions.get('screen').width,
        }}
      >
        {total.map(item => (
          <Card
            key={item.id}
            title={item.title}
            titleNumberOfLines={1}
            titleStyle={{ color: '#eee' }}
            dividerStyle={{ backgroundColor: '#333' }}
            containerStyle={{
              width: Dimensions.get('screen').width * 0.8,
              backgroundColor: 'black',
              borderRadius: 12,
              borderColor: 'rgba(0,0,0,0)',
              shadowOffset: { width: 5, height: 5 },
              shadowColor: '#555',
            }}
          >
            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              category="p1"
              style={styles.textStyle}
            >
              {item.content}
            </Text>
            <Button
              appearance="outline"
              status="primary"
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
            >
              OPEN
            </Button>
          </Card>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    marginBottom: 18,
    color: '#eee',
    overflow: 'hidden',
  },
});
