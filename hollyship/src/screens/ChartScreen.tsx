import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { StyleSheet, Alert, Dimensions, ScrollView } from 'react-native';
import { Layout, Text, List, ListItem, Button } from 'react-native-ui-kitten';
import axios from 'axios';
import { Image } from 'react-native-elements';

interface Props {
  navigation: any;
  Button: string;
  Props: any;
  title: string;
}
interface State {}

const PREFIX_URL = 'http://13.125.244.90:8000';
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

class ChartScreen extends React.Component<Props, State> {
  state = {
    musics: [],
  };

  componentDidMount = () => {
    this.fetchMusics();
  };

  fetchMusics = async () => {
    const response = await axios.get(`${PREFIX_URL}/music`);
    console.log(response.data[0].likeUsers.length);
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

  // TODO: LIST ITEM RENDERING
  renderItem = ({ item, index }) => {
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
          <Button appearance="outline" status="primary">
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

  // TODO: MAIN
  render() {
    const { musics } = this.state;
    const { renderItem } = this;
    return (
      <ScrollView style={styles.container}>
        <Text category="h3" status="danger" style={styles.chartTitle}>
          HOT CHART
        </Text>
        <ScrollView horizontal={true} style={styles.chartScrollView}>
          <Layout style={styles.chartContainer}>
            <List
              style={styles.chartList}
              scrollEnabled={false}
              data={musics.slice(0, 5)}
              renderItem={renderItem}
            />
          </Layout>
          <Layout style={styles.chartContainer}>
            <List
              scrollEnabled={false}
              data={musics.slice(5, 10)}
              renderItem={renderItem}
            />
          </Layout>
          <Layout style={styles.chartContainer}>
            <List
              scrollEnabled={false}
              data={musics.slice(10, 15)}
              renderItem={renderItem}
            />
          </Layout>
        </ScrollView>
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
});
