import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

import Login from './scenes/login/login';
import Signup from './scenes/signup/signup';
import Friends from './scenes/friends/friends';
import TabBar from './components/tab-bar/tab-bar';

const LOGIN_SCENE = 'login';
const SIGNUP_SCENE = 'signup';
const FRIENDS_SCENE = 'friends';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
});

const HappySplit = React.createClass({
  renderScene: function renderScene(route, navigator) {
    if (route.name === LOGIN_SCENE) {
      return <Login />;
    }

    if (route.name === SIGNUP_SCENE) {
      return <Signup />;
    }

    if (route.name === FRIENDS_SCENE) {
      return (
        <View style={{flex: 1}}>
          <Friends />
          <TabBar navigator={navigator} />
        </View>
      );
    }

    return <Text>{route.name}</Text>;
  },

  render: function render() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{name: FRIENDS_SCENE, index: 0}}
          renderScene={this.renderScene}
        />
      </View>
    );
  },
});

AppRegistry.registerComponent('HappySplit', () => HappySplit);
