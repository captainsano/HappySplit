import R from 'ramda';
import React, {
  View,
  Text,
  ListView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import mockFriendsList from './mock-friends-list';
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
  hideSettledButtonText: {
    fontSize: 12,
    color: '#fefefe',
  },
});

const Friends = React.createClass({
  getInitialState: function getInitialState() {
    const hideSettledFriends = false;
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.email !== r2.email,
    });

    return {
      hideSettledFriends,
      dataSource: ds.cloneWithRows(
        hideSettledFriends ? R.reject((f) => f.owesYou === f.youOwe)(mockFriendsList) : mockFriendsList
      ),
    };
  },

  handleHideSettledFriendsPress: function handleHideSettledFriendsPress() {
    const hideSettledFriends = !this.state.hideSettledFriends;
    this.setState({
      hideSettledFriends,
      dataSource: this.state.dataSource.cloneWithRows(
        hideSettledFriends ? R.reject((f) => f.owesYou === f.youOwe)(mockFriendsList) : mockFriendsList
      ),
    });
  },

  renderFriendRow: function renderFriendRow(friend) {
    return <FriendRow friend={friend}/>;
  },

  render: function render() {
    const youOweTotal = R.reduce((acc, friend) => acc + friend.youOwe)(0)(mockFriendsList);
    const theyOweTotal = R.reduce((acc, friend) => acc + friend.owesYou)(0)(mockFriendsList);
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
        <View style={styles.listFilterContainer}>
          <Icon.Button
            name={this.state.hideSettledFriends ? 'check-square-o' : 'square-o'}
            style={{height: 24}}
            size={15}
            backgroundColor="#000"
            onPress={this.handleHideSettledFriendsPress}
          >
            <Text style={styles.hideSettledButtonText}>Hide settled friends</Text>
          </Icon.Button>
        </View>
      </View>
    );
  },
});

export default Friends;
