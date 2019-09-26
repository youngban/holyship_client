import React from 'react';
import { AsyncStorage, ActivityIndicator, StatusBar, View } from 'react-native';
import { getAccessToken } from 'src/utils/api';

interface Props {
  navigation: any;
}
interface State {}

class LoadingScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }
  async _accessToken() {
    try {
      let token = await getAccessToken();
      this.props.navigation.navigate(token ? 'App' : 'Auth');
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  // _bootstrapAsync = async () => {
  //   const userToken = await AsyncStorage.getItem('userToken');
  //   this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  // };
  // render() {
  //   return (
  //     <View>
  //       <ActivityIndicator />
  //       <StatusBar barStyle="default" />
  //     </View>
  //   );
  // }
}
export default LoadingScreen;
