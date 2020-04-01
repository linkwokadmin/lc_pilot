import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { connect } from 'react-redux';
import { Input, TextLink, Loading,  } from './common';
// import { Formik } from 'formik';
import {
  addContact,
  registerNewContact
} from '../actions/AppActions';
import { TextInput } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { FloatingAction } from "react-native-floating-action";
import { Actions } from 'react-native-router-flux';
import { Card,AirbnbRating } from 'react-native-elements'

import AddTextQuestion from './AddTextQuestion';
import AddMcqQuestion from './AddMcqQuestion'
import AddReatQuestion from './AddReatQuestion'

class AddTemplateScreen extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      shareholders: [
        { 
          name: "",
          type: "Text",
          options: [
            {
              label: "A",
              text: "",
              value: ""
            }
          ] 
        }
      ]
    };
  } 

  handleShareholderNameChange = (text, idx) => {
    console.log(text);
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: text };
    });

    this.setState({ shareholders: newShareholders });
  };

  handleShareholderTypeChange = (text, idx) => {
    console.log(text);
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, type: text };
    });

    this.setState({ shareholders: newShareholders });
  };

  handleSubmit = evt => {
    const { name, shareholders } = this.state;
    alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
  };

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: "" }])
    });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  };

  handleNameChange = name => () => {
    this.setState({name: name})
  }

  handleSave = () => {
    console.log(this.state);
  }

  handleNavigation = (name) => {
    name === 'bt_add_text_question' ? Actions.addTextQuestion() : console.log("MCQ template is not ready yet");
  }

  renderQuestionType = (question_type) => {
    
  }

  rendrUI(l) {
    if (l.textType) {
      return (<AddTextQuestion />);
    }
    if (l.mcqType) {
      return (<AddMcqQuestion/>);
    }
    if (l.rateType) {
      return (<AddReatQuestion/>);
    }
  }
 
  renderCard(shareholder, idx) {
    return(
      <Card>
        <View style={styles.questionType}>
          <Button title="MCQ" color='green' onPress={() => this.handleShareholderTypeChange('MCQ', idx)} />
          <Button title="Text" color='green' onPress={() => this.handleShareholderTypeChange('Text', idx)} />
          <Button title="Rate" color='green' onPress={() => this.handleShareholderTypeChange('Rate', idx)} />
        </View>
        <View>
          {
            shareholder.type === "MCQ"
            ? <AddMcqQuestion/> : (shareholder.type === 'Text' ? <AddTextQuestion /> : <AddReatQuestion/>)
          }
        </View>
      </Card>
    );
  }

  renderQ = (shareholder, idx) => {
    return(
      <View style={styles.questionSection}>
        <View style = { styles.inputContainer }>
          <Text style = { styles.placeInput }>{`Questions #${idx + 1}`}</Text>
          <Button 
            title = " X " 
            style = { styles.placeButton }
            onPress = { this.handleRemoveShareholder(idx) }
            color = "red"
          />
        </View>
        <TextInput
          placeholder={`Statement`}
          label="text"
          value={shareholder.name}
          onChangeText={(value) => this.handleShareholderNameChange(value, idx)}
        />
        <RNPickerSelect
            value={shareholder.type}
            onValueChange={(value) => this.handleShareholderTypeChange(value, idx)}
            items={[
                { label: 'Text', value: 'Text' },
                { label: 'Multiple Choice', value: 'mcq' },
            ]}
        />
        {
          shareholder.type === "mcq" ?
          <Text>One more level</Text>
          :
          null
        }
      </View>
    )
  }

  render() {
    return (
      <Fragment>
        <ScrollView style={styles.form}>
          <Card>
            <Input
              placeholder="Form 1"
              label="Name"
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
            />
          </Card>
          {this.state.shareholders.map((shareholder, idx) => (
            this.renderCard(shareholder, idx)
          ))}
          <Button
            title="Add Question"
            onPress={this.handleAddShareholder}
          />
           
        </ScrollView>
        <Button 
          style = {styles.saveBtn}
          title="Save"
          onPress={this.handleSave()} 
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => (
  {
    email_contact: state.AppReducer.email_contact,
    add_contact_error: state.AppReducer.add_contact_error,
    add_contact_status: state.AppReducer.add_contact_status
  }
);

export default connect(
  mapStateToProps, {
    addContact,
    registerNewContact
  })(AddTemplateScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  formGroup: {
    flex: 1,
    justifyContent: 'center'
  },
  btnSeed: {
    flex: 1,
  },
  form: {
    width: '100%',
    borderTopWidth: 1,
  },
  section: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  questionSection: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  placeInput: {
    width: '70%'
  },
  placeButton: {
    width: '30%',
    backgroundColor: 'red',
    color: "white"
  },
  saveBtn: {
    position: 'absolute',
    bottom: 0
  },
  questionType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
