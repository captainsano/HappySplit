import R from 'ramda';
import React, {
  View,
  Text,
  ListView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summaryBox: {
    height: 54,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  summaryBoxText: {
    color: '#fefefe',
  },
  summaryInnerContainer: {
    flex: 0.3,
    flexDirection: 'column',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  youOweContainer: {},
  theyOweContainer: {},
  totalContainer: {},
  summaryLabelText: {
    fontSize: 12,
    marginBottom: 2.5,
  },
  valueLabelText: {
    fontSize: 22,
  },
  youOweValueText: {
    color: 'red',
  },
  theyOweValueText: {
    color: 'green',
  },
  listFilterContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
  hideSettledButtonText: {
    fontSize: 12,
    color: '#fefefe',
  },
});

const Bills = React.createClass({
  getInitialState: function getInitialState() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.email !== r2.email,
    });

    return {
      dataSource: ds.cloneWithRows(mockFriendsList),
    };
  },

  renderBillRow: function renderBillRow(bill) {
    return <BillRow bill={bill}/>;
  },

  render: function render() {
    const youOweTotal = 0; //  R.reduce((acc, friend) => acc + friend.youOwe)(0)(mockFriendsList);
    const theyOweTotal = 0; // R.reduce((acc, friend) => acc + friend.owesYou)(0)(mockFriendsList);
    const difference = 0; // theyOweTotal - youOweTotal;

    return (
      <View style={styles.container}>
        <View style={styles.summaryBox}>
          <View style={[styles.summaryInnerContainer, styles.youOweContainer]}>
            <Text style={styles.summaryLabelText}>You owe</Text>
            <Text style={[styles.valueLabelText, styles.youOweValueText]}>₹ {youOweTotal}</Text>
          </View>
          <View style={[styles.summaryInnerContainer, styles.theyOweContainer]}>
            <Text style={styles.summaryLabelText}>They owe</Text>
            <Text style={[styles.valueLabelText, styles.theyOweValueText]}>₹ {theyOweTotal}</Text>
          </View>
          <View style={[styles.summaryInnerContainer, styles.totalContainer]}>
            <Text style={styles.summaryLabelText}>Total</Text>
            <Text
              style={[styles.valueLabelText, {color: difference >= 0 ? 'green' : 'red'}]}
            >{difference === 0 ? '-' : `₹ ${difference}`}</Text>
          </View>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderBillRow}
        />
      </View>
    );
  },
});

export default Bills;
