// import React, { Component } from 'react';
// import { createStackNavigator } from 'react-navigation-stack';
// import {
//   Text,
//   View,
//   StyleSheet,
//   StatusBar,
//   Alert,
//   TouchableOpacity,
//   AsyncStorage,
// } from 'react-native';

// import { createAppContainer } from 'react-navigation';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// // import { Icon, Button } from 'react-native-elements';
// import AppNavigator from '../components/Mypage/index';
// import Info from './Info';
// import Edit from './Edit';

// const axios = require('axios');

// const AppIndex = createAppContainer(AppNavigator);

// interface Props {
//   navigation: any;
// }

// class UserScreen extends Component<Props> {
//   static navigationOptions = ({ navigation }) => {
//     return {
//       headerTitle: 'Edit',
//       headerStyle: {
//         backgroundColor: 'black',
//       },
//       headerTintColor: 'ghostwhite',
//       headerRight: (
//         <Icon
//           name="account-circle-outline"
//           size={35}
//           color="white"
//           onPress={() => navigation.navigate('Info')}
//         />
//       ),
//     };
//   };
//   handleLogout() {
//     axios
//       .get('http://13.125.244.90:8000/auth/logout')
//       .then(this.props.navigation.navigate('Login'))
//       .then(AsyncStorage.removeItem('access_token'))
//       .catch(err => Alert.alert(err));
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         {/* <StatusBar backgroundColor="red" barStyle="light-content" /> */}
//         <View style={styles.header}>
//           <TouchableOpacity
//             style={{
//               borderColor: 'plum',
//               borderWidth: 3,
//               borderRadius: 40,
//             }}
//             onPress={this.handleLogout.bind(this)}
//           >
//             <Text style={{ color: 'white', margin: 3 }}>Log-Out</Text>
//           </TouchableOpacity>
//         </View>
//         <AppIndex />
//       </View>
//     );
//   }
// }

// const UserStack = createStackNavigator(
//   {
//     UserScreen,
//     Info,
//     Edit,
//   },
//   {
//     defaultNavigationOptions: () => ({
//       title: 'MyPage',
//       headerStyle: {
//         backgroundColor: 'black',
//       },
//       headerTintColor: 'ghostwhite',
//     }),
//   }
// );

// export default UserStack;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {import React, { Component } from 'react';
//   import { createStackNavigator } from 'react-navigation-stack';
//   import {
//     Text,
//     View,
//     StyleSheet,
//     StatusBar,
//     Alert,
//     TouchableOpacity,
//     AsyncStorage,
//   } from 'react-native';

//   import { createAppContainer } from 'react-navigation';
//   import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//   // import { Icon, Button } from 'react-native-elements';
//   import AppNavigator from '../components/Mypage/index';
//   import Info from './Info';
//   import Edit from './Edit';

//   const axios = require('axios');

//   const AppIndex = createAppContainer(AppNavigator);

//   interface Props {
//     navigation: any;
//   }

//   class UserScreen extends Component<Props> {
//     static navigationOptions = ({ navigation }) => {
//       return {
//         headerTitle: 'Edit',
//         headerStyle: {
//           backgroundColor: 'black',
//         },
//         headerTintColor: 'ghostwhite',
//         headerRight: (
//           <Icon
//             name="account-circle-outline"
//             size={35}
//             color="white"
//             onPress={() => navigation.navigate('Info')}
//           />
//         ),
//       };
//     };
//     handleLogout() {
//       axios
//         .get('http://13.125.244.90:8000/auth/logout')
//         .then(this.props.navigation.navigate('Login'))
//         .then(AsyncStorage.removeItem('access_token'))
//         .catch(err => Alert.alert(err));
//     }

//     render() {
//       return (
//         <View style={styles.container}>
//           {/* <StatusBar backgroundColor="red" barStyle="light-content" /> */}
//           <View style={styles.header}>
//             <TouchableOpacity
//               style={{
//                 borderColor: 'plum',
//                 borderWidth: 3,
//                 borderRadius: 40,
//               }}
//               onPress={this.handleLogout.bind(this)}
//             >
//               <Text style={{ color: 'white', margin: 3 }}>Log-Out</Text>
//             </TouchableOpacity>
//           </View>
//           <AppIndex />
//         </View>
//       );
//     }
//   }

//   const UserStack = createStackNavigator(
//     {
//       UserScreen,
//       Info,
//       Edit,
//     },
//     {
//       defaultNavigationOptions: () => ({
//         title: 'MyPage',
//         headerStyle: {
//           backgroundColor: 'black',
//         },
//         headerTintColor: 'ghostwhite',
//       }),
//     }
//   );

//   export default UserStack;

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//     },
//     header: {
//       backgroundColor: 'black',
//       color: 'ghostwhite',
//       height: 30,
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'flex-end',
//       borderTopWidth: 1,
//       borderTopColor: 'tomato',
//     },
//   });

//     backgroundColor: 'black',
//     color: 'ghostwhite',
//     height: 30,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     borderTopWidth: 1,
//     borderTopColor: 'tomato',
//   },
// });
