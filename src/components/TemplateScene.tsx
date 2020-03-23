import React, { Component } from 'react';
import firebase from 'firebase';
import base64 from 'base-64';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { View, Text, FlatList, Image, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import {compose} from "redux";
import { fetchTemplates, createTemplates } from '../actions/AppActions';
import DialogInput from 'react-native-dialog-input';
import axios from 'axios';
import { api_url } from '../resources/constants'
import { AsyncStorage } from 'react-native';

class TemplateScene extends Component {
  constructor(props) {
    super()
    this.state = { 
      dialogVisible: false,
      newTemplate: null 
    }
  }

  componentDidMount(){
    this.fetchTemplates();
    // console.log(this.props);
  } 

  componentDidUpdate(){
    // this.fetchTemplates();
  }

  fetchTemplates = async () => {
    this.props.actions.fetchTemplates();
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
        onPress={ () => Actions.editSurvey({ title: survey.name, id: survey.id }) }
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
        <View>
          <TouchableOpacity activeOpacity={0.5} onPress={() => this.showDialog() } style={styles.touchableOpacityStyle} >
            <Image source={require('../images/ic_add.png')} style={styles.floatingButtonStyle} />
          </TouchableOpacity>
          <DialogInput isDialogVisible={this.state.dialogVisible}
                     title={"Template"}
                     message={"Enter name of the template"}
                     hintInput ={"hint for the input"}
                     submitInput={ (inputText) => {this.handleName(inputText)} }
                     closeDialog={ () =>this.setState({dialogVisible:false})}>
         </DialogInput>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const templates = _.map(state.ListTemplatesReducer, (value, uid) => {
    return { ...value, uid }
  });

  return {
    templates: templates
  }
}

const mapDispatchToProps = /* istanbul ignore next - redux function*/ dispatch => {
  return {
    actions: {
      fetchTemplates: () =>{
        return dispatch(
          fetchTemplates()
        );
      },
      createTemplates: (template) => {
        return dispatch(
          createTemplates(template)
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
)(TemplateScene);
