import React, {
  View,
  StyleSheet,
} from 'react-native';

import SceneNames from '../../scene-names';
import TabItem from '../tab-item/tab-item';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 48,
    backgroundColor: '#ccc',
  },
});

const TabBar = React.createClass({
  propTypes: {
    navigator: React.PropTypes.object.isRequired,
  },

  render: function render() {
    const [currentRoute] = this.props.navigator.getCurrentRoutes();

    return (
      <View style={styles.container}>
        <TabItem
          active={currentRoute && currentRoute.name === SceneNames.FRIENDS_SCENE}
          iconName="user"
          label="Friends"
        />
        <TabItem
          active={currentRoute && currentRoute.name === SceneNames.BILLS_SCENE}
          iconName="rupee"
          label="Bills"
        />
        <TabItem
          active={currentRoute && currentRoute.name === SceneNames.SETTINGS_SCENE}
          iconName="cog"
          label="Settings"
        />
      </View>
    );
  },
});

export default TabBar;
