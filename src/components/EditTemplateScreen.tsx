import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Input, TextLink, Loading,  } from './common';
import { compose } from "redux";
import _ from 'lodash';
// import { Formik } from 'formik';
import {
  fetchSingleTemplate,
  updateTemplates,
  updateQuestions
} from '../actions/AppActions';
import { TextInput } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { FloatingAction } from "react-native-floating-action";
import { Actions } from 'react-native-router-flux';
import { Card } from 'react-native-paper'

import AddTextQuestion from './AddTextQuestion';
import AddMcqQuestion from './AddMcqQuestion'
import AddReatQuestion from './AddReatQuestion'
import LinearGradient from 'react-native-linear-gradient';
import { template } from '@babel/core';

class EditTemplateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      template: undefined,
      loaded: false,
      edited: false
    };
  } 

  componentDidMount() {
    this.fetchSingleTemplate(this.props.id);
    // this.setState({template: this.props.template, loaded: true})
  }

  componentDidUpdate(prevProps, prevState) {
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(prevState.template === undefined || nextProps.template !== undefined){
      let updatedTemplate = {...nextProps.template, questions: nextProps.template.questions}
      if(prevState.template !== undefined && prevState.template.questions !== undefined && prevState.template.questions.length > nextProps.template.questions.length) {
        updatedTemplate =  {...nextProps.template, questions: prevState.template.questions}
      } 
      return {template: updatedTemplate, loaded: true, edited: true};
    }
     else {
      let updatedTemplate =  {...nextProps.template, questions: prevState.questions}
      return {template: updatedTemplate, loaded: true, edited: false};
    }
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
    // this.setState({template: updatedTemplate})
    this.props.actions.updateQuestions(updatedTemplate)
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
    // this.setState({template: updatedTemplate, edited: true})
    this.props.actions.updateQuestions(updatedTemplate)
  };

  handleRemoveShareholder = idx => () => {
    let updatedQuestion =  this.state.template.questions.filter((s, sidx) => idx !== sidx)
    let updatedTemplate =  {...this.state.template, questions: updatedQuestion}
    // this.setState({template: updatedTemplate})
    this.props.actions.updateQuestions(updatedTemplate)
  };

  handleNameChange = name => () => {
    let updatedTemplate =  {...this.state.template, name: name}
    // this.setState({template: updatedTemplate})
    this.props.actions.updateQuestions(updatedTemplate)
  }

  handleUpdate = (idx, updatedState) => {
    const newquestions = this.state.template.questions.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, ...updatedState };
    });
    let updatedTemplate =  {...this.state.template, questions: newquestions}
    // this.setState({template: updatedTemplate})
    this.props.actions.updateQuestions(updatedTemplate)
  }

  handleSave = () => {
    this.updateTemplates(this.state.template);
    Actions.mainScreen({currentUser: this.props.currentUser});
  }

  handleNavigation = (name) => {
    name === 'bt_add_text_question' ? Actions.addTextQuestion() : console.log("MCQ template is not ready yet");
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
      <View style={{ flex: 1, marginBottom: 5, marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
        <Card style={{ width: '96%', elevation: 2 }}>
          <Card.Content style={{ padding: 0, margin: 0, paddingHorizontal: 0, paddingTop: 0, paddingBottom: 0, paddingVertical: 0 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 0, margin: 0, marginTop: 20 }}>
              <TouchableOpacity 
                style={shareholder.type === "mcq" ? {...styles.selected, padding: 0, margin: 0, marginLeft: 16} : {padding: 0, margin: 0, marginLeft: 16}}
                onPress={() => this.handleQuestionTypeChange('mcq', idx)}
              >
                  <Text style={{ fontFamily: 'Roboto', fontSize: 19, fontStyle: 'normal', fontWeight: '300', color: '#D3D2D1' }}>
                    Mcq
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={shareholder.type === "text" ? {...styles.selected} : {}}
                onPress={() => this.handleQuestionTypeChange('text', idx)}
              >
                  <Text style={{ fontFamily: 'Roboto', fontSize: 19, fontStyle: 'normal', fontWeight: '300', color: '#D3D2D1' }}>Text</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={shareholder.type === "rate" ? {...styles.selected, marginRight: 16} : { marginRight: 16 }}
                onPress={() => this.handleQuestionTypeChange('rate', idx)}
              >
                  <Text style={{ fontFamily: 'Roboto', fontSize: 19, fontStyle: 'normal', fontWeight: '300', color: '#D3D2D1' }}>Rate</Text>
              </TouchableOpacity>
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
          </Card.Content>
        </Card>
      </View>
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
          <View style={{ flex: 1, marginBottom: 5, marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Card style={{ width: '96%', elevation: 2 }}>
              <Card.Content style={{ padding: 0, margin: 0, paddingHorizontal: 0, paddingTop: 0, paddingBottom: 0, paddingVertical: 0 }}>
                <View style={{ alignSelf: 'center', width: '90%', marginTop: 16 }}>
                  <TextInput
                    placeholder='Template Name'
                    placeholderTextColor='#C4C4C4'
                    returnKeyType="next"
                    style={{ borderBottomColor: '#rgba(114, 114, 114, 0.5)', borderBottomWidth: 1, marginBottom: 10 }}
                    value={this.state.template.name}
                    onChangeText={name => this.handleNameChange(name)}
                  />
                </View>
              </Card.Content>
            </Card>
          </View>
          {
            (this.state.loaded == true && this.state.template !== null && this.state.template.questions !== undefined) ?
            this.state.template.questions.map((shareholder, idx) => (
              this.renderCard(shareholder, idx)
            )) : null
          }
          <View style={{ flex: 1, marginBottom: 20, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Card style={{ height: 86, width: '96%', elevation: 2 }}>
              <Card.Content style={{ alignItems: 'center' }}>
                <TouchableHighlight
                  onPress={this.handleAddQuestion}
                >
                    <Text style={{ padding: 10, fontFamily: 'Roboto', fontSize: 18, fontStyle: 'normal', fontWeight: '300', color: '#D3D2D1' }}>+ Add New Question</Text>
                </TouchableHighlight>
              </Card.Content>
            </Card>
          </View>
          <View style={{ flex: 1, marginBottom: 20, marginTop: 0, width: '90%', justifyContent: 'center', alignSelf: 'center' }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 53 }}>
                <TouchableOpacity activeOpacity={.5}>
                    <LinearGradient colors={['#C4C4C4', '#C4C4C4']} style={{ height: 44, width: 147, borderRadius: 4 }} start={{ x: 0, y: 1 }}
                        end={{ x: 4, y: 1 }}
                        locations={[0, 0.3]}><Text style={{
                            fontSize: 18,
                            textAlign: 'center',
                            margin: 7,
                            color: '#fff',
                            backgroundColor: 'transparent'
                        }}> Cancel </Text>
                    </LinearGradient>
                </TouchableOpacity >
                <TouchableOpacity activeOpacity={.5} onPress={this.handleSave} >
                    <LinearGradient colors={['#1A7128', '#7BC035']} style={{ height: 44, width: 147, borderRadius: 4 }} start={{ x: 0, y: 1 }}
                        end={{ x: 4, y: 1 }}
                        locations={[0, 0.3]}><Text style={{
                            fontSize: 18,
                            textAlign: 'center',
                            margin: 7,
                            color: '#fff',
                            backgroundColor: 'transparent'
                        }}> Save </Text>
                    </LinearGradient>
                </TouchableOpacity >
              </View>
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, currentProps) => {
  const editedTemplate = state.ListTemplatesReducer.editedTemplate.id == currentProps.id ? state.ListTemplatesReducer.editedTemplate : {}
  return {
    email_contact: state.AppReducer.email_contact,
    add_contact_error: state.AppReducer.add_contact_error,
    add_contact_status: state.AppReducer.add_contact_status,
    template: editedTemplate
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
        
      },
      updateQuestions: (template) => {
        return dispatch(
          updateQuestions(template)
        )
      },

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
  selected: { 
    borderBottomColor: '#4BA843', 
    borderStyle: 'solid', 
    borderBottomWidth: 1 
  }
});
