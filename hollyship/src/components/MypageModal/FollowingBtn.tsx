import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-ui-kitten';
import axios from 'axios';

export default class FollowingBtn extends Component {
  state = {
    toggle1: true,
    textValue: '',
  };

  onPressFollowing = async () => {
    const newState = !this.state.toggle1;
    this.setState({ toggle1: newState });
    if (this.state.toggle1 === true) {
      const addFollowing = async () => {
        try {
          const response = await axios.post(
            'http://13.125.244.90:8000/follow/following'
          );
          // console.log('[Following]', response.data);
          this.setState({
            ...this.state,
            toggle1: false,
          });
        } catch (err) {
          console.log(err);
        }
      };
      addFollowing();
    } else {
      try {
        const unFollow = async () => {
          const request = await axios.delete(
            'http://13.125.244.90:8000/follow'
          );
          console.log(request.data);
        };
      } catch (err) {
        console.log(err);
      }
    }
  };

  render() {
    const { toggle1 } = this.state;
    const textValue1 = toggle1 ? 'UnFollow' : 'Follow';
    const buttonChange = toggle1 ? 'danger' : 'success';
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Button
            appearance="outline"
            status={buttonChange}
            size="large"
            onPress={this.onPressFollowing}
          >
            {textValue1}
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
  },
});
