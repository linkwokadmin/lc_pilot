import React, { Component } from 'react';
import firebase from 'firebase';
import base64 from 'base-64';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { View, Text, FlatList, Image, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { fetchQuestions } from '../actions/AppActions';
import DialogInput from 'react-native-dialog-input';

const templateList = [
  {
    "id": 1,
    "name": "T1",
    "created_on": "11 Mar. 2020"
  },
  {
    "id": 2,
    "name": "T2",
    "created_on": "12 Mar. 2020"
  }
]


class CallScane extends Component {
  constructor(props) {
    super()
    this.state = { 
      dialogVisible: false,
      templateList: templateList,
      newTemplate: null 
    }
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
    this.setState({newTemaplte: name});
    console.log("Calling name create");
    this.setState({dialogVisible:false})
    Actions.editSurvey({ title: name })
  }

  renderRow(item) {
    const survey = item.item;
    console.log(survey);
    return (
      <TouchableHighlight
        onPress={ () => Actions.showSurvey({ title: survey.name }) }
      >
        <View style={{ flex: 1,  flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderColor: "#b7b7b7" }}>
          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{ survey.name }</Text>
            <Text style={{ fontSize: 13 }}>{ survey.created_on }</Text>
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
          data={this.state.templateList}
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

mapStateToProps = state => {
  const contacts = _.map(state.ListContactsReducer, (value, uid) => {
    return { ...value, uid }
  });

  return {
    email_logged_in: state.AppReducer.email_logged_in,
    contacts: contacts
  }
}

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
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 55,
    height: 55,
  }
});

export default connect(mapStateToProps, { fetchQuestions })(CallScane);
