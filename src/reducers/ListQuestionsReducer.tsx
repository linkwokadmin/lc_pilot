const INITIAL_STATE = {
  questions: {},
  coach_questions: {}
}

import {
  QUESTION_LIST, ADD_QUESTION, ERROR_ADDING_QUESTION, FETCH_SURVEY_QUESTION, FETCH_QUESTION
} from '../resources/types';

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case QUESTION_LIST:
      return action.payload
    case ADD_QUESTION:
      return state;
    case ERROR_ADDING_QUESTION:
      return state
    case FETCH_SURVEY_QUESTION:
      let questionList = {...state.questions,[action.payload.templateId]: action.payload.questions}
      return {...state, questions: questionList}
    case FETCH_QUESTION:
      let coachQuestionList = {...state.coach_questions,[action.payload.templateId]: action.payload.questions}
      return {...state, coach_questions: coachQuestionList}
    default:
      return state;
  }
}
