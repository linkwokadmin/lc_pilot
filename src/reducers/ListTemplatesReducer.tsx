const INITIAL_STATE = {}

import {
  TEMPLATES_LIST, ADD_TEMPLATE, ERROR_ADDING_TEMPLATE
} from '../resources/types';

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case TEMPLATES_LIST:
      return action.payload
    case ADD_TEMPLATE:
      return {
        ...state, newTemplate: action.payload
      }
    case ERROR_ADDING_TEMPLATE:
      return state
    default:
      return state;
  }
}
