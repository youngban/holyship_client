import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-ui-kitten';
import axios from 'axios';
import { PREFIX_URL } from '../../config/config';

export default class MainFollowBtn extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    toggle: true,
  };

  // componentDidMount() {
  //   this.checkFollowState();
  // }

  // checkFollowState = async () => {
  //   try {
  //     const response = await axios.get(`${PREFIX_URL}/follow/following`);

  //     this.setState({
  //       ...this.state,
  //       toggle: response.data.map(item => {
  //         return item.followingName === `${this.props.currentModalData}`
  //           ? true
  //           : false;
  //         console.log(
  //           '[팔로우 상태]',
  //           item.followingName === `${this.props.currentModalData}`
  //         );
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
    // console.log('[toggle]', newState);
    if (this.state.toggle === true) {
      const addMAinFollow = async () => {
        try {
          // console.log(['FollowBtn', this.state.toggle]);
          const request = await axios.post(`${PREFIX_URL}/follow/add`, {
            username: `${this.props.currentModalData}`,
          });
          this.setState({
            ...this.state,
            toggle: false,
          });
          // console.log('[GIVE ME REQUEST]', request.data);
        } catch (err) {
          console.log(err);
        }
      };
      addMAinFollow();
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
            size="tiny"
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
