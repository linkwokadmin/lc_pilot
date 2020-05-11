import React, {Component} from 'react';
import moment from 'moment';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

import {connect} from 'react-redux';
import {fetchContacts, AddNewContact} from '../actions/AppActions';
import {fetchCurrentUser} from '../actions/AuthActions';
import {Card, Badge} from 'react-native-paper';
import {fetchUserContacts} from '../actions/AppActions';
import Status from './../services/Status';
import {database} from 'firebase';

class SelectContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      user_contacts: [],
      currentUser: null,
      color: null,
    };
  }

  componentDidMount() {
    this.props.fetchContacts();
    if (this.props.user_contacts.length == 0) {
      this.props.fetchUserContacts();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {contacts: nextProps.contacts};
  }

  readMessagesRedirect = newContact => {
    let add = true;
    this.props.user_contacts.forEach(element => {
      if (element.id == newContact.id) {
        add = false;
      }
    });
    if (add) {
      this.props.AddNewContact(newContact);
    }
    Actions.b_chat({
      title: newContact.name,
      contactId: newContact.id,
      contactName: newContact.name,
      contactEmail: newContact.email,
      currentUser: this.props.currentUser,
    });
  };

  increaseUnreadMessages = id => {
    let userLists = _.map(this.state.contacts, u => {
      if (u.id.toString() !== id.toString()) return u;
      return {...u, count: u.count + 1};
    });
    this.setState({contacts: userLists});
  };

  getColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  renderBadgeData = newContact => {
    return (
      <View style={{alignContent: 'flex-end'}}>
        <Text>{newContact.sent_at}</Text>
        <Badge
          value={newContact.count}
          status="error"
          containerStyle={{marginTop: 10}}
        />
      </View>
    );
  };

  renderBadgeBlankData = newContact => {
    return (
      <View style={{alignContent: 'flex-end'}}>
        <Text>{newContact.sent_at}</Text>
        <Badge
          value={newContact.count}
          status="error"
          containerStyle={{marginTop: 10}}
        />
      </View>
    );
  };

  render() {
    return (
      <FlatList
        keyExtractor={data => {
          data.id;
        }}
        enableEmptySections
        data={this.state.contacts}
        renderItem={data => this.renderRowNew(data)}
      />
    );
  }
  renderRowNew(contact) {
    let newContact = _.first(_.values(contact));
    if (
      newContact.email != null &&
      this.props.currentUser !== null &&
      newContact.email !== this.props.currentUser.email
    ) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 5,
            marginTop: 0,
          }}>
          <Card
            style={{width: '95%', elevation: 3, height: 80, borderRadius: 5}}>
            <Card.Content>
              <TouchableHighlight
                onPress={() => this.readMessagesRedirect(newContact)}
                style={{width: '100%', height: '100%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    source={{uri: newContact.profileImage}}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      alignContent: 'flex-start',
                      backgroundColor: this.getColor(),
                    }}
                  />
                  <View
                    style={{
                      alignContent: 'center',
                      position: 'absolute',
                      left: 55,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: 16,
                        fontStyle: 'normal',
                        fontWeightn: 'normal',
                        color: '#000000',
                      }}>
                      {newContact.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: 14,
                        fontStyle: 'normal',
                        fontWeightn: 'normal',
                        color: '#000000',
                        marginTop: 5,
                      }}>
                      {newContact.email}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            </Card.Content>
          </Card>
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    email_logged_in: state.AppReducer.email_logged_in,
    currentUser: state.AuthReducer.currentUser,
    contacts: state.ListContactsReducer.contacts,
    user_contacts: state.ListContactsReducer.user_contacts,
  };
};

export default connect(
  mapStateToProps,
  {fetchContacts, fetchCurrentUser, AddNewContact, fetchUserContacts},
)(SelectContact);
