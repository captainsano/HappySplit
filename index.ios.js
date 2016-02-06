import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

import Login from './scenes/login/login';

const LOGIN_SCREEN = 'login';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
});

const HappySplit = React.createClass({
  renderScene: function renderScene(route) {
    if (route.name === LOGIN_SCREEN) {
      return <Login />;
    }

    return <Text>{route.name}</Text>;
  },

  render: function render() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{name: LOGIN_SCREEN, index: 0}}
          renderScene={this.renderScene}
        />
      </View>
    );
  },
});

AppRegistry.registerComponent('HappySplit', () => HappySplit);
