import React, { Component } from 'react';
import firebase from 'firebase';
import base64 from 'base-64';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { View, Text, FlatList, Image, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import {compose} from "redux";
import { fetchUserTemplates } from '../actions/AppActions';
import DialogInput from 'react-native-dialog-input';
import axios from 'axios';
import { api_url } from '../resources/constants'
import { AsyncStorage } from 'react-native';

class UserTemplateScene extends Component {
  constructor(props) {
    super()
    this.state = { 
      dialogVisible: false,
      newTemplate: null 
    }
  }

  componentDidMount(){
    this.fetchUserTemplates();
    // console.log(this.props);
  } 

  componentDidUpdate(){
    // this.fetchUserTemplates();
  }

  fetchUserTemplates = async () => {
    this.props.actions.fetchUserTemplates();
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

  renderRow(item) {
    const survey = item.item;
    return (
      <TouchableHighlight
        onPress={ () => Actions.showSurvey({ title: survey.name, id: survey.id }) }
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
    templates: state.ListTemplatesReducer.userTemplates,
    currentUser: state.AuthReducer.currentUser
  }
}

const mapDispatchToProps = /* istanbul ignore next - redux function*/ dispatch => {
  return {
    actions: {
      fetchUserTemplates: () =>{
        return dispatch(
          fetchUserTemplates()
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
)(UserTemplateScene);
