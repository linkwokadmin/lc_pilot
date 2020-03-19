import { Socket } from 'phoenix-channels';
import { api_url } from './../resources/constants'

const TIMEOUT = 10000
const URL = api_url + 'socket';
const LOBBY = 'rooms:lobby'

const CHATROOM='chat:13:Sunny:1:SS'

export default (user, onChat) => {
  // construct a socket
  const socket = new Socket(URL, {params: {token: "lirtFGyHgjhwfj3k8b7zYP2mt5GHimThd453bcRQIhU=", user_id: "13", user_name: "Sunny"}})

  // configure the event handlers
  socket.onOpen(event => console.log('Connected.'))
  socket.onError(event => console.log('Cannot connect.'))
  socket.onClose(event => console.log('Goodbye.'))

  // open a connection to the server
  socket.connect({token: "lirtFGyHgjhwfj3k8b7zYP2mt5GHimThd453bcRQIhU=", user_id: "13", user_name: "Sunny"})

  // configure a channel into a room - https://www.youtube.com/watch?v=vWFX4ylV_ko
  // const chan = socket.channel(LOBBY, { user })
  const chan = socket.channel(CHATROOM, { user })

  // join the channel and listen for admittance
  chan.join()
    .receive('ignore', () => console.log('Access denied.'))
    .receive('ok', (messages) => console.log('Access granted.', messages))
    .receive('timeout', () => console.log('Must be a MongoDB.'))

  // add some channel-level event handlers
  chan.onError(event => console.log('Channel blew up.'))
  chan.onClose(event => console.log('Channel closed.'))

  chan.on('init:msg', (msg) => {
    console.log("kkkkkkk", msg);
    onChat(msg.messages)
  })
  // when we receive a new chat message, just trigger the appropriate callback
  chan.on('new:msg', msg => onChat && onChat(msg))

  // you can can listen to multiple types
  chan.on('user:entered', msg => console.log('say hello to ', msg))

  // a function to shut it all down
  const close = () => socket.disconnect()

  // a function to send a message
  const send = (message) => {

    chan.push('new:msg', {body: message[0], user}, TIMEOUT)
      .receive('ok', (msg) => console.log('sent'))
      .receive('error', (reasons) => console.log('flop', reasons))
      .receive('timeout', () => console.log('slow much?'))
  }

  // reveal a couple ways to drive this bus
  return { close, send }
}