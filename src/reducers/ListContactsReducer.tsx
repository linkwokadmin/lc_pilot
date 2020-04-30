const INITIAL_STATE = {
  user_contacts: [],
  contacts: []
}

import {
  CONTACTS_LIST,
  USER_CONTACT,
  ADD_CONTACT_CHAT,
} from '../resources/types';

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CONTACTS_LIST:
      return {...state,contacts: action.payload}
    
    case USER_CONTACT: 
      return {...state, user_contacts: action.payload}

    case ADD_CONTACT_CHAT: 
      const user_contacts = state.user_contacts.concat(action.payload)
      return {...state, user_contacts: user_contacts}
    
    default:
      return state;
  }
}