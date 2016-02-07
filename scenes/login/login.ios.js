// TODO: Figure out how to autoscroll on keyboard entry
import React, {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

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
  },

  handleSignUpButtonPress: function handleSignUpButtonPress() {
    this.props.onSignUpNavigation();
  },

  render: function render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoBox}>
          <Text style={styles.logoBoxText}>LOGO</Text>
        </View>
        <View style={styles.loginBox}>
          <TextInput
            style={styles.textInput}
            placeholder="E-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoFocus
            autoCapitalize="none"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TouchableHighlight>
            <View style={styles.loginButtonContainer}>
              <Text style={styles.loginButtonContainerText}>Login</Text>
            </View>
          </TouchableHighlight>
          <TouchableOpacity
            style={styles.signUpButtonContainer}
            onPress={this.handleSignUpButtonPress}
          >
            <Text style={styles.signUpButtonText}>New? Sign Up!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
});

export default Login;
