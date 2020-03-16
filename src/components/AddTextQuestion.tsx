import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { connect } from 'react-redux';
import { Input  } from './common';
import {
  addContact,
  registerNewContact
} from '../actions/AppActions';
import { TextInput } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { FloatingAction } from "react-native-floating-action";

class AddTextQuestion extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
  }

  handleNameChange = name => () => {
    this.setState({name: name})
  }

  handleSave = () => {
    console.log(this.state);
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
                placeholder={`Enter question statement`}
                label="text"
                value={this.state.name}
                onChangeText={(value) => this.handleNameChange(value)}
              />
              <View style = { styles.inputContainer }>
                <Button 
                  title = "Add " 
                  style = { styles.placeButtonAdd }
                  onPress = { this.handleSave() }
                  color = "blue"
                />
                <Button 
                  title = "Delete" 
                  style = { styles.placeButtonDelete }
                  onPress = { this.handleDelete() }
                  color = "red"
                />
              </View>
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
  placeButtonAdd: {
    width: '50%',
    left: 10
  },
  placeButtonDelete: {
    width: '50%',
    right: 10
  },
  textLbl: {
      color: 'green'
  }
});
