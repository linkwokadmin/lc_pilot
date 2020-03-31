import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, FlatList, StyleSheet, ScrollView, Button, AsyncStorage } from 'react-native';

import { connect } from 'react-redux';
import { compose } from "redux";
import { fetchQuestions, saveFeedbacks, fetchResponses } from '../actions/AppActions';
import { QuestionText } from './QuestionTypeText'
import { QuestionMcq } from './QuestionTypeMcq'
import { Card } from 'react-native-elements'

class SurveyShowScreen extends Component {
  constructor(props) {
    super()
    this.state = { mcq: {}, feedbacks: [] }
  }

  componentDidMount() {
    this.fetchResponses(this.props.id);
    this.fetchQuestions(this.props.id);
    console.log()
    if (this.props.filled) {
      this.setState({ 'feedbacks': this.props.feedbacks });
    } else {
      this.setState({ 'feedbacks': this.props.questions });
    }
  }

  fetchQuestions = (template_id) => {
    this.props.actions.fetchQuestions(template_id);
  }

  fetchResponses = (template_id) => {
    this.props.actions.fetchResponses(template_id);
  }

  onTextChange = (question, text) => {
    let questionFeedback = { ...question, value: text }
    let newFeedbacks = this.state.feedbacks.map((feedback, idx) => {
      if (feedback.id !== question.id) return feedback;
      return questionFeedback;
    });
    this.setState({ 'feedbacks': newFeedbacks })
  }

  onMcqChange = (question, item) => {
    let val = (val !== undefined ? val : "") + "" + item.label;
    let questionFeedback = { ...question, value: val }
    let newFeedbacks = this.state.feedbacks.map((feedback, idx) => {
      if (feedback.id !== question.id) return feedback;
      return questionFeedback;
    });
    this.setState({ 'feedbacks': newFeedbacks })
  }

  renderQuestion(questionContent) {
    let question = questionContent.item
    let q_number = (questionContent.index) + 1;
    if (question.type == "text") {
      return (
        <Card>
          <View style={styles.container}>
            <Text style={styles.Header}>{q_number}. {question.statement}</Text>
            <QuestionText question={question} number={q_number} filled={this.props.filled} onChange={this.onTextChange}></QuestionText>
          </View>
        </Card>
      )
    }
    if (question.type == "mcq") {
      return (
        <Card>
          <View style={styles.container}>
            <Text style={styles.Header}>{q_number}. {question.statement}</Text>
            <QuestionMcq question={question} options={question.options} onChange={this.onMcqChange}></QuestionMcq>
          </View>
        </Card>
      )
    }
  }

  handleSave = () => {
    this.props.actions.saveFeedbacks(this.props.id, this.state.feedbacks);
  }



  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.form}>
          <FlatList
            keyExtractor={(item) => item.id}
            enableEmptySections
            data={(this.props.filled ? this.props.feedbacks : this.props.questions)}
            renderItem={data => this.renderQuestion(data)}
          />
        </ScrollView>
        {
          this.props.filled ?
            null :
            <Button
              style={styles.saveBtn}
              title="Save"
              color="#115E54"
              onPress={() => this.handleSave()}
            />
        }
      </View>
    );
  }
}

const mapStateToProps = state => {
  const questions = _.map(state.ListQuestionsReducer, (value, uid) => {
    return { ...value, uid }
  });
  const feedbacks = _.map(state.ListFeedbacksReducer, (value, uid) => {
    return { ...value, uid }
  });

  return {
    questions: questions,
    feedbacks: feedbacks,
    filled: (feedbacks.length > 0 ? true : false)
  }
}

const mapDispatchToProps = /* istanbul ignore next - redux function*/ dispatch => {
  return {
    actions: {
      fetchQuestions: (template_id) => {
        return dispatch(
          fetchQuestions(template_id)
        );
      },
      fetchResponses: (template_id) => {
        return dispatch(
          fetchResponses(template_id)
        );
      },
      saveFeedbacks: (template_id, feedbacks) => {
        return dispatch(
          saveFeedbacks(template_id, feedbacks)
        )
      }
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
