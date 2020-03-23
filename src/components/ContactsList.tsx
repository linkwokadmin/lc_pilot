import React, { Component } from 'react';
import firebase from 'firebase';
import base64 from 'base-64';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { View, Text, FlatList, Image, TouchableHighlight } from 'react-native';

import { connect } from 'react-redux';
import { fetchContacts } from '../actions/AppActions';
import { fetchCurrentUser } from '../actions/AuthActions';

class ContactsList extends Component {

  componentDidMount() {
    this.props.fetchContacts(base64.encode(this.props.email_logged_in));
    // this.props.fetchCurrentUser();
  }

  renderRow(contact) {
    let newContact = _.first(_.values(contact));
    // console.log(this.props);
    return (
      <TouchableHighlight
        onPress={() => Actions.b_chat({ title: newContact.name, contactId: newContact.id, contactName: newContact.name, contactEmail: newContact.email, currentUser: this.props.currentUser })}
      >
        <View style={{ flex: 1, flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderColor: "#b7b7b7" }}>
          <Image source={{ uri: newContact.profileImage }} style={{ width: 50, height: 50, borderRadius: 50 }} />
          <View style={{ marginLeft: 15 }}>

            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{newContact.name}</Text>
            <Text style={{ fontSize: 13 }}>{newContact.email}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <FlatList
        keyExtractor={(data) => { data.id }}
        enableEmptySections
        data={this.props.contacts[0]}
        renderItem={data => this.renderRow(data)}
      />
    );
  }
}

const mapStateToProps = state => {
  const contacts = _.map(state.ListContactsReducer, (value, uid) => {
    return value;
  });

  return {
    email_logged_in: state.AppReducer.email_logged_in,
    currentUser: state.AuthReducer.currentUser,
    contacts: contacts
  }
}

export default connect(mapStateToProps, { fetchContacts, fetchCurrentUser })(ContactsList);
