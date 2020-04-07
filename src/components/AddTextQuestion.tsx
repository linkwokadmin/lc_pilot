import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, ScrollView, Button,Alert } from 'react-native';
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

class AddTextQuestion extends Component{
  constructor(props) {
    super(props);
    this.state = {
      "statement": "",
      "type": "text",
      "weight": "1",
      "options": [],
      "value": "val"
    };
  }
 
  componentDidMount(){
  }

  static getDerivedStateFromProps(nextProps, prevState){
    console.log(nextProps);
    console.log(prevState);
    if(nextProps.savedState === undefined) {
      return prevState
    } else if(prevState.statement !== nextProps.savedState.statement) {
      return {statement: prevState.statement};
    } else if(prevState.savedState === undefined){
      return {statement: nextProps.savedState.statement};
    } else if(nextProps.savedState.id !== prevState.savedState.id) {
      return {statement: nextProps.savedState.statement};
    }
    else return null;
  }

  handleNameChange = statement => () => {
    this.setState({ statement: statement })
  }

  handleSave = () => {
    console.log(this.state);
    this.props.handleUpdate(this.props.idx, this.state);
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
              height:50 }}
            placeholder={this.props.savedState !== undefined ? this.props.savedState.statement : `Enter your question statement`}
            onChangeText={(value) => this.setState({ statement: value })}
          />
             <Button
                  style={styles.saveBtn}
                  title="Save"
                  color="#115E54"
                  onPress={() => this.handleSave()}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
   
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
    color: 'green',
    marginTop:20
  },
  saveBtn: {
    position: 'absolute',
    bottom: 20,
  }
});
