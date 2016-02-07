import React, {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  ListView,
  StyleSheet,
} from 'react-native';
import R from 'ramda';
import Icon from 'react-native-vector-icons/FontAwesome';
import {addBill, getFriendsList} from '../../parse-queries';

import NavBar from '../../components/nav-bar/nav-bar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    alignItems: 'center',
  },
  formInnerContainer: {
    marginTop: 10,
    width: 280,
  },
  textInput: {
    height: 40,
    fontSize: 18,
    marginBottom: 10,
  },
  tagScrollView: {
    height: 28,
  },
  tagFriendButton: {
    marginRight: 5,
  },
  placeholder: {
    color: '#aaa',
  },
  tagViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tagViewInnerContainer: {
    width: 250,
    height: 250,
    marginTop: 25,
    backgroundColor: '#fefefe',
    borderWidth: 5,
    borderColor: '#000',
    borderRadius: 15,
  },
  tagViewCloseButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  tagListRow: {
    padding: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tagListRowText: {
    fontSize: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  friendToken: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#000',
    borderRadius: 15,
    alignItems: 'center',
  },
  friendTokenText: {
    fontSize: 12,
    color: '#fefefe',
  },
  removeTokenButton: {
    marginLeft: 5,
  },
  buttonsContainer: {
    width: 280,
    marginTop: 10,
    flexDirection: 'row',
  },
  button: {
    margin: 10,
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    height: 44,
    backgroundColor: '#cccccc',
  },
  submitButton: {
    height: 44,
    backgroundColor: '#000',
  },
  buttonText: {
    fontSize: 18,
    color: '#fefefe',
  },
});

const FriendTag = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    onRemove: React.PropTypes.func.isRequired,
  },

  render: function render() {
    return (
      <View style={styles.friendToken}>
        <Text style={styles.friendTokenText}>{this.props.name}</Text>
        <TouchableOpacity
          style={styles.removeTokenButton}
          onPress={this.props.onRemove}
        >
          <Icon color="#ffffff" name="times" size={12.5}/>
        </TouchableOpacity>
      </View>
    );
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
      friends: [],
      friendsLoading: true,
      description: '',
      amount: '',
      sharedByFriends: [],
      showTagView: false,
      tagListDataSource: ds.cloneWithRows([]),
    };
  },

  componentDidMount: function componentDidMount() {
    getFriendsList(this.context.currentUser.id)
      .then((friends) => {
        this.setState({
          friends,
          friendsLoading: false,
          tagListDataSource: this.state.tagListDataSource.cloneWithRows(friends),
        });
      });
  },

  handleTextFieldChange: function handleTextFieldChange(targetStateField) {
    return (text) => {
      this.setState(R.assoc(targetStateField, text, {}));
    };
  },

  toggleTagView: function toggleTagView() {
    this.setState({
      showTagView: !this.state.showTagView,
    });
  },

  handleTagListRowPress: function handleTagListRowPress(user) {
    return () => {
      const newSharedByFriends = R.append(user, this.state.sharedByFriends);
      this.setState({
        showTagView: false,
        sharedByFriends: newSharedByFriends,
        tagListDataSource: this.state.tagListDataSource.cloneWithRows(
          R.differenceWith((a, b) => a.id === b.id)(this.state.friends)(newSharedByFriends)
        ),
      });
    };
  },

  handleTagRemove: function handleTagRemove(user) {
    return () => {
      const newSharedByFriends = R.reject((u) => u.id === user.id, this.state.sharedByFriends);
      this.setState({
        sharedByFriends: newSharedByFriends,
        tagListDataSource: this.state.tagListDataSource.cloneWithRows(
          R.differenceWith((a, b) => a.id === b.id)(this.state.friends)(newSharedByFriends)
        ),
      });
    };
  },

  handleAddButtonPress: function handleAddButtonPress() {
    addBill(
      this.context.currentUser.id,
      R.map(R.prop('id'))(this.state.sharedByFriends),
      parseFloat(this.state.amount),
      this.state.description
    )
    .then(() => this.props.onDone());
  },

  renderTagListRow: function renderTagListRow(user) {
    return (
      <TouchableHighlight
        style={styles.tagListRow}
        underlayColor="#cccccc"
        onPress={this.handleTagListRowPress(user)}
      >
        <Text style={styles.tagListRowText}>{user.name}</Text>
      </TouchableHighlight>
    );
  },

  render: function render() {
    // TODO: Say no friends to add
    const tagView = (
      <View style={styles.tagViewContainer}>
        <View style={styles.tagViewInnerContainer}>
          <NavBar title="Tag a friend">
            <TouchableOpacity
              style={styles.tagViewCloseButton}
              onPress={this.toggleTagView}
            >
              <Icon name="times" size={15} color="#fff"/>
            </TouchableOpacity>
          </NavBar>
          <ListView
            dataSource={this.state.tagListDataSource}
            renderRow={this.renderTagListRow}
          />
        </View>
      </View>
    );

    return (
      <View style={styles.container}>
        <NavBar title="Add Bill"/>
        <View style={styles.formContainer}>
          <View style={styles.formInnerContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Description"
              autoFocus
              onChangeText={this.handleTextFieldChange('description')}
              value={this.state.description}
            />
            <TextInput
              style={styles.textInput}
              placeholder="₹ Amount"
              autoCorrect={false}
              onChangeText={this.handleTextFieldChange('amount')}
              value={this.state.amount}
            />
            <View style={styles.tagsContainer}>
              <TouchableOpacity
                style={styles.tagFriendButton}
                onPress={this.toggleTagView}
              >
                <Icon name="plus" size={15} color="#000"/>
              </TouchableOpacity>
              <ScrollView
                style={styles.tagScrollView}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {this.state.sharedByFriends.length === 0 ? <Text style={styles.placeholder}>Tag friends</Text> : null}
                {R.map((f) => (
                  <FriendTag
                    key={f.id} name={f.name}
                    onRemove={this.handleTagRemove(f)}
                  />
                ))(this.state.sharedByFriends)}
              </ScrollView>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableHighlight
                style={[styles.button, styles.cancelButton]}
                underlayColor="#000"
                onPress={() => this.props.onDone()}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.button, styles.submitButton]}
                underlayColor="#000"
                onPress={this.handleAddButtonPress}
              >
                <Text style={styles.buttonText}>Add</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        {this.state.showTagView ? tagView : null}
      </View>
    );
  },
});

export default AddFriend;
