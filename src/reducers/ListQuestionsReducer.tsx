const INITIAL_STATE = {}

import {
  QUESTION_LIST, ADD_QUESTION, ERROR_ADDING_QUESTION
} from '../resources/types';

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case QUESTION_LIST:
      console.log(action)
      return action.payload
    case ADD_QUESTION:
      return state;
    case ERROR_ADDING_QUESTION:
      return state
    default:
      return state;
  }
}
