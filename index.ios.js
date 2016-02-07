import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';
import R from 'ramda';
import Parse from 'parse/react-native';
Parse.initialize('nrgzVRP9cGHm1ylUoI88KTwNjgLnjc9TLS4Q99Uf', 'OljXTx7mqFtYADVsjYKdsuA3XJlWU0zvuCwvfxh3');

import SceneNames from './scene-names';
import Login from './scenes/login/login';
import SignUp from './scenes/signup/signup';
import Friends from './scenes/friends/friends';
import AddFriend from './scenes/add-friend/add-friend';
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
  childContextTypes: {
    currentUser: React.PropTypes.object,
  },

  getChildContext: function getChildContext() {
    return {
      currentUser: this.state.currentUser,
    };
  },

  getInitialState: function getInitialState() {
    return {
      currentUser: null,
      currentUserLoading: true,
    };
  },

  componentDidMount: function componentDidMount() {
    Parse.User.currentAsync().then((currentUser) => {
      if (currentUser) {
        this.setState({currentUser, currentUserLoading: false});
      } else {
        this.setState({currentUser: null, currentUserLoading: false});
      }
    });
  },

  configureScene: function configureScene(route) {
    switch (route.name) {
      case SceneNames.ADD_FRIEND_SCENE:
      case SceneNames.SIGNUP_SCENE:
        return R.assocPath(['gestures', 'pop', 'edgeHitWidth'], 0, Navigator.SceneConfigs.FloatFromBottom);
      default: return Navigator.SceneConfigs.PushFromRight;
    }
  },

  handleLoginComplete: function handleLoginComplete(navigator) {
    return (user) => {
      this.setState({
        currentUser: user,
      }, () => {
        navigator.replace({name: SceneNames.FRIENDS_SCENE, index: 0});
      });
    };
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

  handleSignUpComplete: function handleSignUpComplete(navigator) {
    return () => {
      // TODO: Show some message for signup
      navigator.pop();
    };
  },

  handleLogout: function handleLogout(navigator) {
    return () => {
      Parse.User.logOut();
      this.setState({
        currentUser: null,
      }, () => {
        navigator.replace({name: SceneNames.LOGIN_SCENE, index: 0});
      });
    };
  },

  handleAddFriendNavigation: function handleAddFriendNavigation(navigator) {
    return () => navigator.push({name: SceneNames.ADD_FRIEND_SCENE});
  },

  renderScene: function renderScene(route, navigator) {
    if (route.name === SceneNames.LOGIN_SCENE) {
      return (
        <Login
          onSignUpNavigation={this.handleSignUpNavigation(navigator)}
          onLoginComplete={this.handleLoginComplete(navigator)}
        />
      );
    }

    if (route.name === SceneNames.SIGNUP_SCENE) {
      return (
        <SignUp
          onCloseNavigation={this.handleSignUpCloseNavigation(navigator)}
          onSignUpComplete={this.handleSignUpComplete(navigator)}
        />
      );
    }

    if (route.name === SceneNames.FRIENDS_SCENE) {
      return (
        <View style={{flex: 1}}>
          <Friends onAddFriendNavigation={this.handleAddFriendNavigation(navigator)} />
          <TabBar navigator={navigator}/>
        </View>
      );
    }

    if (route.name === SceneNames.ADD_FRIEND_SCENE) {
      return <AddFriend />;
    }

    if (route.name === SceneNames.BILLS_SCENE) {
      return (
        <View style={{flex: 1}}>
          <Bills />
          <TabBar navigator={navigator}/>
        </View>
      );
    }

    if (route.name === SceneNames.SETTINGS_SCENE) {
      return (
        <View style={{flex: 1}}>
          <Settings onLogout={this.handleLogout(navigator)} />
          <TabBar navigator={navigator}/>
        </View>
      );
    }

    return <Text>{route.name}</Text>;
  },

  render: function render() {
    if (this.state.currentUserLoading) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{
            name: this.state.currentUser ? SceneNames.FRIENDS_SCENE : SceneNames.LOGIN_SCENE,
            index: 0,
          }}
          renderScene={this.renderScene}
          configureScene={this.configureScene}
        />
      </View>
    );
  },
});

AppRegistry.registerComponent('HappySplit', () => HappySplit);
