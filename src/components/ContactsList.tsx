import React, { Component } from 'react';
import firebase from 'firebase';
import base64 from 'base-64';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { View, Text, FlatList, Image, TouchableHighlight, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { fetchContacts } from '../actions/AppActions';
import { fetchCurrentUser } from '../actions/AuthActions';
import { Card,Badge } from 'react-native-elements'
import  Status from './../services/Status';

class ContactsList extends Component {

  constructor(props){
    super(props);
    this.state = {
      contacts: [],
      currentUser: null
    }
  }

  componentDidMount() {
    this.props.fetchContacts();
    
    this.setState({contacts: this.props.contacts});
    // this.setState({currentUser: this.props.currentUser})
    if(this.props.currentUser !== null && this.props.currentUser !== undefined && this.props.currentUser !== '') {
      this.statusRoom = "status:" + this.props.currentUser.id;
      this.status = Status(this.props.currentUser, this.statusRoom, this.updateContacts, this.increaseUnreadMessages);
    }
  }

  updateContacts = (contacts) => {
    this.setState({contacts: contacts})
  }

  readMessagesRedirect = (newContact) => {
    let userLists = _.map(this.state.contacts, (u) => {
      if (u.id !== newContact.id) return u;
      return { ...u, count: 0 };
    });
    this.setState({contacts: userLists})
    Actions.b_chat({ title: newContact.name, contactId: newContact.id, contactName: newContact.name, contactEmail: newContact.email, currentUser: this.props.currentUser })
  }

  increaseUnreadMessages = (id) => {
    let userLists = _.map(this.state.contacts, (u) => {
      console.log("Cond:", (u.id.toString() !== id));
      console.log("UserId:", id);
      console.log("Id:", (u.id.toString()));
      if (u.id.toString() !== id.toString()) return u;
      return { ...u, count: (u.count + 1) };
    });
    this.setState({contacts: userLists})
  }

  getColor(){   
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  renderBadgeData = (newContact) => {
    return(
      <View style={{alignContent:'flex-end'}}>
        <Text>{newContact.sent_at}</Text>
        <Badge value={newContact.count} status="error" containerStyle={{marginTop:10}} />
      </View>
    )
  }

  renderBadgeBlankData = (newContact) => {
    return(
      <View style={{alignContent:'flex-end'}}>
        <Text>{newContact.sent_at}</Text>
        <Badge value={newContact.count} status="error" containerStyle={{marginTop:10}} />
      </View>
    )
  }

  renderRow(contact) {
    let newContact = _.first(_.values(contact));
    if(newContact.email!=null && this.props.currentUser !== null && newContact.email !== this.props.currentUser.email){
      return (
        <Card containerStyle={styles.cardChat}>
          <TouchableHighlight
            onPress={() => this.readMessagesRedirect(newContact)}
          >
            <View style={{ flexDirection: 'row',flex:1,justifyContent:'space-between'}}>
              <Image source={{ uri: newContact.profileImage }} style={{ width: 50, height: 50, borderRadius: 50,alignContent:'flex-start',backgroundColor: this.getColor() }} />
              <View style={{ marginLeft: 15 , alignContent:'center', position: 'absolute', left: 50}}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{newContact.name}</Text>
                <Text style={{ fontSize: 13 ,marginTop:10}}>{newContact.email}</Text>
              </View>
              {
                (newContact.sent_at !== null) ? this.renderBadgeData(newContact) : this.renderBadgeBlankData(newContact)
              }
            </View>
          </TouchableHighlight >
        </Card>
      )
    }
  }

  render() {
    return (
      <FlatList
        keyExtractor={(data) => { data.id }}
        enableEmptySections
        data={this.state.contacts}
        renderItem={data => this.renderRow(data)}
      />
    );
  }
}

const mapStateToProps = state => {
  const contacts = _.first(_.map(state.ListContactsReducer, (value, uid) => {
    return value;
  }));

  return {
    email_logged_in: state.AppReducer.email_logged_in,
    currentUser: state.AuthReducer.currentUser,
    contacts: contacts
  }
}
const styles = StyleSheet.create({
  cardChat: {
    width: '95%',
    justifyContent:'center',
    alignSelf:'center'
   
  }
})

export default connect(mapStateToProps, { fetchContacts, fetchCurrentUser })(ContactsList);
