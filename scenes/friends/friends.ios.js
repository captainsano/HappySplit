import R from 'ramda';
import React, {
  View,
  Text,
  ListView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Parse from 'parse/react-native';

import NavBar from '../../components/nav-bar/nav-bar';
import FriendRow from '../../components/friend-row/friend-row';
import {getFriendsList} from '../../parse-queries';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
  addFriendButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addFriendButtonText: {
    color: '#fff',
    marginTop: 2.5,
    fontSize: 10,
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
  addBillButtonContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBillButton: {
    backgroundColor: '#00aa00',
  },
});

const Friends = React.createClass({
  propTypes: {
    onAddFriendNavigation: React.PropTypes.func.isRequired,
    onAddBillNavigation: React.PropTypes.func.isRequired,
  },

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
    getFriendsList(this.context.currentUser.id).then((friends) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(friends),
        friendsLoading: false,
      });
    });
  },

  handleAddFriend: function handleAddFriend() {
    this.props.onAddFriendNavigation();
  },

  handleAddBillButtonPress: function handleAddbillButtonPress() {
    this.props.onAddBillNavigation();
  },

  renderFriendRow: function renderFriendRow(friend) {
    return <FriendRow friend={friend}/>;
  },

  render: function render() {
    const navbar = (
      <NavBar title="Friends">
        <TouchableOpacity
          style={styles.addFriendButton}
          onPress={this.handleAddFriend}
        >
          <Icon name="plus" size={12.5} color="#fff"/>
          <Text style={styles.addFriendButtonText}>Add Friend</Text>
        </TouchableOpacity>
      </NavBar>
    );

    if (this.state.friendsLoading) {
      return (
        <View style={styles.container}>
          {navbar}
          <Text>Loading...</Text>
        </View>
      );
    }

    const youOweTotal = R.reduce((acc, friend) => acc + friend.youOwe)(0)([]);
    const theyOweTotal = R.reduce((acc, friend) => acc + friend.owesYou)(0)([]);
    const difference = theyOweTotal - youOweTotal;

    return (
      <View style={styles.container}>
        {navbar}
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
        <View style={styles.addBillButtonContainer}>
          <Icon.Button
            style={styles.addBillButton}
            color="#fff"
            name="plus"
            size={12}
            onPress={this.handleAddBillButtonPress}
          >Add bill</Icon.Button>
        </View>
      </View>
    );
  },
});

export default Friends;
