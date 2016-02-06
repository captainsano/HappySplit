import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

import Login from './scenes/login/login';
import Signup from './scenes/signup/signup';

const LOGIN_SCENE = 'login';
const SIGNUP_SCENE = 'signup';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
});

const HappySplit = React.createClass({
  renderScene: function renderScene(route) {
    if (route.name === LOGIN_SCENE) {
      return <Login />;
    }

    if (route.name === SIGNUP_SCENE) {
      return <Signup />;
    }

    return <Text>{route.name}</Text>;
  },

  render: function render() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{name: SIGNUP_SCENE, index: 0}}
          renderScene={this.renderScene}
        />
      </View>
    );
  },
});

AppRegistry.registerComponent('HappySplit', () => HappySplit);
