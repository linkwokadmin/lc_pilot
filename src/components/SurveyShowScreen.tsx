import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, FlatList, StyleSheet, ScrollView, Button } from 'react-native';

import { connect } from 'react-redux';
import {compose} from "redux";
import { fetchQuestions } from '../actions/AppActions';
import { QuestionText } from './QuestionTypeText'
import { QuestionMcq } from './QuestionTypeMcq'

class SurveyShowScreen extends Component {
    constructor(props) {
        super()
        this.state = { }
    }

    componentDidMount(){
      this.fetchQuestions(this.props.id);
    } 

    fetchQuestions = (template_id) => {
      this.props.actions.fetchQuestions(template_id);
    }

    onTextChange = (question, text) => {
      console.log(question);
      console.log(text);
      let questionFeedback = {...question, value: text}
      console.log(questionFeedback);
    }

    onMcqChange = (question, item) => {
      let val = val + "," + item.label;
      // const update = {}
      // this.setState({"mcq": update})
      console.log(val);
      let questionFeedback = {...question, value: val}
      console.log(questionFeedback);
    }

    renderQuestion(questionContent) {
        let question = questionContent.item
        let q_number = (questionContent.index) + 1;
        if (question.type == "text") {
            return (
            <View style={styles.container}>
                <Text style={styles.Header}>{q_number}. {question.statement}</Text>
                <QuestionText question={question} number={q_number} onChange={this.onTextChange}></QuestionText>
            </View>
            )
        }
        if (question.type == "mcq") {
            return (
            <View style={styles.contener}>
                <Text style={styles.Header}>{q_number}. {question.statement}</Text>
                <QuestionMcq question={question} options={question.options} onChange={this.onMcqChange}></QuestionMcq>
            </View>
            )
        }
    }

    handleSave = () => {
      console.log('Calling Save..', this.state);
      console.log('Calling Save..', this.props.questions);
    }



    render() {
        return (
          <View style={styles.container}>
            <ScrollView style={styles.form}>
              <FlatList
              keyExtractor={(item) => item.id}
              enableEmptySections
              data={this.props.questions}
              renderItem={data => this.renderQuestion(data)}
              />
            </ScrollView>
            <Button 
                style = {styles.saveBtn}
                title="Save"
                color="#115E54"
                onPress={() => this.handleSave()} 
            />
          </View>
        );
    }
}

const mapStateToProps = state => {
    const questions = _.map(state.ListQuestionsReducer, (value, uid) => {
      return { ...value, uid }
    });
  
    return {
      questions: questions
    }
}

const mapDispatchToProps = /* istanbul ignore next - redux function*/ dispatch => {
  return {
    actions: {
      fetchQuestions: (template_id) =>{
        return dispatch(
          fetchQuestions(template_id)
        );
      },
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  Header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    borderColor: '#777', borderWidth: 1,
    padding: 10,
    flex: 1,
    width: '80%',
    margin: 15,
  },
  form: {
    width: '100%',
    padding: 10,
    marginBottom: 5
  },
  saveBtn: {
    position: 'absolute',
    bottom: 20
  }
});


export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(SurveyShowScreen);
