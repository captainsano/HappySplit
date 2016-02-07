import React, {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  },

  handleCloseButtonPress: function handleCloseButtonPress() {
    this.props.onCloseNavigation();
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
          />
          <TextInput
            style={styles.textInput}
            placeholder="E-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Re-Type Password"
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TouchableHighlight>
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
