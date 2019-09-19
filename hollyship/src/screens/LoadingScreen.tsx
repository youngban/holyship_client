// import React from 'react';
// import { AsyncStorage, ActivityIndicator, StatusBar, View } from 'react-native';

// class LoadingScreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this._bootstrapAsync();
//   }
//   _bootstrapAsync = async () => {
//     const userToken = await AsyncStorage.getItem('userToken');
//     this.props.navigation.navigate(userToken ? 'App' : 'Auth');
//   };
//   render() {
//     return (
//       <View>
//         <ActivityIndicator />
//         <StatusBar barStyle="default" />
//       </View>
//     );
//   }
// }
