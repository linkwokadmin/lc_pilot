import React, { Component } from 'react';
import firebase from 'firebase';
import base64 from 'base-64';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { View, Text, FlatList, Image, TouchableHighlight } from 'react-native';

import { connect } from 'react-redux';
import { fetchContacts } from '../actions/AppActions';

class ContactsList extends Component {

  componentDidMount() {
    this.props.fetchContacts(base64.encode(this.props.email_logged_in));
    // this.createDataSource(this.props.contacts);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.createDataSource(nextProps.contacts);
  // }

  createDataSource(contacts) {
    // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    // this.dataSource = ds.cloneWithRows(contacts)
    // (this.dataSource) CallScane.prototype.dataSource (example)
  }

  renderRow(contact) {
    let newContact = _.first(_.values(contact.item));
    console.log("------------------------------------------------------");
    console.log(contact);
    console.log(newContact);
    console.log(newContact.name);
    console.log(newContact.email);
    console.log(newContact.profileImage);

    console.log("------------------------------------------------------");
    return (
      <TouchableHighlight
        onPress={() => Actions.chat({ title: newContact.name, contactName: newContact.name, contactEmail: newContact.email })}
      >
        <View style={{ flex: 1, flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderColor: "#b7b7b7" }}>
          <Image source={{ uri: newContact.profileImage }} style={{ width: 50, height: 50, borderRadius: 50 }} />
          <View style={{ marginLeft: 15 }}>
<<<<<<< Updated upstream
            <Text style={{ fontSize: 23, fontWeight: 'bold' }}>{ newContact.name }</Text>
            <Text style={{ fontSize: 13 }}>{ newContact.email }</Text>
=======
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{newContact.name}</Text>
            <Text style={{ fontSize: 13 }}>{newContact.email}</Text>
>>>>>>> Stashed changes
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
<<<<<<< Updated upstream
      <Text>MIt </Text>
     /*  <FlatList
        enableEmptySections
        data={this.props.contacts}
        renderItem={data => this.renderRow(data)}
    /> */
  );
}
=======
      <FlatList
        keyExtractor={(data) => { data.id }}
        enableEmptySections
        data={this.props.contacts}
        renderItem={data => this.renderRow(data)}
      />
    );
  }
>>>>>>> Stashed changes
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

export default connect(mapStateToProps, { fetchContacts })(ContactsList);
