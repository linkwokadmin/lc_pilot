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

class ContactsList extends Component {

  componentDidMount() {
    this.props.fetchContacts(base64.encode(this.props.email_logged_in));
    // this.props.fetchCurrentUser();
  }
  getColor(){
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  renderRow(contact) {
    let newContact = _.first(_.values(contact));
    console.log('----------',newContact.email);
    if(newContact.email!=null){
      return (
        <Card containerStyle={styles.cardChat}>
         
          <TouchableHighlight
            onPress={() => Actions.b_chat({ title: newContact.name, contactId: newContact.id, contactName: newContact.name, contactEmail: newContact.email, currentUser: this.props.currentUser })}
          >
            <View style={{ flexDirection: 'row',flex:1,justifyContent:'space-between'}}>
              <Image source={{ uri: newContact.profileImage }} style={{ width: 50, height: 50, borderRadius: 50,alignContent:'flex-start',backgroundColor: this.getColor() }} />
              <View style={{ marginLeft: 15 , alignContent:'center'}}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{newContact.name}</Text>
                <Text style={{ fontSize: 13 ,marginTop:10}}>{newContact.email}</Text>
              </View>
              <View style={{alignContent:'flex-end'}}>
                  <Text>09:00 Am</Text>
                  <Badge value="99+" status="error" containerStyle={{marginTop:10}} />

              </View>
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
const styles = StyleSheet.create({
  cardChat: {
    width: '95%',
    justifyContent:'center',
    alignSelf:'center'
   
  }
})

export default connect(mapStateToProps, { fetchContacts, fetchCurrentUser })(ContactsList);
