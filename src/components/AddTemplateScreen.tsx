import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Input, TextLink, Loading,  } from './common';
// import { Formik } from 'formik';
import {
  addContact,
  registerNewContact
} from '../actions/AppActions';
import { TextInput } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { FloatingAction } from "react-native-floating-action";
import { Actions } from 'react-native-router-flux';
import { Card } from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient';

import AddTextQuestion from './AddTextQuestion';
import AddMcqQuestion from './AddMcqQuestion'
import AddReatQuestion from './AddReatQuestion'

class AddTemplateScreen extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      name: "",
      user_id: this.props.currentUser.id,
      questions: [
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
          sequence: 0
        }
      ]
    };
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
    this.props.createTemplates(this.state);
    Actions.pop();
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
                      <AddMcqQuestion handleUpdate={this.handleUpdate} idx={idx}/> : 
                    (shareholder.type === 'rate' ? 
                      <AddReatQuestion handleUpdate={this.handleUpdate} idx={idx}/> : 
                      <AddTextQuestion handleUpdate={this.handleUpdate} idx={idx}/>
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
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                  />
                </View>
              </Card.Content>
            </Card>
          </View>
          
          {this.state.questions.map((shareholder, idx) => (
            this.renderCard(shareholder, idx)
          ))}
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

const mapStateToProps = state => (
  {
    email_contact: state.AppReducer.email_contact,
    add_contact_error: state.AppReducer.add_contact_error,
    add_contact_status: state.AppReducer.add_contact_status
  }
);

export default connect(
  mapStateToProps, {
    addContact,
    registerNewContact
  })(AddTemplateScreen);

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
