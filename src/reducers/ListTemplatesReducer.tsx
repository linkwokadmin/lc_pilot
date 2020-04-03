const INITIAL_STATE = {
  coachTemplates: [],
  userTemplates: [],
  editedTemplate: {}
}

import {
  TEMPLATES_LIST, ADD_TEMPLATE, ERROR_ADDING_TEMPLATE, USER_TEMPLATE_LIST, COACH_TEMPLATE_LIST, SINGLE_TEMPLATE, CREATE_TEMPLATE
} from '../resources/types';

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case TEMPLATES_LIST:
      return {...state, coachTemplates: action.payload}
    case SINGLE_TEMPLATE:
      return {...state, editedTemplate: action.payload}
    case USER_TEMPLATE_LIST:
      return {...state, userTemplates: action.payload}
    case COACH_TEMPLATE_LIST:
      return {...state, coachTemplates: action.payload}
    case ADD_TEMPLATE:
      return action.payload
    case ERROR_ADDING_TEMPLATE:
      return state
    case CREATE_TEMPLATE:
      let updatedCoachTemplates = state.coachTemplates.concat([action.payload]);
      return {
          ...state, coachTemplates: updatedCoachTemplates
        }
    default:
      return state;
  }
}
