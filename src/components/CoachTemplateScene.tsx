import React, { Component } from 'react';
import firebase from 'firebase';
import base64 from 'base-64';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { View, Text, FlatList, Image, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import {compose} from "redux";
import { fetchCoachTemplates, shareTemplate } from '../actions/AppActions';
import DialogInput from 'react-native-dialog-input';
import axios from 'axios';
import { api_url } from '../resources/constants'
import { AsyncStorage } from 'react-native';

class CoachTemplateScene extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      dialogVisible: false,
      newTemplate: null 
    }
    // console.log(this.props)
  }

  componentDidMount(){
    this.fetchCoachTemplates();
    // console.log(this.props);
  } 

  componentDidUpdate(){
    // this.fetchCoachTemplates();
  }

  fetchCoachTemplates = async () => {
    this.props.actions.fetchCoachTemplates();
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
 
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };
 
  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
  };

  handleName = (name) => {
    this.setState({dialogVisible:false});
    AsyncStorage.getItem("authorization")
    .then((token) => {
      let url = api_url + "/api/v1/templates";
      let data = {
        "template": {
          name: name
        }
      }
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      axios.post(url, data, {
        headers: headers
      }).then(response => {
        let template = response.data.data;
        Actions.editSurvey({ title: template.name, id: template.id })
        // return template;
      }).catch((error) => {
        console.log(error);
        return null;
      })
    })
    .catch((err) => {
      console.log("Token Error: ", err);
      return null;
    })
  }

  sendTemplate = (item) => {
    console.log(this.props.contactId);
    this.props.actions.shareTemplate(this.props.contactId, item.id);
    Actions.b_chat({ 
      title: this.props.contactName, 
      contactId: this.props.contactId, 
      contactName:this.props.contactName, 
      contactEmail: this.props.contactEmail, 
      currentUser: this.props.currentUser,
      selectedTemplate: item
    })
  }

  renderRow(item) {
    const survey = item.item;
    return (
      <TouchableHighlight
        onPress={ () => this.sendTemplate(survey) }
      >
        <View style={{ flex: 1,  flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderColor: "#b7b7b7" }}>
          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{ survey.name }</Text>
            <Text style={{ fontSize: 13 }}>{ survey.inserted_at }</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          enableEmptySections
          data={this.props.templates}
          renderItem={data => this.renderRow(data)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    templates: state.ListTemplatesReducer.coachTemplates,
    currentUser: state.AuthReducer.currentUser
  }
}

const mapDispatchToProps = /* istanbul ignore next - redux function*/ dispatch => {
  return {
    actions: {
      fetchCoachTemplates: () =>{
        return dispatch(
          fetchCoachTemplates()
        );
      },
      shareTemplate: (userId, templateId) =>{
        return dispatch(
          shareTemplate(userId, parseInt(templateId))
        );
      }
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : '#F5F5F5'
  },
  touchableOpacityStyle:{
    position: 'absolute',
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  Header: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#F5F5F5'
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 55,
    height: 55,
  }
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(CoachTemplateScene);
