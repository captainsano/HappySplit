import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

import SceneNames from './scene-names';
import Login from './scenes/login/login';
import Signup from './scenes/signup/signup';
import Friends from './scenes/friends/friends';
import Bills from './scenes/bills/bills';
import TabBar from './components/tab-bar/tab-bar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
});

const HappySplit = React.createClass({
  renderScene: function renderScene(route, navigator) {
    if (route.name === SceneNames.LOGIN_SCENE) {
      return <Login />;
    }

    if (route.name === SceneNames.SIGNUP_SCENE) {
      return <Signup />;
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

    return <Text>{route.name}</Text>;
  },

  render: function render() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{name: SceneNames.BILLS_SCENE, index: 0}}
          renderScene={this.renderScene}
        />
      </View>
    );
  },
});

AppRegistry.registerComponent('HappySplit', () => HappySplit);
