import React, {
  View,
  Text,
  TouchableHighlight,
  ListView,
  StyleSheet,
} from 'react-native';
import {getNonFriendsList, addFriend} from '../../parse-queries';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userRow: {
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
});

const AddFriend = React.createClass({
  propTypes: {
    onDone: React.PropTypes.func.isRequired,
  },

  contextTypes: {
    currentUser: React.PropTypes.object.isRequired,
  },

  getInitialState: function getInitialState() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

    return {
      usersLoading: true,
      dataSource: ds.cloneWithRows([]),
    };
  },

  componentDidMount: function componentDidMount() {
    getNonFriendsList(this.context.currentUser.id)
      .then((nonFriends) => {
        console.log('got non friends', nonFriends);
        this.setState({
          usersLoading: false,
          dataSource: this.state.dataSource.cloneWithRows(nonFriends),
        });
      });
  },

  handleRowPress: function handleRowPress(user) {
    return () => {
      addFriend(this.context.currentUser.id, user.id)
        .then(() => console.log('added friend!'));
    };
  },

  renderRow: function renderRow(user) {
    return (
      <TouchableHighlight
        style={styles.userRow}
        underlayColor="#cccccc"
        onPress={this.handleRowPress(user)}
      >
        <Text>{user.name}</Text>
      </TouchableHighlight>
    );
  },

  render: function render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  },
});

export default AddFriend;