import React, {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: '#ccc',
  },
});

const TabBar = React.createClass({
  propTypes: {
    navigator: React.PropTypes.object.isRequired,
  },

  render: function render() {
    return (
      <View style={styles.container} />
    );
  },
});

export default TabBar;