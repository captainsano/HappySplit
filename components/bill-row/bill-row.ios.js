import React, {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  left: {
    flex: 1,
  },
  right: {
    width: 50,
    justifyContent: 'flex-end',
  },
});

const BillRow = React.createClass({
  propTypes: {
    bill: React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      amount: React.PropTypes.number.isRequired,
      paidBy: React.PropTypes.string.isRequired,
      sharedBy: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
      settled: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    }),
  },

  render: function render() {
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <View style={styles.title}>
            <Text style={styles.billAmountText}>{this.props.bill.amount}</Text>
            <Text style={styles.billTitleText}>{this.props.bill.title}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.sharedByCountText}>Shared by {this.props.bill.sharedBy.length}</Text>
          </View>
        </View>
        <View style={styles.right}>
          {/*  TODO: Calculate how much I owe vs others owe */}
          <Text>500</Text>
        </View>
      </View>
    );
  },
});

export default BillRow;
