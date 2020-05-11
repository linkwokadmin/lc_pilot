import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {TabBar} from 'react-native-tab-view';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {enableInclusionContact} from '../actions/AppActions';
import {AsyncStorage} from 'react-native';
import {fetchCurrentUser} from '../actions/AuthActions';
import profileScreen from '../components/profileScreen';

const SCREEN_WIDTH = Dimensions.get('window').width;
const TAB_BAR_WIDTH = (100 * SCREEN_WIDTH) / 100; //90% of screen
const TAB_AND_INDICATOR_WIDTH = TAB_BAR_WIDTH / 2;
const CAMERA_WIDTH = (10 * SCREEN_WIDTH) / 100; //10% of screen

class TabBarMenu extends Component {
  constructor(props) {
    super(props);

    if (this.props.currentUser === '') {
      this.props.fetchCurrentUser();
    }
    if (this.props.currentUser === null) {
      AsyncStorage.clear();
      Actions.loginScreen();
    }
  }

  logout() {
    AsyncStorage.clear();
    this.props.signInLoading = false;
    Actions.loginScreen();
  }

  render() {
    return (
      <View style={styles.statusBar}>
        <StatusBar backgroundColor="#75daad" />
        <View style={styles.statusBarTitle}>
          <View style={styles.header}>
            <Image source={require('../images/SuperCoachSmall.png')} />
          </View>
          <View style={{flexDirection: 'row', marginRight: 10}}>
            <View style={{justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  Actions.profileScreen();
                }}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 40 / 2,
                    borderColor: '#000',
                    borderWidth: 1,
                    shadowOpacity: 0.5,
                    shadowRadius: 5,
                  }}
                  source={{
                    uri: this.props.currentUser.profile_picture
                      ? this.props.currentUser.profile_picture
                      : 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={{alignItems: 'center'}}>
            <TabBar
              {...this.props}
              style={styles.tabBar}
              indicatorStyle={{width: TAB_AND_INDICATOR_WIDTH}}
              tabStyle={{width: TAB_AND_INDICATOR_WIDTH}}
              labelStyle={styles.label}
              indicatorStyle={styles.indicatorStyle}
            />
          </View>
        </View>
      </View>
    );
  }

  loadProfileImage(x: any) {
    if (x != null || x != undefined || x != '') {
      return x;
    }
    return 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png';
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
    backgroundColor: '#fff',
  },
  statusBarTitle: {
    marginTop: Platform.OS === 'ios' ? 50 : 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginLeft: 20,
  },
  headerName: {
    color: 'black',
    fontSize: 22,
    marginLeft: 30,
  },
  label: {
    color: 'black',
  },
  indicatorStyle: {
    backgroundColor: 'green',
  },
});

const mapStateToProps = state => {
  return {
    email_logged_in: state.AppReducer.email_logged_in,
    currentUser: state.AuthReducer.currentUser,
  };
};

export default connect(
  mapStateToProps,
  {enableInclusionContact, fetchCurrentUser},
)(TabBarMenu);
