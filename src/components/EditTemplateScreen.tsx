import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { connect } from 'react-redux';
import { Input, TextLink, Loading,  } from './common';
import { compose } from "redux";
import _ from 'lodash';
// import { Formik } from 'formik';
import {
  fetchSingleTemplate,
  updateTemplates
} from '../actions/AppActions';
import { TextInput } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { FloatingAction } from "react-native-floating-action";
import { Actions } from 'react-native-router-flux';
import { Card,AirbnbRating } from 'react-native-elements'

import AddTextQuestion from './AddTextQuestion';
import AddMcqQuestion from './AddMcqQuestion'
import AddReatQuestion from './AddReatQuestion'
import { template } from '@babel/core';

class EditTemplateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      template: {},
      loaded: false
    };
  } 

  componentDidMount() {
    this.fetchSingleTemplate(this.props.id);
    // this.setState({template: this.props.template, loaded: true})
  }

  componentDidUpdate(prevProps, prevState) {
  }

  static getDerivedStateFromProps(nextProps, prevState){
    console.log("PrevState: ", prevState);
    console.log("nextProps: ", nextProps);
    if(prevState.template === null || nextProps.template !== undefined || nextProps.template.id !== prevState.template.id || nextProps.template.questions.length != prevState.template.questions.length){
      let updatedTemplate =  {...nextProps.template, questions: nextProps.template.questions}
      return {template: updatedTemplate, loaded: true};
    }
    else return null;
  }

  fetchSingleTemplate = (id) => {
    this.props.actions.fetchSingleTemplate(id);
  }

  updateTemplates = (template) => {
    this.props.actions.updateTemplates(template);
  }

  handleQuestionStatementChange = (text, idx) => {

    const newQuestion = this.state.template.questions.map((question, sidx) => {
      if (idx !== sidx) return question;
      return { ...question, statement: text };
    });
    let updatedTemplate =  {...this.state.template, questions: newQuestion}
    this.setState({template: updatedTemplate})
  };

  handleQuestionTypeChange = (text, idx) => {
    const newquestions = this.state.template.questions.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, type: text };
    });
    let updatedTemplate =  {...this.state.template, questions: newquestions}
    this.setState({template: updatedTemplate})
  };

  handleSubmit = evt => {
    const { name, questions } = this.state;
    alert(`Incorporated: ${name} with ${questions.length} questions`);
  };

  handleAddQuestion = () => {
    let newQuestions = this.state.template.questions.concat([
      { 
        statement: "",
        type: "text",
        weight: "1",
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
        ],
        value: "val",
        sequence: this.state.template.questions.length
      }
    ]);
    let updatedTemplate =  {...this.state.template, questions: newQuestions}
    this.setState({template: updatedTemplate})
  };

  handleRemoveShareholder = idx => () => {
    let updatedQuestion =  this.state.template.questions.filter((s, sidx) => idx !== sidx)
    let updatedTemplate =  {...this.state.template, questions: updatedQuestion}
    this.setState({template: updatedTemplate})
  };

  handleNameChange = name => () => {
    let updatedTemplate =  {...this.state.template, name: name}
    this.setState({template: updatedTemplate})
  }

  handleUpdate = (idx, updatedState) => {
    const newquestions = this.state.template.questions.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, ...updatedState };
    });
    let updatedTemplate =  {...this.state.template, questions: newquestions}
    this.setState({template: updatedTemplate})
  }

  handleSave = () => {
    // console.log(this.state.template);
    this.updateTemplates(this.state.template);
    Actions.mainScreen({currentUser: this.props.currentUser});
    // this.props.createTemplates(this.state);
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
          <Button title="MCQ" color='green' onPress={() => this.handleQuestionTypeChange('mcq', idx)} />
          <Button title="Text" color='green' onPress={() => this.handleQuestionTypeChange('text', idx)} />
          <Button title="Rate" color='green' onPress={() => this.handleQuestionTypeChange('rate', idx)} />
        </View>
        <View>
          {
            shareholder.type === "mcq"
            ? 
              <AddMcqQuestion handleUpdate={this.handleUpdate} idx={idx} savedState={shareholder}/> : 
            (shareholder.type === 'rate' ? 
              <AddReatQuestion handleUpdate={this.handleUpdate} idx={idx} savedState={shareholder}/> : 
              <AddTextQuestion handleUpdate={this.handleUpdate} idx={idx} savedState={shareholder}/>
            )
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
          onChangeText={(value) => this.handleQuestionStatementChange(value, idx)}
        />
        <RNPickerSelect
            value={shareholder.type}
            onValueChange={(value) => this.handleQuestionTypeChange(value, idx)}
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
          {
            (this.state.loaded == true && this.state.template !== null && this.state.template.questions !== undefined) ?
            this.state.template.questions.map((shareholder, idx) => (
              this.renderCard(shareholder, idx)
            )) : null
          }
          <Button
            title="Add Question"
            onPress={this.handleAddQuestion}
          />
        </ScrollView>
        <Button 
          style = {styles.saveBtn}
          title="Save"
          onPress={this.handleSave} 
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    email_contact: state.AppReducer.email_contact,
    add_contact_error: state.AppReducer.add_contact_error,
    add_contact_status: state.AppReducer.add_contact_status,
    template: state.ListTemplatesReducer.editedTemplate
  }
}

const mapDispatchToProps = /* istanbul ignore next - redux function*/ dispatch => {
  return {
    actions: {
      fetchSingleTemplate: (id) => {
        return dispatch(
          fetchSingleTemplate(id)
        );
      },
      updateTemplates: (template) => {
        return dispatch(
          updateTemplates(template)
        )
      }
    }
  }
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(EditTemplateScreen);

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
