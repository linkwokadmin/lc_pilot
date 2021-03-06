import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  addContact,
  registerNewContact
} from '../actions/AppActions';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { api_url } from './../resources/constants';

class AddMcqQuestion extends Component {
  constructor() {
    super();
    this.state = {
        statement: "",
        type: "mcq",
        weight: "1",
        value: "default",
        options: [
            {
                "test": "",
                "label": "",
                "value": ""
            }
        ]
    };
  }

  handleNameChange = (statement) => () => {
    console.log("statement : ", statement);
    this.setState({statement: statement})
  }

  handleOptionsNameChange = (text, idx) => {
    const newOptions = this.state.options.map((option, sidx) => {
      if (idx !== sidx) return option;
      return { ...option, test: text, label: text, value: "" };
    });

    this.setState({ options: newOptions });
  };

  handleRemoveOptions = idx => () => {
    this.setState({
      options: this.state.options.filter((s, sidx) => idx !== sidx)
    });
  };

  handleAddOption = () => {
    this.setState({
      options: this.state.options.concat([{ text: "" }])
    });
  };

  handleSave = () => {
    console.log('Calling Save..', this.state);
    AsyncStorage.getItem("authorization")
    .then((token) => {
      let url = api_url + "/api/v1/questions";
      let data = {question: {...this.state, template_id: this.props.id}};
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      axios.post(url, data, {
        headers: headers
      }).then(response => {
        let question = response.data.data;
        console.log(question);
        Actions.editSurvey({ title: this.props.title, id: this.props.id })
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
                <View style = { styles.titleContainer }>
                <Text style={styles.textLbl}>Question Text</Text>
                <Button 
                    title = "Delete" 
                    style = { styles.placeButtonDelete }
                    onPress = { () => this.handleDelete() }
                    color = "red"
                    />
                </View>
                <TextInput
                    placeholder={`Enter question statement`}
                    label="text"
                    onChangeText={(value) => this.setState({statement: value})}
                />
                <View style = { styles.titleContainer }>
                    <Text style={styles.textLbl}>Options</Text>
                    <Button 
                        title = " + " 
                        style = { styles.placeButtonAdd }
                        onPress = { () => this.handleAddOption() }
                        color = "blue"
                    />
                </View>
                {this.state.options.map((option, idx) => (
                    <View style = { styles.inputContainer }>
                        <TextInput
                            style = { styles.placeInput }
                            placeholder={`Statement`}
                            label="text"
                            value={option.test}
                            onChangeText={(value) => this.handleOptionsNameChange(value, idx)}
                        />
                        <Button 
                            title = " X " 
                            style = { styles.placeButton }
                            onPress = { this.handleRemoveOptions(idx) }
                            color = "red"
                        />
                    </View>
                ))}
            </View>
            <Button 
                style = {styles.saveBtn}
                title="Save"
                color="#115E54"
                onPress={() => this.handleSave()} 
            />
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
  })(AddMcqQuestion);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    top: 70
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    top: 1
  },
  placeButtonAdd: {
    width: '50%',
    left: 10
  },
  placeButtonDelete: {
    width: '50%',
    right: 10
  },
  placeInput: {
    width: '70%'
  },
  placeInputLbl: {
    width: '70%',
    color: 'green'
  },
  placeButton: {
    width: '30%',
    backgroundColor: 'red',
    color: "white"
  },
  textLbl: {
      color: 'green'
  },
  saveBtn: {
    position: 'absolute',
    bottom: 20
  }
});
