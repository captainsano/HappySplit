import React, {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  item: {
    flex: 0.3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabelText: {
    marginTop: 2.5,
    fontSize: 12,
  },
  activeItem: {
    backgroundColor: '#000',
  },
  activeItemLabelText: {
    color: '#fff',
  },
});

const TabItem = React.createClass({
  propTypes: {
    iconName: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool.isRequired,
  },

  render: function render() {
    return (
      <TouchableHighlight
        style={[styles.item, this.props.active ? styles.activeItem : {}]}
        underlayColor={this.props.active ? '#000' : '#aaa'}
      >
        <View style={styles.itemInner}>
          <Icon name={this.props.iconName} size={20} color={this.props.active ? '#fff' : '#000'} />
          <Text style={[styles.itemLabelText, this.props.active ? styles.activeItemLabelText : {}]}>
            {this.props.label}
          </Text>
        </View>
      </TouchableHighlight>
    );
  },
});

export default TabItem;
