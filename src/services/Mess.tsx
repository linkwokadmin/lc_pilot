import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity, Platform, Image, Button } from 'react-native';
import { Icon } from 'react-native-elements'
import emojiUtils from 'emoji-utils'

import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat'
import moment from 'moment'
import Chat from './Chat'
import _ from 'lodash';
import SlackMessage from './../components/SlackMessage';
import Color from './../components/Color'

// layout numbers
const SCREEN_HEIGHT = Dimensions.get('window').height
const STATUS_BAR_HEIGHT = 40  // i know, but let's pretend its cool
const CHAT_MAX_HEIGHT = SCREEN_HEIGHT - STATUS_BAR_HEIGHT

// yes, i'm 41 years old.
const NAMES = ['Girl', 'Boy', 'Horse', 'Poo', 'Face', 'Giant', 'Super', 'Butt', 'Captain', 'Lazer']
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min
const getRandomName = () => NAMES[getRandomInt(0, NAMES.length)]
const getRandomUser = () => `${getRandomName()}${getRandomName()}${getRandomName()}`
const user = getRandomUser()
const isMe = (someUser) => user === someUser
const avatar = { uri: 'https://facebook.github.io/react/img/logo_og.png' }
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  hashtag: {
    top: 50,
    color: 'black'
  },
  text: {
    color: Color.defaultBlue,
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: Color.backgroundTransparent,
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
});
export default class Mess extends Component {

  constructor(props) {
    super(props)
    // bind our functions to the right scope
    this.handleSend = this.handleSend.bind(this);
    this.receiveChatMessage = this.receiveChatMessage.bind(this);
    if (this.props.currentUser.id > this.props.contactId) {
      this.chatRoom = "chat:" + this.props.currentUser.id + ":" + _.first(this.props.currentUser.name.split(" ")) + ":" + this.props.contactId + ":" + _.first(this.props.contactName.split(""))
    } else {
      this.chatRoom = "chat:" + this.props.contactId + ":" + _.first(this.props.contactName.split(' ')) + ":" + this.props.currentUser.id + ":" + _.first(this.props.currentUser.name.split(" "));
    }
    this.chat = Chat(this.props.currentUser, this.chatRoom, this.receiveChatMessage);
    this.state = {
      messages: [],
    }
    console.log(this.props)
    if (this.props.selectedTemplate !== undefined) {
      let template = this.props.selectedTemplate;
      let msgs = [{
        _id: "kkk",
        createdAt: new Date(),
        text: "#" + template.id + ":" + template.name,
        user: {
          _id: this.props.contactId,
          currentUser: this.props.currentUser,
          opponent: {
            id: this.props.contactId,
            name: this.props.contactName,
            email: this.props.contactEmail
          }
        }
      }];
      this.onSend(msgs)
    }

    // Actions.refresh({ onRight: this.handleRight(), rightButton: this.renderRightButton() });
  }

  // fires when we receive a message
  receiveChatMessage(message) {
    const { user } = message
    if (isMe(user)) return // prevent echoing yourself (TODO: server could handle this i guess?)
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
    }))
  }

  // fires when we need to send a message
  handleSend(message) {
    this.chat.send(message.text)
  }

  renderRightButton = () => {
    return (
      <TouchableOpacity onPress={() => this.handleRight()} >
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
    console.log("Msg: ", messages);
    this.chat.send(messages)

  }

  onPressPhoneNumber = () => {
    console.log("phone number pressed")
  }

  onPressHashtag = () => {
    console.log("aa gaya mai");
    Actions.showSurvey({ title: "bbbb", id: 48, currentUser: this.props.currentUser })
  }

  renderMessage(props) {
    const {
      currentMessage: { text: currText },
    } = props
    let messageTextStyle
    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        lineHeight: Platform.OS === 'android' ? 34 : 30,
      }
    }
    return <SlackMessage {...props} messageTextStyle={messageTextStyle} />
  }

  renderBubble(props) {
    console.log("Props: ", props);
    let isTemplate = props.currentMessage.text.includes('#')
    let templateId = props.currentMessage.text.split(':')[0].replace('#', '');
    let templateName = props.currentMessage.text.split(':')[1]
    const customView = () => {
      return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button
            title="Gooooooooooooooo"
            onPress={() => Actions.showSurvey({ title: "bbbb", id: 48, currentUser: this.props.currentUser })}
          />
        </View>
      )
    }
    return (
      isTemplate ?
        <Bubble
          {...props}
          textStyle={{
            right: {
              color: 'black',
              textAlign: 'center'
            },
            left: {
              color: 'black',
              textAlign: 'center'
            },
          }}
          wrapperStyle={{
            right: {
              backgroundColor: '#75d',
              width: 350,
              height: 70
            },
            left: {
              backgroundColor: '#75d',
              width: 350,
              height: 70
            }
          }}
          renderMessageText={null}
          currentMessage={{
            id: props.currentMessage.id,
            text: "Template \n" + props.currentMessage.text.split(':')[0] + "\n" + props.currentMessage.text.split(':')[1],
            image: ''
          }}
          optionTitles={["Templates", "44"]}
          renderCustomView={1 == 1 ? null : customView}
          onLongPress={() => { Actions.showSurvey({ title: templateName, id: templateId, currentUser: props.user.currentUser }) }}
        />
        :
        <Bubble
          {...props}
          textStyle={{
            right: {
              color: 'black',
            },
          }}
          wrapperStyle={{
            right: {
              backgroundColor: '#75daad',
            }
          }}
        />
    );
  }

  renderSend(props) {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Button
          title="Seed"
          onPress={() => Actions.coachTemplateScene({ currentUser: props.user.currentUser, contactId: props.user.opponent.id, contactEmail: props.user.opponent.email, contactName: props.user.opponent.name })}
        />
        <Send
          {...props}
        >
          <View style={{ marginRight: 0, alignItems: 'flex-end' }}>
            <Image style={{ width: 40, height: 40 }} source={require('./../images/send.png')} resizeMode={'center'} />
          </View>
        </Send>
      </View>
    );
  }

  // draw our ui
  render() {
    return (
      <View style={{ flex: 1, paddingTop: STATUS_BAR_HEIGHT, flexDirection: 'row' }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.props.contactId,
            currentUser: this.props.currentUser,
            opponent: {
              id: this.props.contactId ? this.props.contactId:null,
              name: this.props.contactName ? this.props.contactName:null,
              email: this.props.contactEmail? this.props.contactEmail:null
            }
          }}
          alwaysShowSend={true}
          renderSend={this.renderSend}
          renderBubble={this.renderBubble}
        />
      </View>
    )
  }
}

