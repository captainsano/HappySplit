import R from 'ramda';
import React, {
  View,
  Text,
  ListView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Parse from 'parse/react-native';

import FriendRow from '../../components/friend-row/friend-row';

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
});

const Friends = React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object.isRequired,
  },

  getInitialState: function getInitialState() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.email !== r2.email,
    });

    return {
      friendsLoading: true,
      dataSource: ds.cloneWithRows([]),
    };
  },

  componentDidMount: function componentDidMount() {
    const Friend = Parse.Object.extend('Friend');
    const query = new Parse.Query(Friend);
    query.equalTo('left', this.context.currentUser.id);
    query.equalTo('right', this.context.currentUser.id);
    query.find({
      success: (results) => {
        console.log('users: ', results);
      },
      error: (error) => {
        // TODO: Handle Error
        console.log(error);
      },
    });
  },

  renderFriendRow: function renderFriendRow(friend) {
    return <FriendRow friend={friend}/>;
  },

  render: function render() {
    const youOweTotal = R.reduce((acc, friend) => acc + friend.youOwe)(0)([]);
    const theyOweTotal = R.reduce((acc, friend) => acc + friend.owesYou)(0)([]);
    const difference = theyOweTotal - youOweTotal;

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
          renderRow={this.renderFriendRow}
        />
      </View>
    );
  },
});

export default Friends;
