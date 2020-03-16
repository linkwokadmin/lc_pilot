import React, { Component } from 'react';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { View, Text, FlatList, Image, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { fetchQuestions } from '../actions/AppActions';
import { FloatingAction } from "react-native-floating-action";
import { QuestionText } from './QuestionTypeText'
import { QuestionMcq } from './QuestionTypeMcq'

const qlist =
{
  "template": "Temp 1",
  "Questions": [
    {
      "id": 1,
      "statement": "is This status Q1",
      "type": "text",
      "w": "1",
      "options": [],
      "value": "value test"
    },
    {
      "id": 2,
      "statement": "is This status Q3",
      "type": "mcq",
      "w": "1",
      "options": [
        {
          "lable": "this is statment 1",
          "test": "1",
          "value": "12"
        },
        {
          "lable": "this is statment 2",
          "test": "2",
          "value": "122"
        },
        {
          "lable": "this is statment 3",
          "test": "3",
          "value": "1245"
        }
      ],
      "value": "value test"
    },
    {
      "id": 3,
      "statement": "is This status",
      "type": "mcq",
      "w": "1",
      "options": [
        {
          "lable": "A",
          "test": "1",
          "value": "12"
        },
        {
          "lable": "B",
          "test": "2",
          "value": "122"
        },
        {
          "lable": "D",
          "test": "3",
          "value": "1245"
        }
      ],
      "value": "value test"
    },
    {
      "id": 1,
      "statement": "is This status Q1",
      "type": "text",
      "w": "1",
      "options": [],
      "value": "value test"
    },
    {
      "id": 1,
      "statement": "is This status Q1",
      "type": "text",
      "w": "1",
      "options": [],
      "value": "value test"
    },
    {
      "id": 1,
      "statement": "is This status Q1",
      "type": "text",
      "w": "1",
      "options": [],
      "value": "value test"
    },
  ]
}

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
        this.state = { questionsList: qlist }
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
            <View style={styles.container}>
                <Text style={styles.Header}>{q_number}. {question.statement}</Text>
                <QuestionMcq options={question.options}></QuestionMcq>
            </View>
            )
        }
    }

    handleNavigation = (name) => {
      name === 'bt_add_text_question' ? Actions.addTextQuestion() : Actions.addMcqQuestion();
    }
   

    render() {
        let renderQiestions = this.state.questionsList.Questions;
        let question = renderQiestions[0]
        return (
          <View >

            <FlatList
            keyExtractor={(item) => item.id}
            enableEmptySections
            data={renderQiestions}
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

mapStateToProps = state => {
    const questions = _.map(state.ListContactsReducer, (value, uid) => {
      return { ...value, uid }
    });
  
    return {
      questions: questions
    }
}

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
export default SurveyEditScreen;
