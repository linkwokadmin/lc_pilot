import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'

import { GiftedChat } from 'react-native-gifted-chat'
import moment from 'moment'
import Chat from './Chat'
import _ from 'lodash';

// layout numbers
const SCREEN_HEIGHT = Dimensions.get('window').height
const STATUS_BAR_HEIGHT = 40  // i know, but let's pretend its cool
const CHAT_MAX_HEIGHT = SCREEN_HEIGHT - STATUS_BAR_HEIGHT

// yes, i'm 41 years old.
const NAMES = ['Girl', 'Boy', 'Horse', 'Poo', 'Face', 'Giant', 'Super', 'Butt', 'Captain', 'Lazer']
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min
const getRandomName = () => NAMES[getRandomInt(0, NAMES.length)]
const getRandomUser = () => `${ getRandomName() }${ getRandomName() }${ getRandomName() }`
const user = getRandomUser()
const isMe = (someUser) => user === someUser
const avatar = { uri: 'https://facebook.github.io/react/img/logo_og.png' }
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  hashtag: {
    top: 0
  }
});
export default class Mess extends Component {

  constructor (props) {
    super(props)
    // bind our functions to the right scope
    this.handleSend = this.handleSend.bind(this)
    this.receiveChatMessage = this.receiveChatMessage.bind(this)
    if(this.props.currentUser.id > this.props.contactId) {
      this.chatRoom = "chat:" + this.props.currentUser.id + ":" + _.first(this.props.currentUser.name.split(" ")) + ":" + this.props.contactId + ":" + _.first(this.props.contactName.split(' '))
    } else {
      this.chatRoom = "chat:" + this.props.contactId + ":" + _.first(this.props.contactName.split(' ')) + ":"  + this.props.currentUser.id + ":" + _.first(this.props.currentUser.name.split(" "));
    }
    this.chat = Chat(this.props.currentUser, this.chatRoom, this.receiveChatMessage);
    this.state = {
      messages: [],
    }
    Actions.refresh({ onRight: this.handleRight(), rightButton: this.renderRightButton() });
  }

  // fires when we receive a message
  receiveChatMessage (message) {
    const { user } = message
    if (isMe(user)) return // prevent echoing yourself (TODO: server could handle this i guess?)
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
    }))
  }

  // fires when we need to send a message
  handleSend (message) {
    this.chat.send(message.text)
  }

  renderRightButton = () => {
    return(
        <TouchableOpacity onPress={() => this.handleRight() } >
            <Icon name="check" size={26} color='grey' />
        </TouchableOpacity>
    );
  };

  handleRight = () => {
    Actions.userTemplateScene();
  }

  componentDidMount() {
    Actions.refresh({ rightButton: this.renderRightButton() });
  }
 
  onSend(messages = []) {
    this.chat.send(messages)
    
  }

  onPressPhoneNumber = () => {
    console.log("phone number pressed")
  }

  onPressHashtag = () => {
    console.log("aa gaya mai");
    Actions.showSurvey({ title: "bbbb", id: 48, currentUser: this.props.currentUser })
  }


  // draw our ui
  render () {
    return (
      <View style={{ flex: 1, paddingTop: STATUS_BAR_HEIGHT }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.props.contactId,
          }}
          parsePatterns={(linkStyle) => [
            { type: 'phone', style: linkStyle, onPress: this.onPressPhoneNumber },
            { pattern: /#(\w+)/, style: { ...linkStyle }, onPress: this.onPressHashtag },
          ]}
        />
      </View>
    )
  }
}

