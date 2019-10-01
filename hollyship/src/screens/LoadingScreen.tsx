import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

class LoadingScreen extends Component {
  state = { animating: true };

  closeActivityIndicator = () =>
    setTimeout(
      () =>
        this.setState({
          animating: false,
        }),
      60000
    );

  componentDidMount = () => this.closeActivityIndicator();
  render() {
    const animating = this.state.animating;
    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={animating}
          color="#bc2b78"
          size="large"
          style={styles.activityIndicator}
        />
      </View>
    );
  }
}
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});
// import React from 'react';
// import { AsyncStorage, ActivityIndicator, StatusBar, View } from 'react-native';
// import { getAccessToken } from 'src/utils/api';

// interface Props {
//   navigation: any;
// }
// interface State {}

// class LoadingScreen extends React.Component<Props, State> {
//   constructor(props) {
//     super(props);
//   }
//   async _accessToken() {
//     try {
//       let token = await getAccessToken();
//       this.props.navigation.navigate(token ? 'App' : 'Auth');
//     } catch (e) {
//       console.log(e);
//     }
//   }
//   render() {
//     return (
//       <View>
//         <ActivityIndicator />
//       </View>
//     );
//   }

// }
// export default LoadingScreen;
