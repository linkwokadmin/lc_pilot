const INITIAL_STATE = {
  feedbacks: {}
}

import {
  FEEDBACK_LIST, FETCH_SURVEY_FEEDBACK
} from '../resources/types';

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FEEDBACK_LIST:
      return action.payload
    case FETCH_SURVEY_FEEDBACK:
      let questionList = {...state.feedbacks, [action.payload.templateId]: action.payload.feedbacks}
      return {...state, feedbacks: questionList}
    default:
      return state;
  }
}
