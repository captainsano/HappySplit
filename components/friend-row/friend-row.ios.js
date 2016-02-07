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
  innerContainer: {
    flex: 1,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  amountContainer: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  bottomBorderView: {
    height: 1,
    marginBottom: 0,
    backgroundColor: '#000',
  },
});

const FriendRow = React.createClass({
  propTypes: {
    friend: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      email: React.PropTypes.string.isRequired,
      owesYou: React.PropTypes.number.isRequired,
      youOwe: React.PropTypes.number.isRequired,
    }),
  },
  render: function render() {
    const moneyBalance = ((owesYou, youOwe) => {
      if (owesYou > youOwe) {
        return <Text style={{color: 'green'}}>₹ {(owesYou - youOwe).toFixed(2)}</Text>;
      } else if (owesYou < youOwe) {
        return <Text style={{color: 'red'}}>₹ {(youOwe - owesYou).toFixed(2)}</Text>;
      }

      return <Text style={{color: 'green'}}>Settled</Text>;
    })(this.props.friend.owesYou, this.props.friend.youOwe);

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.nameContainer}>
            <Text>{this.props.friend.name}</Text>
          </View>
          <View style={styles.amountContainer}>
            {moneyBalance}
          </View>
        </View>
        <View style={styles.bottomBorderView} />
      </View>
    );
  },
});

export default FriendRow;