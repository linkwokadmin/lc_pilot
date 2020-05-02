import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, ScrollView, TouchableHighlight } from 'react-native';

import { connect } from 'react-redux';
import { compose } from "redux";
import { fetchQuestions, saveFeedbacks, fetchResponses } from '../actions/AppActions';
import { QuestionText } from './QuestionTypeText'
import { QuestionMcq } from './QuestionTypeMcq'
import { QuestionRate } from './QuestionTypeRate'
// import { Card } from 'react-native-elements'
import { Card } from 'react-native-paper'
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

class SurveyShowScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { mcq: {}, feedbacks: [] }
  }

  componentDidMount() {
    // this.fetchResponses(this.props.id);
    this.fetchQuestions(this.props.id);
    // if (this.props.filled) {
    //   this.setState({ 'feedbacks': this.props.feedbacks });
    // } else {
      // this.setState({ 'feedbacks': this.props.questions });
    // }
    setTimeout(()=> 
      Actions.refresh({ rightButton: this.renderRightButton() }),
    0.5);
  }

  renderRightButton = () => {
    return (
      <View style={{ marginRight: 10 }} >
        <TouchableOpacity onPress={() => Actions.editSurvey({currentUser: this.props.currentUser, id: this.props.id})} >
            <Text>Edit</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

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
    console.log("NEW: ",newFeedbacks);
    this.setState({ 'feedbacks': newFeedbacks })
  }

  onMcqChange = (question, item) => {
    console.log(item);
    let val = (val !== undefined ? val : "") + "" + item.label;
    let questionFeedback = { ...question, value: val }
    let newFeedbacks = this.state.feedbacks.map((feedback, idx) => {
      if (feedback.id !== question.id) return feedback;
      return questionFeedback;
    });
    this.setState({ 'feedbacks': newFeedbacks })
  }

  onRateChange = (question, text) => {
    let questionFeedback = { ...question, value: text.toString(), rating: parseInt(text) }
    let newFeedbacks = this.state.feedbacks.map((feedback, idx) => {
      if (feedback.id !== question.id) return feedback;
      return questionFeedback;
    });
    console.log("NEW: ",newFeedbacks);
    this.setState({ 'feedbacks': newFeedbacks })
  }

  renderQuestion(questionContent) {
    let question = questionContent.item
    let q_number = (questionContent.index) + 1;
    return (
      <View style={{ flex: 1, marginBottom: 5, marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
        <Card style={{ width: '94%', elevation: 2 }}>
          <Card.Content style={{ padding: 0, margin: 0, paddingHorizontal: 0, paddingTop: 0, paddingBottom: 0, paddingVertical: 0 }}>
              <Text style={{ fontFamily: 'Roboto', fontSize: 16, fontStyle: 'normal', fontWeight: '300', color: '#000000', marginTop: 12, marginLeft: 16 }}> 
                {question.statement}
              </Text>
              {
                question.type == "text" ?
                  <View style={{ width: '94%', alignSelf: 'center',marginBottom: 20 }}>
                    <Card style={{ height: 80, elevation: 1, marginTop: 5, borderRadius: 5 }}>
                      <Card.Content style={{ padding: 0, margin: 0, paddingHorizontal: 0, paddingTop: 0, paddingBottom: 0, paddingVertical: 0 }}>
                        <QuestionText question={question} number={q_number} filled={this.props.filled} onChange={this.onTextChange}></QuestionText>
                      </Card.Content>
                    </Card>
                  </View> : 
                (question.type == "mcq" ? 
                  <View style={{ width: '80%', alignSelf: 'flex-start', marginLeft: 16, marginTop: 22, marginBottom: 20 }}>
                    <QuestionMcq question={question} options={question.options} onChange={this.onMcqChange}></QuestionMcq>
                  </View>
                :
                  <View style={{ width: '80%', alignSelf: 'center', marginTop: 22, marginBottom: 20 }}>
                    <QuestionRate question={question} number={q_number} filled={this.props.filled} onChange={this.onRateChange}></QuestionRate>
                  </View>
                )
              }
              
          </Card.Content>
        </Card>
      </View>
    )
  }

  handleSave = () => {
    this.props.actions.saveFeedbacks(this.props.id, this.state.feedbacks)
    // .then((d) => {
    //   console.log(d);
    //   Actions.back();
    // })
    Actions.mainScreen();
  }

  getColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{ flex: 1, marginBottom: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Card style={{ height: 86, width: '94%', elevation: 2, borderRadius: 5 }}>
              <Card.Content style={{ padding: 0, margin: 0, paddingHorizontal: 0, paddingTop: 0, paddingBottom: 0, paddingVertical: 0 }}>
                  <TouchableHighlight >
                      <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between' }}>
                          <View style={{ height: 86, width: 86, backgroundColor: this.props.color, alignItems: 'flex-start' }}></View>
                          <View style={{ alignContent: 'center', left: 10 }}>
                              <Text style={{ fontFamily: 'Roboto', fontSize: 18, fontStyle: 'normal', fontWeightn: 'normal', color: '#000000', marginTop: 10 }}>
                                {this.props.title}
                              </Text>
                              <Text style={{ fontFamily: 'Roboto', fontSize: 14, fontStyle: 'normal', fontWeightn: 'normal', color: '#D3D2D1', marginTop: 5 }}>
                                Created on {moment(this.props.createdAt).format('Do MMMM, YYYY')}
                              </Text>
                            </View>

                          <View style={{ height: 86, width: 70, backgroundColor: this.props.color, alignItems: 'flex-end' }}>
                              <TouchableOpacity 
                                activeOpacity={.5} 
                                style={{ height: 86, width: 70 }} 
                                onPress={() => Actions.editSurvey({currentUser: this.props.currentUser, id: this.props.id})}
                              >
                                  <LinearGradient colors={['#466A43', '#44D237']} style={{ height: 86, width: 70 }} start={{ x: 0, y: 2 }}
                                      end={{ x: 4, y: 1 }}
                                      locations={[0, 0.3]}><Text style={{
                                          fontSize: 18,
                                          textAlign: 'center',
                                          alignItems: 'center',
                                          color: '#fff',
                                          marginTop: 32,
                                          backgroundColor: 'transparent'
                                      }}> 
                                        Edit 
                                      </Text>
                                  </LinearGradient>
                              </TouchableOpacity >

                          </View>

                      </View>
                  </TouchableHighlight>
              </Card.Content>
          </Card>

        </View>
          <FlatList
            enableEmptySections
            data={this.props.questions}
            renderItem={data => this.renderQuestion(data)}
          />
       
        {/*
          this.props.filled ?
            null :
            <Button
              style={styles.saveBtn}
              title="Save"
              color="#115E54"
              onPress={() => this.handleSave()}
            />
        */}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, currentProps) => {
  console.log(state.ListQuestionsReducer.coach_questions[currentProps.id.toString()])
  console.log(currentProps.id)
  const questions = state.ListQuestionsReducer.coach_questions[currentProps.id.toString()];
  const feedbacks = _.map(state.ListFeedbacksReducer, (value, uid) => {
    return { ...value, uid }
  });

  return {
    questions: questions,
    feedbacks: feedbacks,
    filled: false
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
    // flex: 1,
    // flexDirection: 'column',
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