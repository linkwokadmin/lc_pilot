import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { connect } from 'react-redux';
import { Input, TextLink, Loading,  } from './common';
import { compose } from "redux";
import _ from 'lodash';
// import { Formik } from 'formik';
import {
  fetchSingleTemplate
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
    console.log("Temp: ", this.props.template);
    this.state = {
    };
  } 

  componentDidMount() {
    this.fetchSingleTemplate(this.props.id);
    // this.setState(this.props.template)
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log("PP:",prevProps.template);
  //   console.log("PS:",prevState);
  //   console.log("TS",this.state);
  //   if (prevProps.template.id !== this.state.id) {
  //     this.setState(this.props.template);
  //   }
  // }

  static getDerivedStateFromProps(nextProps, prevState){
    console.log("NP:",nextProps.template);
    console.log("PPS:",prevState);
    if(nextProps.template.id !== prevState.id){
      return nextProps.template;
    }
    else return null;
  }

  fetchSingleTemplate = (id) => {
    this.props.actions.fetchSingleTemplate(id);
  }

  handleQuestionStatementChange = (text, idx) => {
    const newQuestion = this.state.questions.map((question, sidx) => {
      if (idx !== sidx) return question;
      return { ...question, statement: text };
    });
    this.setState({ questions: newQuestion });
  };

  handleQuestionTypeChange = (text, idx) => {
    const newquestions = this.state.questions.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, type: text };
    });
    this.setState({ questions: newquestions });
  };

  handleSubmit = evt => {
    const { name, questions } = this.state;
    alert(`Incorporated: ${name} with ${questions.length} questions`);
  };

  handleAddQuestion = () => {
    this.setState({
      questions: this.state.questions.concat([
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
          sequence: this.state.questions.length
        }
      ])
    });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      questions: this.state.questions.filter((s, sidx) => idx !== sidx)
    });
  };

  handleNameChange = name => () => {
    this.setState({name: name})
  }

  handleUpdate = (idx, updatedState) => {
    const newquestions = this.state.questions.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, ...updatedState };
    });
    this.setState({ questions: newquestions });
  }

  handleSave = () => {
    console.log(this.state);
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
            this.state.questions !== undefined ?
            this.state.questions.map((shareholder, idx) => (
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
