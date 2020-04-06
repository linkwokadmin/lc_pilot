import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, FlatList, StyleSheet, ScrollView, Button, AsyncStorage, TouchableOpacity, Image } from 'react-native';

import { connect } from 'react-redux';
import { compose } from "redux";
import { fetchQuestions, saveFeedbacks, fetchResponses } from '../actions/AppActions';
import { QuestionText } from './QuestionTypeText'
import { QuestionMcq } from './QuestionTypeMcq';
import { QuestionRate } from './QuestionTypeRate'
import { Card } from 'react-native-elements'
import { Accordion } from 'react-native-paper/lib/typescript/src/components/List/List';
import { Actions } from 'react-native-router-flux';

class SurveyShowScreen extends Component {
  constructor(props) {
    super()
    this.state = { mcq: {}, feedbacks: [] }
    console.log('constructor')
  }

  componentWillMount() {
    console.log('componentWillMount')
  }

  componentDidMount() {
    this.fetchResponses(this.props.id);
    this.fetchQuestions(this.props.id);
    console.log('componentDidMount')
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
  onRateChange = (question, item) => {
    console.log(question, '---------', item);

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
    if (question.type == "rate") {
      console.log('********** IN RATE **************',question);
      

      return (
        <Card>
          <View style={styles.container}>
            <Text style={styles.Header}>{q_number}. {question.statement}</Text>
            <QuestionRate question={question} options={question.options} onChange={this.onRateChange}></QuestionRate>
          </View>
        </Card>
      )
    }
  }

  handleSave = () => {
    this.props.actions.saveFeedbacks(this.props.id, this.state.feedbacks);
  }

  render() {
    console.log('render');


    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.id}
          enableEmptySections
          data={(this.props.filled ? this.props.feedbacks : this.props.questions)}
          renderItem={data => this.renderQuestion(data)}
        />

        <TouchableOpacity activeOpacity={0.5} style={styles.touchableOpacityStyle} onPress={() => {
          Actions.editSurvey({ id: this.props.id })
        }} >
          <Image source={require('../images/edit_black_18dp.png')} style={styles.floatingButtonStyle} />
        </TouchableOpacity>

        {/* {
          this.props.filled ?
            null :
            <Button
              style={styles.saveBtn}
              title="Save"
              color="#115E54"
              onPress={() => this.handleSave()}
            />
        } */}
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
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 30,
    height: 30,

  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,

  },
});


export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(SurveyShowScreen);
