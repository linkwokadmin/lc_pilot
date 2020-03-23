import React, { Component } from 'react';
import { View, Text, Dimensions, StatusBar, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { enableInclusionContact } from '../actions/AppActions';
import { AsyncStorage } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const TAB_BAR_WIDTH = (100 * SCREEN_WIDTH) / 100; //90% of screen
const TAB_AND_INDICATOR_WIDTH = TAB_BAR_WIDTH / 2;
const CAMERA_WIDTH = (10 * SCREEN_WIDTH) / 100; //10% of screen

class TabBarMenu extends Component {
  logout(){
    AsyncStorage.clear();
    Actions.loginScreen();
  }


  render() {
    return (
      <View style={styles.statusBar}>
        <StatusBar backgroundColor="#75daad" />
        <View style={styles.statusBarTital}>
          <View style={{ height: 50, justifyContent: 'center', marginLeft: 20 }}>
          <Text style={{ color: 'white', fontSize: 19 }}>SuperCoach</Text>
          </View>
          <View style={{ flexDirection: 'row', marginRight: 10 }}>
            <View style={{ width: 35, justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => { Actions.addContactScreen(); this.props.enableInclusionContact(); }}>
                <Image source={require('../images/ic_magnifying_glass.png')} />
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => {
                this.logout()
              }}>
                <Image source={require('../images/logout.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignItems: 'center' }}>
            <TabBar {...this.props} style={styles.tabBar} indicatorStyle={{ width: TAB_AND_INDICATOR_WIDTH }} tabStyle={{ width: TAB_AND_INDICATOR_WIDTH }} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#75daad',
    elevation: 3,
    marginBottom: 3
  },
  tabBar: {
    width: TAB_BAR_WIDTH,
    elevation: 0,
    backgroundColor: '#75daad',

  },
  statusBarTital: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
}
);

export default connect(null, { enableInclusionContact })(TabBarMenu);
