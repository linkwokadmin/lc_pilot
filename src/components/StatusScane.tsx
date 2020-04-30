import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';

import UserContactsList from './UserContactsList';
import {Actions} from 'react-native-router-flux';

export default props => (
  <View style={styles.container}>
    <UserContactsList />
    <View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => Actions.selectContact()}
        style={styles.touchableOpacityStyle}>
        <Image
          source={require('../images/ic_chats_contacts.png')}
          style={styles.floatingButtonStyle}
        />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 55,
    height: 55,
  },
});
