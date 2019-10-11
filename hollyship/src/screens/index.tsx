import React from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from 'react-native-ui-kitten';

import Join from './JoinScreen';
import Login from './LoginScreen';
import HomeStack from './HomeScreen';
import CategoryStack from './CategoryScreen';
import ChartStack from './ChartScreen';
import UserStack from './UserScreen';
import Splash from './Splash';

const AuthStack = createStackNavigator(
  {
    Login,
    Join,
  },
  { initialRouteName: 'Login', headerMode: 'none' }
);

interface State {
  selectedIndex: number;
}

interface Props {
  navigation: any;
}

export class BottomNavigationShowcase extends React.Component<Props, State> {
  state: State = {
    selectedIndex: 1,
  };

  emotionIcon = style => (
    <Icon
      {...style}
      name="heart"
      fill={this.state.selectedIndex === 0 ? '#f33' : '#ccc'}
    />
  );
  homeIcon = style => (
    <Icon
      {...style}
      name="home"
      fill={this.state.selectedIndex === 1 ? '#33f' : '#ccc'}
    />
  );
  chartIcon = style => (
    <Icon
      {...style}
      name="music"
      fill={this.state.selectedIndex === 2 ? '#33f' : '#ccc'}
    />
  );
  myPageIcon = style => (
    <Icon
      {...style}
      name="person"
      fill={this.state.selectedIndex === 3 ? '#33f' : '#ccc'}
    />
  );

  onTabSelect = (selectedIndex: number): void => {
    this.setState({ selectedIndex });
    const {
      [selectedIndex]: selectedRoute,
    } = this.props.navigation.state.routes;
    this.props.navigation.navigate(selectedRoute.routeName);
  };

  render(): React.ReactNode {
    const { emotionIcon, homeIcon, chartIcon, myPageIcon } = this;
    return (
      <BottomNavigation
        style={styles.bottomNavigation}
        indicatorStyle={styles.indicator}
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onTabSelect}
      >
        <BottomNavigationTab
          style={styles.tab}
          titleStyle={styles.tabTitle}
          title="Emotion"
          // icon={emotionIcon}
        />
        <BottomNavigationTab
          style={styles.tab}
          titleStyle={styles.tabTitle}
          title="Home"
          // icon={homeIcon}
        />
        <BottomNavigationTab
          style={styles.tab}
          titleStyle={styles.tabTitle}
          title="Chart"
          // icon={chartIcon}
        />
        <BottomNavigationTab
          style={styles.tab}
          titleStyle={styles.tabTitle}
          title="MyPage"
          // icon={myPageIcon}
        />
      </BottomNavigation>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Category: CategoryStack,
    Home: HomeStack,
    Chart: ChartStack,
    Mypage: UserStack,
  },
  {
    initialRouteName: 'Home',
    tabBarComponent: BottomNavigationShowcase,
  }
);

const Total = createSwitchNavigator(
  {
    Splash,
    App: TabNavigator,
    Auth: AuthStack,
  },
  { initialRouteName: 'Splash' }
);

const styles = StyleSheet.create({
  bottomNavigation: {
    backgroundColor: '#000',
    paddingTop: 10,
    paddingBottom: 15,
  },
  indicator: { backgroundColor: '#33f' },
  tab: { backgroundColor: '#000' },
  tabTitle: {
    color: '#ddd',
  },
});

export default createAppContainer(Total);
