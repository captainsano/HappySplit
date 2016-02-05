/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

class HappySplit extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appName}>
          HappySplit
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  appName: {
    fontSize: 24,
    color: 'rgb(239, 74, 29)',
  },
});

AppRegistry.registerComponent('HappySplit', () => HappySplit);
