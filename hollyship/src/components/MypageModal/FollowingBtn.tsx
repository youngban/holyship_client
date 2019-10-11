import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-ui-kitten';
import axios from 'axios';
import { PREFIX_URL } from '../../config/config';

export default class FollowingBtn extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    toggle1: true,
    textValue: '',
  };

  onPressFollowing = async () => {
    const newState = !this.state.toggle1;
    this.setState({ toggle1: newState });

    if (this.state.toggle1 === true) {
      console.log('[DELETE]', this.state.toggle1);
      const unFollow = async () => {
        try {
          const request = await axios.delete(`${PREFIX_URL}/follow`, {
            data: { username: `${this.props.dataSource}` },
          });
          this.setState({
            ...this.state,
            toggle: false,
          });
        } catch (err) {
          console.log(err);
        }
      };
      unFollow();
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
