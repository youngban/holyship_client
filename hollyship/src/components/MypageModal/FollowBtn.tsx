import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-ui-kitten';
import axios from 'axios';
import { PREFIX_URL } from '../../config/config';

export default class FollowBtn extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    toggle: true,
    textValue: '',
  };

  // onClick() {
  //   this.setState(() => ({ toggle: false }));
  // }

  // changeToggle = () => {
  //   this.setState({ toggle: false });
  // };

  // checkFollowingState = async () => {
  //   const newState = !this.state.toggle;
  //   try {
  //     const response = await axios.get(`${PREFIX_URL}/follow/following`);
  //     console.log('[팔로우 되어있는 사람들]', response.data);
  //     this.setState({
  //       ...this.state,
  //       toggle: response.data.map(item => {
  //         return item.followingName !== undefined &&
  //       }),
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // TODO: FOLLOW BUTTON TOGGLE
  onPressFollow = async () => {
    const newState = !this.state.toggle;

    this.setState({ toggle: newState });

    if (this.state.toggle === true) {
      const addFollow = async () => {
        try {
          const request = await axios.post(`${PREFIX_URL}/follow/add`, {
            username: `${this.props.dataSource}`,
          });
          console.log(request.data);
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
    const textValue = toggle ? 'Follow' : 'Following';
    const buttonChange = toggle ? 'success' : 'primary';
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Button
            appearance="outline"
            size="large"
            status={buttonChange}
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
