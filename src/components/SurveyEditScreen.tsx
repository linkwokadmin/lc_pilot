import React, { Component } from 'react';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { View, Text, FlatList, Image, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import {compose} from "redux";
import { fetchQuestions } from '../actions/AppActions';
import { FloatingAction } from "react-native-floating-action";
import { QuestionText } from './QuestionTypeText'
import { QuestionMcq } from './QuestionTypeMcq'

const actions = [
  {
    text: "Text",
    icon: require("./../images/ic_accessibility_white.png"),
    name: "bt_add_text_question",
    position: 2
  },
  {
    text: "MCQ",
    icon: require("./../images/ic_language_white.png"),
    name: "bt_add_mcq_question",
    position: 1
  }
];


class SurveyEditScreen extends Component {
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

    renderQuestion(questionContent) {
        let question = questionContent.item
        let q_number = (questionContent.index) + 1;
        if (question.type == "text") {
            return (
            <View style={styles.container}>
                <Text style={styles.Header}>{q_number}. {question.statement}</Text>
                <QuestionText question={question} number={q_number}></QuestionText>
            </View>
            )
        }
        if (question.type == "mcq") {
            return (
            <View style={styles.contener}>
                <Text style={styles.Header}>{q_number}. {question.statement}</Text>
                <QuestionMcq options={question.options}></QuestionMcq>
            </View>
            )
        }
    }

    handleNavigation = (name) => {
      name === 'bt_add_text_question' ? Actions.addTextQuestion({id: this.props.id}) : Actions.addMcqQuestion({id: this.props.id});
    }
   

    render() {
        return (
          <View style={styles.container}>
            <FlatList
            keyExtractor={(item) => item.id}
            enableEmptySections
            data={this.props.questions}
            renderItem={data => this.renderQuestion(data)}
            />
            <FloatingAction
              actions={actions}
              onPressItem={name => {
                this.handleNavigation(name);
              }}
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
    marginLeft: 15,
    marginTop: 10
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
  }
});


export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(SurveyEditScreen);
