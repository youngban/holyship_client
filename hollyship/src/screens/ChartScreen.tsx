import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { StyleSheet, Alert, Dimensions, ScrollView } from 'react-native';
import {
  Layout,
  Text,
  List,
  ListItem,
  Button,
  Select,
} from 'react-native-ui-kitten';
import axios from 'axios';
import { Image } from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';
import { PREFIX_URL } from '../config/config';

interface Props {
  navigation: any;
  Button: string;
  Props: any;
  title: string;
}
interface State {
  musics: any;
  selectedOption: any | undefined;
  isDialogVisible: boolean;
  inputText: string;
  itemsData: any;
  playListMusics: any;
}
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

class ChartScreen extends Component<Props, State> {
  state = {
    musics: [],
    selectedOption: undefined,
    isDialogVisible: false,
    inputText: '',
    itemsData: [],
    playListMusics: [],
  };

  // TODO: INITIALIZE
  componentDidMount = () => {
    this.fetchMusics();
    this.getPlayListItems();
  };

  // TODO: Fetch Music Data
  fetchMusics = async () => {
    const response = await axios.get(`${PREFIX_URL}/music`);
    const sortedMusics = response.data.sort(
      (a: any, b: any) => b.likeUsers.length - a.likeUsers.length
    );
    const musics = sortedMusics.map(item => ({
      id: item.id,
      title: item.title,
      thumbnail: item.thumbnail,
      artist: item.artist,
      playTime: item.playTime,
      genre: item.genre,
      youtubeUrl: item.youtubeUrl,
    }));
    this.setState({
      ...this.state,
      musics,
    });
  };

  // TODO: Handle Add music in Playlist
  addMusicToPlaylist = async (musicId: number, selectedOption: any) => {
    try {
      const playlistId = selectedOption.id;
      const response = await axios.post(`${PREFIX_URL}/music/${musicId}/list`, {
        playlistId,
      });
      Alert.alert('리스트에 추가되었습니다.');
      return;
    } catch (err) {
      Alert.alert('이미 존재하는 음악입니다.');
      return;
    }
  };

  handleRenderAddMusic = async (musicId: number) => {
    const { selectedOption } = this.state;
    if (!selectedOption) {
      Alert.alert('리스트를 먼저 정해주세요.');
      return;
    } else {
      await this.addMusicToPlaylist(musicId, selectedOption);
      await this.onSelect(selectedOption);
    }
  };

  // TODO: Fetch PlayListItems
  getPlayListItems = async () => {
    const response = await axios.get(`${PREFIX_URL}/list`);
    const itemsData = response.data.map(item => ({
      id: item.id,
      text: item.listName,
    }));
    this.setState({ ...this.state, itemsData });
  };

  // TODO: Handle List Add
  handleListAdd = async input => {
    if (!input.length) {
      Alert.alert('이름을 입력해주세요!');
      return;
    } else {
      const response = await axios.post(`${PREFIX_URL}/list/add`, {
        listName: input,
      });
      const { id, listName } = response.data.list;
      await this.getPlayListItems();
      await this.onSelect({ id, text: listName });
      this.showDialog();
    }
  };

  // TODO: Show Dialog Input
  showDialog = () => {
    let { isDialogVisible } = this.state;
    isDialogVisible = !isDialogVisible;
    this.setState({ ...this.state, isDialogVisible });
  };

  // TODO: PlayList Select
  onSelect = async selectedOption => {
    this.setState({ ...this.state, selectedOption });
    const selectedListId = selectedOption.id;
    const response = await axios.get(
      `${PREFIX_URL}/list/${selectedListId}/music`
    );
    const musics = response.data[0].musics;
    this.setState({ ...this.state, playListMusics: musics });
  };

  // TODO: DELETE PLAY LIST
  handleDeleteList = async () => {
    const { selectedOption } = this.state;
    if (selectedOption) {
      Alert.alert(
        '경고',
        '정말로 삭제하시겠습니까?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              if (this.state.itemsData.length >= 1) {
                const response = await axios.delete(
                  `${PREFIX_URL}/list/${selectedOption.id}`
                );
                await this.setState({
                  ...this.state,
                  selectedOption: undefined,
                });
                await this.getPlayListItems();
                this.setState({ ...this.state, playListMusics: [] });
                Alert.alert('삭제되었습니다.');

                return;
              } else {
                Alert.alert('지울 리스트가 없습니다!');
                return;
              }
            },
          },
        ],
        { cancelable: false }
      );
      return;
    } else {
      Alert.alert('삭제할 리스트가 없습니다.');
      return;
    }
  };

  handleDeleteMusic = async (musicId: number) => {
    try {
      const { selectedOption } = this.state;
      if (selectedOption) {
        const playlistId = selectedOption.id;
        await axios.delete(`${PREFIX_URL}/music/${musicId}/list`, {
          data: { playlistId },
        });
        await this.onSelect(selectedOption);
        Alert.alert('삭제되었습니다.');
        return;
      } else {
        return;
      }
    } catch (err) {
      Alert.alert('서버 에러');
      return;
    }
  };

  // TODO: LIST ITEM RENDERING
  renderChartItem = ({ item, index }) => {
    return (
      <ListItem
        key={item.id}
        index={index}
        style={styles.renderItem}
        title={item.title}
        titleStyle={styles.listTitle}
        description={item.artist}
        descriptionStyle={styles.listDesc}
        accessory={() => (
          <Button
            appearance="outline"
            status="primary"
            onPress={() => this.handleRenderAddMusic(item.id)}
          >
            ADD
          </Button>
        )}
        icon={() => (
          <Image
            source={{ uri: item.thumbnail }}
            style={styles.listItemImage}
          />
        )}
      />
    );
  };

  // TODO: LIST ITEM RENDERING
  renderPlayListMusics = ({ item, index }) => {
    return (
      <ListItem
        key={item.id}
        index={index}
        style={styles.renderItem}
        title={item.title}
        titleStyle={styles.listTitle}
        description={item.artist}
        descriptionStyle={styles.listDesc}
        accessory={() => (
          <Button
            appearance="outline"
            status="warning"
            onPress={() => this.handleDeleteMusic(item.id)}
          >
            DELETE
          </Button>
        )}
        icon={() => (
          <Image
            source={{ uri: item.thumbnail }}
            style={styles.listItemImage}
          />
        )}
      />
    );
  };

  // TODO: MAIN
  render() {
    const { musics, itemsData, selectedOption, playListMusics } = this.state;
    const { renderChartItem, handleListAdd, renderPlayListMusics } = this;
    return (
      <ScrollView style={styles.container}>
        <Text category="h3" status="danger" style={styles.chartTitle}>
          HOT CHART
        </Text>
        <ScrollView
          horizontal={true}
          indicatorStyle="black"
          pagingEnabled
          style={styles.chartScrollView}
        >
          <Layout style={styles.chartContainer}>
            <List
              style={styles.chartList}
              scrollEnabled={false}
              data={musics.slice(0, 5)}
              renderItem={renderChartItem}
            />
          </Layout>
          <Layout style={styles.chartContainer}>
            <List
              scrollEnabled={false}
              data={musics.slice(5, 10)}
              renderItem={renderChartItem}
            />
          </Layout>
          <Layout style={styles.chartContainer}>
            <List
              scrollEnabled={false}
              data={musics.slice(10, 15)}
              renderItem={renderChartItem}
            />
          </Layout>
        </ScrollView>
        {/* PlayList */}
        <Layout style={styles.playListTitleContainer}>
          <Text category="h3" status="primary" style={styles.playListTitle}>
            PLAY LIST
          </Text>
          <Button
            appearance="outline"
            textStyle={{ fontSize: 12 }}
            style={styles.playListAddButton}
            onPress={this.showDialog}
          >
            리스트 추가
          </Button>
          <Button
            appearance="outline"
            status="warning"
            textStyle={{ fontSize: 12, fontWeight: '600' }}
            style={styles.playListAddButton}
            onPress={this.handleDeleteList}
          >
            리스트 삭제
          </Button>
          {/* 다이얼로그 (prompt) */}
          <DialogInput
            isDialogVisible={this.state.isDialogVisible}
            title={'ADD LIST'}
            message={'리스트이름을 입력해주세요'}
            hintInput={'ex: List'}
            cancelText="cancel"
            submitText="OK"
            dialogStyle={{ backgroundColor: '#ddd' }}
            submitInput={inputText => handleListAdd(inputText)}
            closeDialog={this.showDialog}
          ></DialogInput>
        </Layout>

        <Layout style={styles.playListContainer}>
          <Select
            data={itemsData}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            status="warning"
            selectedOption={selectedOption}
            onSelect={this.onSelect}
          />
          <List
            style={styles.chartList}
            scrollEnabled={false}
            data={playListMusics}
            renderItem={renderPlayListMusics}
          />
        </Layout>
      </ScrollView>
    );
  }
}

const ChartStack = createStackNavigator(
  {
    Chart: {
      screen: ChartScreen,
    },
  },
  {
    defaultNavigationOptions: () => ({
      title: 'Chart',
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: 'ghostwhite',
    }),
  }
);

export default ChartStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101426',
  },
  chartTitle: {
    margin: 10,
  },
  chartScrollView: {
    marginBottom: 20,
  },
  chartContainer: {
    width: SCREEN_WIDTH,
  },
  chartList: {
    // backgroundColor: 'rgba(0,0,0,0)',
  },
  renderItem: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  listItemImage: {
    width: 50,
    height: 40,
    margin: 15,
  },
  listTitle: {
    margin: 5,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: '600',
  },
  listDesc: {
    marginLeft: 10,
  },
  modalContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playListContainer: {
    //
  },
  playListTitleContainer: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  playListTitle: {
    marginRight: 15,
  },
  playListAddButton: {
    marginRight: 10,
    borderRadius: 20,
    color: '#fff',
  },
  labelStyle: {
    color: 'gray',
  },
  placeholderStyle: { color: 'gray' },
});
