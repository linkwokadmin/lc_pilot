import React, { Component } from 'react';
import firebase from 'firebase';
import base64 from 'base-64';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { View, Text, FlatList, Image, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { fetchContacts } from  '../actions/AppActions';

class CallScane extends Component {

  componentDidMount() {
    this.props.fetchContacts(base64.encode(this.props.email_logged_in));
    // this.createDataSource(this.props.contacts);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.createDataSource(nextProps.contacts);
  // }

  createDataSource(contacts) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.dataSource = ds.cloneWithRows(contacts)
    // (this.dataSource) CallScane.prototype.dataSource (example)
  }

  renderRow(contact) {
    return (
      <TouchableHighlight
        onPress={ () => Actions.chat({ title: contact.name, contactName: contact.name, contactEmail: contact.email }) }
      >
      <View style={{ flex: 1,  flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderColor: "#b7b7b7" }}>
        <Image source={{uri: contact.profileImage }} style={{ width: 50, height: 50, borderRadius: 50 }} />
          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontSize: 23, fontWeight: 'bold' }}>{ contact.name }</Text>
            <Text style={{ fontSize: 13 }}>{ contact.email }</Text>
          </View>
      </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          enableEmptySections
          data={this.dataSource}
          renderItem={data => this.renderRow(data)}
        />
        <View>
          <TouchableOpacity activeOpacity={0.5} onPress={() => Actions.addTemplate() } style={styles.touchableOpacityStyle} >
            <Image source={require('../images/ic_chats_contacts.png')} style={styles.floatingButtonStyle} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

mapStateToProps = state => {
  const contacts = _.map(state.ListContactsReducer, (value, uid) => {
    return { ...value, uid }
  });

  return {
    email_logged_in: state.AppReducer.email_logged_in,
    contacts: contacts
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : '#F5F5F5'
  },
  touchableOpacityStyle:{
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
  }
});

export default connect(mapStateToProps, { fetchContacts })(CallScane);
