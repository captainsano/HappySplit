import React, {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import R from 'ramda';
import Icon from 'react-native-vector-icons/FontAwesome';
import Parse from 'parse/react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fefefe',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  signupBox: {
    marginTop: 75,
    width: 280,
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

const SignUp = React.createClass({
  propTypes: {
    onCloseNavigation: React.PropTypes.func.isRequired,
    onSignUpComplete: React.PropTypes.func.isRequired,
  },

  getInitialState: function getInitialState() {
    return {
      name: '',
      email: '',
      password1: '',
      password2: '',
      submitting: false,
      submitError: '',
      completed: false,
    };
  },

  handleTextFieldChange: function handleTextFieldChange(targetStateField) {
    return (text) => {
      this.setState(R.assoc(targetStateField, text, {}));
    };
  },

  handleCloseButtonPress: function handleCloseButtonPress() {
    // TODO: Form validation
    this.props.onCloseNavigation();
  },

  handleSignupButtonPress: function handleSignupButtonPress() {
    // TODO: Form validation
    this.setState({
      submiting: true,
      submitError: '',
    }, () => {
      const user = new Parse.User();
      user.set('username', this.state.email);
      user.set('name', this.state.name);
      user.set('password', this.state.password1);
      user.signUp(null, {
        success: (u) => {
          // TODO: Show some message for signup complete
          this.props.onSignUpComplete();
        },
        error: (u, error) => {
          console.log('Error signing up!', error);
          // TODO: Handle Errors
        },
      });
    });
  },

  render: function render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButtonContainer}
          onPress={this.handleCloseButtonPress}
        >
          <Icon style={styles.closeButton} name="times" size={30} />
        </TouchableOpacity>
        <View style={styles.signupBox}>
          <TextInput
            style={styles.textInput}
            placeholder="Your Name"
            autoCorrect={false}
            autoFocus
            onChangeText={this.handleTextFieldChange('name')}
            value={this.state.name}
          />
          <TextInput
            style={styles.textInput}
            placeholder="E-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={this.handleTextFieldChange('email')}
            value={this.state.email}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={this.handleTextFieldChange('password1')}
            value={this.state.password1}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Re-Type Password"
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={this.handleTextFieldChange('password2')}
            value={this.state.password2}
          />
          <TouchableHighlight onPress={this.handleSignupButtonPress}>
            <View style={styles.loginButtonContainer}>
              <Text style={styles.loginButtonContainerText}>Sign Up</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  },
});

export default SignUp;
