import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import {
  addContact,
  registerNewContact
} from '../actions/AppActions';
import { TextInput } from 'react-native-gesture-handler';
import { api_url } from './../resources/constants';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

class AddTextQuestion extends Component {
  constructor(props) {
    super();
    console.log('---render render id-------', props.templateId.id );
    this.state = {
      "statement": "",
      "type": "text",
      "weight": "1",
      "options": [],
      "value": "val"
    };
  }
  handleNameChange = statement => () => {
    this.setState({ statement: statement })
  }

  handleSave = () => {
    AsyncStorage.getItem("authorization")
      .then((token) => {
        let url = api_url + "/api/v1/questions";
        let data = { question: { ...this.state, template_id: this.props.templateId.id } };
        console.log('-------- data -----------', data);
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
        axios.post(url, data, {
          headers: headers
        }).then(response => {
          let question = response.data.data;
          console.log(response.data.data);

          //Actions.editSurvey({ title: this.props.title, id: this.props.templateId.id })
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

  handleDelete = () => {
    console.log("Deleted the question..");
  }

  render() {
    return (
      <Fragment>
        <View style={styles.container}>
          <Text style={styles.textLbl}>Question Text</Text>
          <TextInput
            multiline
            style={{
              borderColor: '#CBCAC9',
              borderWidth: 1,
              height: 50
            }}
            placeholder="Question Text"
            onChangeText={(value) => this.setState({ statement: value })}
          />
          <View style={styles.inputContainer}>
           
            {/* <Button
              title="Delete"
              style={styles.placeButtonDelete}
              onPress={() => this.handleDelete()}
              color="red"
            /> */}
          </View>
          <Button
              title="Save "
              style={styles.placeButtonAdd}
              onPress={() => this.handleSave()}
              color="#115E54"
            />
        </View>
      </Fragment>
    );
  }
}

const mapStateToProps = state => (
  {
    email_contact: state.AppReducer.email_contact,
  }
);

export default connect(
  mapStateToProps, {
  addContact,
  registerNewContact
})(AddTextQuestion);

const styles = StyleSheet.create({
  container: {
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop:40

  },
  placeButtonAdd: {
    position: 'absolute',
    bottom: 20
  },
  placeButtonDelete: {
    width: '50%',
    right: 10
  },
  textLbl: {
    color: 'green',
    marginTop: 20
  }
});
