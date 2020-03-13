import React, { Component } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import TabBarMenu from './TabBarMenu';
import ChatScene from './ChatScene';
import StatusScane from './StatusScane';
import CallScane from './CallScane';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class MainScreen extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'CHATS' },
      { key: 'second', title: 'STATUS' },
      { key: 'third', title: 'Questions' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });
  _renderHeader = props => <TabBarMenu {...props} />;

  _renderScene = SceneMap({
    first: ChatScene,
    second: StatusScane,
    third: CallScane,
  });

  render() {
    return (
        <TabView
          style={styles.container}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
