import React, {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appMeta: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  appLogo: {
    width: 100,
    height: 100,
    backgroundColor: '#000',
    borderRadius: 5,
    marginBottom: 5,
  },
  appNameText: {
    fontSize: 24,
  },
  versionText: {
    fontSize: 12,
  },
  userMeta: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 24,
    marginBottom: 10,
  },
  logoutButton: {
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#000',
  },
  logoutButtonText: {
    color: '#fefefe',
    fontSize: 20,
  },
});

const Settings = React.createClass({
  propTypes: {
    onLogout: React.PropTypes.func.isRequired,
  },

  handleLogoutButtonPress: function handleLogoutButtonPress() {
    this.props.onLogout();
  },

  render: function render() {
    return (
      <View style={styles.container}>
        <View style={styles.appMeta}>
          <View style={styles.appLogo} />
          <Text style={styles.appNameText}>HappySplit</Text>
          <Text style={styles.appVersionText}>v1.0.0</Text>
        </View>
        <View style={styles.userMeta}>
          <Text style={styles.nameText}>Santhos Baala RS</Text>
          <TouchableHighlight
            style={styles.logoutButton}
            onPress={this.handleLogoutButtonPress}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  },
});

export default Settings;
