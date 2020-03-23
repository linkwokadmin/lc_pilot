import React, { Component } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import TabBarMenu from './TabBarMenu';
import ChatScene from './ChatScene';
import StatusScane from './StatusScane';
import TemplateScene from './TemplateScene';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class MainScreen extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'second', title: 'CHATS' },
      { key: 'third', title: 'TEMPLATE' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });
  _renderHeader = props => <TabBarMenu {...props} />;

  _renderScene = SceneMap({
    second: StatusScane,
    third: TemplateScene,
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
