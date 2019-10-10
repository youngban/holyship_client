import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-ui-kitten';
import axios from 'axios';

const PREFIX_URL = 'http://13.125.244.90:8000';

export default class FollowBtn extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    toggle: true,
  };

  // TODO: FOLLOW BUTTON TOGGLE
  onPressFollow = async () => {
    const newState = !this.state.toggle;
    this.setState({ toggle: newState });

    if (this.state.toggle === true) {
      const addFollow = async () => {
        try {
          const request = await axios.post(
            'http://13.125.244.90:8000/follow/add',
            {
              username: `${this.props.dataSource}`,
            }
          );
          this.setState({
            ...this.state,
            toggle: false,
          });
          console.log('[GIVE ME REQUEST]', request.data);
        } catch (err) {
          console.log(err);
        }
      };
      addFollow();
    }
  };

  render() {
    const { toggle } = this.state;
    const textValue = toggle ? 'Follow' : 'UnFollow';
    const buttonChange = toggle ? 'success' : 'primary';
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Button
            appearance="outline"
            status={buttonChange}
            size="large"
            onPress={this.onPressFollow}
          >
            {textValue}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
