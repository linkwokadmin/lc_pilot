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
import { CheckBox } from 'react-native-elements'


class AddMcqQuestion extends Component {
  constructor(props) {
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
        },
        {
          "test": "",
          "label": "",
          "value": ""
        }
      ]
    };
  }

  componentDidMount(){
    this.setState(this.props.savedState)
  }

  handleNameChange = (statement) => () => {
    console.log("statement : ", statement);
    this.setState({ statement: statement })
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
    console.log(this.state);
    this.props.handleUpdate(this.props.idx, this.state);
  }

  handleDelete = () => {
    console.log("Deleted the question..");
  }
 render() {
    return (
      <Fragment>
        <View>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
            <Text style={styles.textLbl}>Question Text</Text>
           </View>
          <TextInput
            style={{marginTop:20,width:'100%',height:50, borderBottomWidth: 1,
            borderColor: '#ddd'}}
            placeholder={`Enter question statement`}
            label="text"
            value={this.state.statement}
            onChangeText={(value) => this.setState({ statement: value })}
          />
          {this.state.options.map((option, idx) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.placeInput}
                placeholder={`Enter Opction Text `}
                label="text"
                value={option.test}
                onChangeText={(value) => this.handleOptionsNameChange(value, idx)}
              />
              <Button
                title=" X "
                style={styles.placeButton}
                onPress={this.handleRemoveOptions(idx)}
                color="red"
              />
            </View>
          ))}
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.textLbl}>Add Options</Text>
          <Button
            title=" + "
            style={styles.placeButtonAdd}
            onPress={() => this.handleAddOption()}
            color="blue"
          />
        </View>
        <Button
          style={styles.saveBtn}
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
    justifyContent: 'space-between'
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    top: 1,
    marginTop:20
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
    width: '70%',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    height: 50
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
