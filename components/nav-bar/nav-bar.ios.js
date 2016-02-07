import React, {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  navbar: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  navbarTitleText: {
    color: '#fefefe',
    fontSize: 20,
  },
});

const NavBar = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    children: React.PropTypes.any,
  },

  render: function render() {
    return (
      <View style={styles.navbar}>
        <Text style={styles.navbarTitleText}>{this.props.title}</Text>
        {this.props.children}
      </View>
    );
  },
});

export default NavBar;
