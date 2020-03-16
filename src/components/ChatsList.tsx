import React, { Component } from 'react';
import firebase from 'firebase';
import base64 from 'base-64';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { View, Text, ListView, FlatList, Image, TouchableHighlight } from 'react-native';

import { connect } from 'react-redux';
import {
  fetchAllChats
 } from  '../actions/AppActions';

class ChatsList extends Component {

  componentDidMount() {
    this.props.fetchAllChats(base64.encode(this.props.email_logged_in));
  }

  // createDataSource(chatsList) {
  //   const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  //   this.dataSource = ds.cloneWithRows(chatsList)
  //   // (this.dataSource) CallScane.prototype.dataSource (example)
  // }

  renderRow(chatContent) {
    // console.log(chatContent.item);
    // let newChatContent = _.values(chatContent.item)
    let newChatContent = _.values(chatContent.item)
    // console.log(chatContent)
    // console.log(newChatContent[0]);
    return (
      <TouchableHighlight
        onPress={ () => Actions.chat({
          title: newChatContent[0].name,
          contactName: newChatContent[0].name,
          contactEmail: newChatContent[0].email
        }) }
      >
      <View style={{ flex: 1,  flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderColor: "#b7b7b7" }}>
        <Image source={{uri: newChatContent[2].profileImage }} style={{ width: 50, height: 50, borderRadius: 50 }} />
          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontSize: 23, fontWeight: 'bold' }}>{ newChatContent[0].name }</Text>
            <Text style={{ fontSize: 13 }}>{ newChatContent[0].lastMessage }</Text>
          </View>
      </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <FlatList
        enableEmptySections
      />
    );
  }
}

mapStateToProps = state => {
  return {
    email_logged_in: state.AppReducer.email_logged_in,
    chatsList: state.ListChatsReducer
  }
}

export default connect(mapStateToProps, { fetchAllChats })(ChatsList);
