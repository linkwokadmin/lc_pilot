import React, { Component } from 'react';
import firebase from 'firebase';
import base64 from 'base-64';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { View, Text, ListView, FlatList, Image, TouchableHighlight, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import {
  fetchAllChats
} from '../actions/AppActions';

class ChatsList extends Component {
  componentDidMount() {
    this.props.fetchAllChats(base64.encode(this.props.email_logged_in));
  }

  // createDataSource(chatsList) {
  //   const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  //   this.dataSource = ds.cloneWithRows(chatsList)
  //   // (this.dataSource) TemplateScene.prototype.dataSource (example)
  // }

  renderRow(chatContent) {
    // console.log(chatContent.item);
    // let newChatContent = _.values(chatContent.item)
    let newChatContent = _.values(chatContent.item)
    // console.log(chatContent)
    // console.log(newChatContent[0]);
    return (
      <TouchableHighlight
        onPress={() => Actions.chat({
          title: newChatContent[0].name,
          contactName: newChatContent[0].name,
          contactEmail: newChatContent[0].email
        })}
      >
        <View style={styles.chatCard}>
          <Image source={{ uri: newChatContent[2].profileImage }} style={styles.chatImage} />
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.chatTital}>{newChatContent[0].name}</Text>
            <Text style={styles.chatSubtital}>{newChatContent[0].lastMessage}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
  render() {
    let loadData = this.props.chatsList;
    if (loadData[0] == null) {
      return (
        <View>
          <Text style={styles.DataMessage}>Surry,Data is not available to Show...</Text>
        </View>
      )
    } else {
      return (
        <FlatList
          keyExtractor={(data) => { data.id }}
          enableEmptySections
          data={loadData}
          renderItem={(data) => this.renderRow(data)}
        />
      );
    }
  }
}

mapStateToProps = state => {
  return {
    email_logged_in: state.AppReducer.email_logged_in,
    chatsList: state.ListChatsReducer
  }
}
const styles = StyleSheet.create({
  chatCard: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#b7b7b7"
  },
  chatTital: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  chatSubtital: {
    fontSize: 13
  },
  chatImage: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  DataMessage: {
    fontSize: 24,
    marginTop: 50
  }
});


export default connect(mapStateToProps, { fetchAllChats })(ChatsList);
