// TODO: Figure out how to autoscroll on keyboard entry
import React, {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import R from 'ramda';
import Parse from 'parse/react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fefefe',
  },
  logoBox: {
    width: 100,
    height: 100,
    marginBottom: 30,
    borderRadius: 5,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBoxText: {
    fontSize: 10,
    color: '#fefefe',
  },
  loginBox: {
    width: 280,
    marginBottom: 150,
    flexDirection: 'column',
  },
  textInput: {
    height: 40,
    fontSize: 18,
    marginBottom: 10,
  },
  loginButtonContainer: {
    height: 40,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonContainerText: {
    fontSize: 20,
    color: '#fefefe',
  },
  signUpButtonContainer: {
    marginTop: 12,
  },
  signUpButtonText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

const Login = React.createClass({
  propTypes: {
    onSignUpNavigation: React.PropTypes.func.isRequired,
    onLoginComplete: React.PropTypes.func.isRequired,
  },

  getInitialState: function getInitialState() {
    return {
      loggingIn: false,
      error: '',
      email: '',
      password: '',
    };
  },

  handleSignUpButtonPress: function handleSignUpButtonPress() {
    this.props.onSignUpNavigation();
  },

  handleLoginButtonPress: function handleLoginButtonPress() {
    // TODO: Add validation
    this.setState({
      loggingIn: true,
    }, () => {
      Parse.User.logIn(this.state.email, this.state.password, {
        success: (user) => {
          this.props.onLoginComplete(user);
        },
        error: (user, error) => {
          // TODO: handle error
          console.log(error);
        },
      });
    });
  },

  handleChangeText: function handleChangeText(targetStateField) {
    return (text) => {
      this.setState(R.assoc(targetStateField, text, {}));
    };
  },

  render: function render() {
    const loginBox = (() => {
      if (this.state.loggingIn) {
        return (
          <View style={styles.loginBox}>
            <Text>Logging in...</Text>
          </View>
        );
      }

      return (
        <View style={styles.loginBox}>
          <TextInput
            style={styles.textInput}
            placeholder="E-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoFocus
            autoCapitalize="none"
            onChangeText={this.handleChangeText('email')}
            value={this.state.email}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={this.handleChangeText('password')}
            value={this.state.password}
          />
          <TouchableHighlight
            style={styles.loginButtonContainer}
            onPress={this.handleLoginButtonPress}
          >
            <Text style={styles.loginButtonContainerText}>Login</Text>
          </TouchableHighlight>
          <TouchableOpacity
            style={styles.signUpButtonContainer}
            onPress={this.handleSignUpButtonPress}
          >
            <Text style={styles.signUpButtonText}>New? Sign Up!</Text>
          </TouchableOpacity>
        </View>
      );
    })();

    return (
      <View style={styles.container}>
        <View style={styles.logoBox}>
          <Text style={styles.logoBoxText}>LOGO</Text>
        </View>
        {loginBox}
      </View>
    );
  },
});

export default Login;
