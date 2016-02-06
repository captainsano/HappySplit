import React, {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: 44,
  },
});

const BillRow = React.createClass({
  propTypes: {
    bill: React.PropTypes.object.isRequired,
  },

  render: function render() {
    return (
      <View style={styles.container}>
        <Text>Bill</Text>
      </View>
    );
  },
});

export default BillRow;
