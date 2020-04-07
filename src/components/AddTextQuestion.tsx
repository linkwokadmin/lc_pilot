import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Image, Button, Alert, TouchableOpacity } from 'react-native';
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
        <View style={{ alignSelf: 'center', width: '90%', marginTop: 16 }}>
          <TextInput
              placeholder={this.props.savedState !== undefined ? this.props.savedState.statement : `Type your question here*`}
              onChangeText={(value) => this.setState({ statement: value })}
              placeholderTextColor='#C4C4C4'
              returnKeyType="next"
              style={{ borderBottomColor: '#rgba(114, 114, 114, 0.5)', borderBottomWidth: 1, marginBottom: 10 }}
          />
          <Text style={{ fontFamily: 'Roboto', fontSize: 12, fontStyle: 'normal', fontWeight: '300', color: '#D3D2D1' }}>Text box will appear under question.</Text>
        </View>
        <View style={{ flex: 1, width: '100%', marginTop: 18, marginBottom: 20, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View style={{ width: 30, borderBottomColor: '#C4C4C4', borderStyle: 'solid', borderBottomWidth: 4, marginRight: '20%' }}></View>
            <TouchableOpacity 
              style={{ alignItems: 'flex-end', marginRight: 18, padding: 0, margin: 0, marginBottom: 5 }}
              onPress={() => this.handleSave()}
            >
                {/* <Image source={require('../images/outline_save_black_18dp.png' )} style={{padding:0,margin:0}} /> */}
                <Text style={{ fontFamily: 'Roboto', fontSize: 18, fontStyle: 'normal', fontWeight: '300', color: '#D3D2D1', margin: 0, padding: 0 }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'flex-end', marginRight: 18 }}>
                <Image source={require('../images/remove.png')} />
            </TouchableOpacity>
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
    marginTop:20
  },
  saveBtn: {
    position: 'absolute',
    bottom: 20,
  }
});
