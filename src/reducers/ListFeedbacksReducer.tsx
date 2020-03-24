const INITIAL_STATE = {}

import {
  FEEDBACK_LIST
} from '../resources/types';

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FEEDBACK_LIST:
      return action.payload
    default:
      return state;
  }
}
