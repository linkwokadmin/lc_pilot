import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat'
import moment from 'moment'
import Chat from './Chat'

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

export default class Mess extends Component {

  constructor (props) {
    super(props)
    // bind our functions to the right scope
    this.handleSend = this.handleSend.bind(this)
    this.receiveChatMessage = this.receiveChatMessage.bind(this)
    // let's chat!
    this.chat = Chat(user, this.receiveChatMessage);
    // console.log("-----------")
    this.state = {
      messages: [],
    }
  }

  // fires when we receive a message
  receiveChatMessage (message) {
    const { user } = message
    if (isMe(user)) return // prevent echoing yourself (TODO: server could handle this i guess?)
    // this.refs.giftedMessenger.appendMessage({
    //   text: message.body,
    //   name: message.user,
    //   image: avatar,
    //   position: 'left',
    //   date: moment()
    // })

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
    }))
  }

  // fires when we need to send a message
  handleSend (message) {
    this.chat.send(message.text)
  }

  componentDidMount() {
    // this.setState({
    //   messages: [
    //     {
    //       _id: 1,
    //       text: 'Hello developer',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //       },
    //     },
    //   ],
    // })
  }
 
  onSend(messages = []) {
    this.chat.send(messages)
    
  }

  // draw our ui
  render () {
    return (
      <View style={{ flex: 1, paddingTop: STATUS_BAR_HEIGHT }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    )
  }
}

