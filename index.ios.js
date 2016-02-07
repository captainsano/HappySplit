import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';
import R from 'ramda';

import SceneNames from './scene-names';
import Login from './scenes/login/login';
import SignUp from './scenes/signup/signup';
import Friends from './scenes/friends/friends';
import Bills from './scenes/bills/bills';
import Settings from './scenes/settings/settings';
import TabBar from './components/tab-bar/tab-bar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
});

const HappySplit = React.createClass({
  configureScene: function configureScene(route) {
    if (route.name === SceneNames.SIGNUP_SCENE) {
      // Disable swipe-to-close gesture
      return R.assocPath(['gestures', 'pop', 'edgeHitWidth'], 0, Navigator.SceneConfigs.FloatFromBottom);
    }
  },

  handleSignUpNavigation: function handleSignUpNavigation(navigator) {
    return () => {
      navigator.push({name: SceneNames.SIGNUP_SCENE});
    };
  },

  handleSignUpCloseNavigation: function handleSignUpCloseNavigation(navigator) {
    return () => {
      navigator.pop();
    };
  },

  renderScene: function renderScene(route, navigator) {
    if (route.name === SceneNames.LOGIN_SCENE) {
      return (
        <Login
          onSignUpNavigation={this.handleSignUpNavigation(navigator)}
        />
      );
    }

    if (route.name === SceneNames.SIGNUP_SCENE) {
      return (
        <SignUp
          onCloseNavigation={this.handleSignUpCloseNavigation(navigator)}
        />
      );
    }

    if (route.name === SceneNames.FRIENDS_SCENE) {
      return (
        <View style={{flex: 1}}>
          <Friends />
          <TabBar navigator={navigator} />
        </View>
      );
    }

    if (route.name === SceneNames.BILLS_SCENE) {
      return (
        <View style={{flex: 1}}>
          <Bills />
          <TabBar navigator={navigator} />
        </View>
      );
    }

    if (route.name === SceneNames.SETTINGS_SCENE) {
      return (
        <View style={{flex: 1}}>
          <Settings />
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
          initialRoute={{name: SceneNames.LOGIN_SCENE, index: 0}}
          renderScene={this.renderScene}
          configureScene={this.configureScene}
        />
      </View>
    );
  },
});

AppRegistry.registerComponent('HappySplit', () => HappySplit);
