import React, { Component } from 'react';
import { View, Text, Dimensions, StatusBar, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { enableInclusionContact } from '../actions/AppActions';
import { AsyncStorage } from 'react-native';
import { fetchCurrentUser } from '../actions/AuthActions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const TAB_BAR_WIDTH = (100 * SCREEN_WIDTH) / 100; //90% of screen
const TAB_AND_INDICATOR_WIDTH = TAB_BAR_WIDTH / 2;
const CAMERA_WIDTH = (10 * SCREEN_WIDTH) / 100; //10% of screen

class TabBarMenu extends Component {
  constructor(props){
    super(props);
    if(this.props.currentUser === '') {
      this.props.fetchCurrentUser();
    }
    if(this.props.currentUser === null) {
      AsyncStorage.clear();
      Actions.loginScreen();
    }
    console.log(this.props)
  }

  logout() {
    AsyncStorage.clear();
    Actions.loginScreen();
  }

  render() {
    return (
      <View style={styles.statusBar}>
        <StatusBar backgroundColor="#75daad" />
        <View style={styles.statusBarTitle}>
          <View style={styles.header}>
            <Text style={styles.headerName}>SuperCoach</Text>
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
    elevation: 3,
    marginBottom: 2,
    backgroundColor: '#75daad',
  },
  tabBar: {
    width: TAB_BAR_WIDTH,
    elevation: 0,
    backgroundColor: '#75daad',

  },
  statusBarTitle: {
    marginTop: Platform.OS === 'ios' ? 50 : 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#75daad',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40
  },
  headerName: {
    color: '#fff',
    fontSize: 22,
    marginLeft: 30,
    
  }
}
);

const mapStateToProps = state => {
  return {
    email_logged_in: state.AppReducer.email_logged_in,
    currentUser: state.AuthReducer.currentUser,
  }
}

export default connect(mapStateToProps, { enableInclusionContact, fetchCurrentUser })(TabBarMenu);
