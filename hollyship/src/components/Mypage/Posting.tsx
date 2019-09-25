import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import PostingData from '../Mypage/PostingData';
import SwipeOut from 'react-native-swipeout';

interface Props {
  index: any;
  parentFlatList: any;
  item: {
    id: string;
    title: string;
    user_id: string;
    like_count: number;
    emotion_id: string;
  };
}
interface State {
  activeRowKey: string;
}
interface Item {
  children: object;
  item: object;
  SwipeOut: any;
  onPress: void;
  type: any;
}

class Item extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: '',
    };
  }
  render() {
    const swipeSettings: object = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        if (this.state.activeRowKey !== '') {
          this.setState({ activeRowKey: '' });
        }
      },
      onOpen: (secId, rowId, direction) => {
        this.setState({ activeRowKey: this.props.item.id });
      },
      right: [
        {
          onPress: () => {
            const deleteingRow = this.state.activeRowKey;
            Alert.alert(
              'Alert',
              'Are you sure you want to delete ?',
              [
                {
                  text: 'No',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => {
                    PostingData.splice(this.props.index, 1);
                    //!  Refresh FlatList
                    this.props.parentFlatList.refreshFlatList(deleteingRow);
                  },
                },
              ],
              { cancelable: true }
            );
          },
          text: 'Delete',
          type: 'delete',
        },
      ],
      rowId: this.props.index,
      sectionId: 1,
    };
    return (
      <SwipeOut {...swipeSettings} style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}> {this.props.item.title}</Text>
          <Text style={styles.text}> {this.props.item.emotion_id}</Text>
          <Text style={styles.text}>❤ {this.props.item.like_count}</Text>
          <Text style={styles.text}> {this.props.item.user_id}</Text>
        </View>
      </SwipeOut>
    );
  }
}

interface Props {}

export default class Posting extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      deletedRowKey: null,
    };
  }
  refreshFlatList = deletedKey => {
    this.setState(prevState => {
      return {
        deletedRowKey: deletedKey,
      };
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={PostingData}
          renderItem={({ item, index }) => {
            return (
              <Item item={item} index={index} parentFlatList={this}></Item>
            );
          }}
        ></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 25,
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
  main: {
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#00FF00',
    padding: 10,
    marginBottom: 10,
  },
});
