import React, { Component } from 'react';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { View, Text, FlatList, Image, TouchableHighlight, StyleSheet, TouchableOpacity, Button, TextInput } from 'react-native';

import { connect } from 'react-redux';
import { compose } from "redux";
import { fetchQuestions } from '../actions/AppActions';
import { FloatingAction } from "react-native-floating-action";
import { QuestionText } from './QuestionTypeText'
import { QuestionMcq } from './QuestionTypeMcq'
import { Card,AirbnbRating } from 'react-native-elements'
import AddTextQuestion from './AddTextQuestion';
import AddMcqQuestion from './AddMcqQuestion'
import AddReatQuestion from './AddReatQuestion'

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
    super();
    this.state = {
      textType: true,
      mcqType: false,
      rateType: false
    }
  }
  viweQuestion: any;
  componentDidMount() {
    this.fetchQuestions(this.props.id ? this.props.id : 0);
  }

  fetchQuestions = (template_id) => {
    this.props.actions.fetchQuestions(template_id ? template_id : 0);
  }
  handleChange(event) {

  }



  renderQuestion(questionContent) {
    let question = questionContent.item
    let q_number = (questionContent.index) + 1;
    if (question.type == "text") {
      return (
        <Card>
          <View style={styles.container}>
            <Text style={styles.Header}>{q_number}. {question.statement}</Text>
            <QuestionText question={question} number={q_number} onChange={this.handleChange} ></QuestionText>
          </View>
        </Card>
      )

    }
    if (question.type == "mcq") {
      return (
        <Card>
          <View style={styles.container}>
            <Text style={styles.Header}>{q_number}. {question.statement}</Text>
            <QuestionMcq options={question.options} onChange={this.handleChange}></QuestionMcq>
          </View>
        </Card>
      )
    }
  }

  handleNavigation = (name) => {
    name === 'bt_add_text_question' ? Actions.addTextQuestion({ id: this.props.id }) : Actions.addMcqQuestion({ id: this.props.id });
  }

  loadQuestions() {
    console.log('---render ----------')
    return (
      <FlatList
        keyExtractor={(item) => item.id}
        enableEmptySections
        data={this.props.questions}
        renderItem={data => this.renderQuestion(data)}
      />
    )
  }
  renderQuestionType(Name: String) {
    if (Name == 'MCQ') {

      this.setState({
        textType: false,
        mcqType: true,
        rateType: false
      })
      console.log(this.state);
    }

    if (Name == 'Text') {
      this.setState({
        textType: true,
        mcqType: false,
        rateType: false
      });
    }
    if (Name == 'Rate') {
      this.setState({
        textType: false,
        mcqType: false,
        rateType: true
      });
    }

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

  render() {
    return (
      <View style={styles.container}>
        <Card>
          <View style={styles.questionType}>
            <Button title="MCQ" color='green' onPress={() => this.renderQuestionType('MCQ')} />
            <Button title="Text" color='green' onPress={() => this.renderQuestionType('Text')} />
            <Button title="Rate" color='green' onPress={() => this.renderQuestionType('Rate')} />
          </View>
          <View>
            {this.rendrUI(this.state)}
          </View>
        </Card>

        {this.loadQuestions()}
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
      fetchQuestions: (template_id) => {
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
    marginTop: 5
  },
  Header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5

  },
  textInput: {
    borderColor: '#777',
    borderWidth: 1,
    padding: 10,
    flex: 1,
    width: '80%',
    margin: 15,
  },
  questionType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  


  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    top: 70
  },
  placeButtonAdd: {
    width: '50%',
    left: 10
  },
  placeButtonDelete: {
    width: '50%',
    right: 10
  },
  textLbl: {
    color: 'green'
  }
});


export default compose(connect(mapStateToProps, mapDispatchToProps)
)(SurveyEditScreen);
