import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {
  addContact,
  registerNewContact
} from '../actions/AppActions';
import { TextInput } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements'


class AddMcqQuestion extends Component {
  constructor(props) {
    super(props);
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
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.savedState === undefined) {
      return prevState
    } else if(prevState.statement === ''){
      return {
        statement: nextProps.savedState.statement,
        options: nextProps.savedState.options
      };
    } else if(prevState.statement !== nextProps.savedState.statement || prevState.options.length > nextProps.savedState.options.length){
      return {
        statement: prevState.statement,
        options: prevState.options
      };
    } else if(prevState.savedState === undefined){
      return {
        statement: nextProps.savedState.statement,
        options: nextProps.savedState.options
      };
    } else if(nextProps.savedState.id !== prevState.savedState.id) {
      return {
        statement: nextProps.savedState.statement,
        options: nextProps.savedState.options
      };
    }
    else return null;
  }


  handleNameChange = (statement) => () => {
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
    let newOptions = this.state.options.concat([{ test: '', label: '', value: '' }])
    console.log('hhhhhhhh', newOptions);
    this.setState({options: newOptions});
  };

  handleSave = () => {
    console.log("Save: ",this.state);
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
            placeholder={this.props.savedState !== undefined ? this.props.savedState.statement : `Type question here*`}
            onChangeText={(value) => this.setState({ statement: value })}
            placeholderTextColor='#C4C4C4'
            returnKeyType="next"
            style={{ borderBottomColor: '#rgba(114, 114, 114, 0.5)', borderBottomWidth: 1, marginBottom: 10 }}
          />
        </View>
        <View style={{ flex: 1, width: '90%' }}>
          <View>
            {
              this.state.options.map((option, idx) => (
                <View style={{ flex: 1, flexDirection: 'row', width: '85%', padding: 0, margin: 0, marginLeft: 16 }}>
                  <CheckBox
                      containerStyle={{ backgroundColor: '#fff', alignItems: 'flex-start', padding: 0, margin: 0 }}
                      checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      checkedColor='#4BA843'
                  />
                  <TextInput
                    multiline
                    style={{ marginLeft: 10,marginTop: -2, padding: 0, margin: 0 }}
                    placeholder='Type option here*'
                    placeholderTextColor='#C4C4C4'
                    returnKeyType="next" 
                    value={option.test}
                    onChangeText={(value) => this.handleOptionsNameChange(value, idx)}
                  />
                  
                </View>
              ))
            }
          </View>
        </View>
        <View style={{ flex: 1, width: '90%', marginTop: 18, marginBottom: 10 }}>
          <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => this.handleAddOption()}>
            <Text style={{ fontFamily: 'Roboto', fontSize: 12, fontStyle: 'normal', fontWeight: '300', color: '#D3D2D1' }}>+ Add option</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, width: '100%', marginTop: 18, marginBottom: 20, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View style={{ width: 30, borderBottomColor: '#C4C4C4', borderStyle: 'solid', borderBottomWidth: 4, marginRight: '20%' }}></View>
            <TouchableOpacity 
              style={{ alignItems: 'flex-end', marginRight: 18, padding: 0, margin: 0, marginBottom: 5 }}
              onPress={() => this.handleSave()}
            >
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
    marginTop:20,
    marginBottom:20
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
