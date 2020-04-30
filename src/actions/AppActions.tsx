import firebase from 'firebase';
import base64 from 'base-64';
import _ from 'lodash';
import axios from 'axios';
import {api_url} from './../resources/constants';
import {AsyncStorage} from 'react-native';

import {
  ADD_CONTACT,
  ADD_TEMPLATE,
  ADD_NEW_CONTACT_ERROR,
  ADD_NEW_CONTACT_SUCCESS,
  CONTACTS_LIST,
  CHANGE_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  LIST_CONVERSATION_USER,
  FETCH_ALL_CHATS,
  TEMPLATES_LIST,
  QUESTION_LIST,
  ERROR_ADDING_TEMPLATE,
  FEEDBACK_LIST,
  USER_TEMPLATE_LIST,
  COACH_TEMPLATE_LIST,
  SINGLE_TEMPLATE,
  CREATE_TEMPLATE,
  FETCH_SURVEY_QUESTION,
  FETCH_SURVEY_FEEDBACK,
  FETCH_QUESTION,
} from '../resources/types';
import {template} from '@babel/core';
import {log} from 'react-native-reanimated';

/* added to redux */
export const addContact = email => {
  return {
    type: ADD_CONTACT,
    payload: email,
  };
};

/* added to redux */
export const addTemplate = (dispatch, template) => {
  dispatch({
    type: ADD_TEMPLATE,
    payload: template,
  });
};

export const registerNewContact = email => {
  return dispatch => {
    let emailContactB64 = base64.encode(email);

    firebase
      .database()
      .ref(`/users/${emailContactB64}`)
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          /* Guest email for new contact */
          const userData = _.first(_.values(snapshot.val()));
          /* Currently authenticated user */
          const {currentUser} = firebase.auth();
          let currentEmailB64 = base64.encode(currentUser.email);

          firebase
            .database()
            .ref(`/users_of_contacts/${currentEmailB64}`)
            .push({email, name: userData.name})
            .then(() => registerNewContactSuccess(dispatch))
            .catch(error => registerNewContactError(error, dispatch));
        } else {
          dispatch({
            type: ADD_NEW_CONTACT_ERROR,
            payload: '[App] The user does not exist!',
          });
        }
      });
  };
};

export const createNewTemplate = template => {
  return dispatch => {
    addTemplate(dispatch, template);
  };
};

export const fetchContacts = () => {
  return dispatch => {
    AsyncStorage.getItem('authorization').then(token => {
      axios
        .get(api_url + '/api/v1/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          let snapshot = response.data;
          console.log('------ contect -----', snapshot);
          // console.log(snapshot)
          dispatch({
            type: CONTACTS_LIST,
            payload: snapshot,
          });
        })
        .catch(error => {
          console.log('------error in fetch ---------', JSON.stringify(error));
        });
    });
  };
};

export const sendMessage = (message, contactName, contactEmail) => {
  // Current user information
  const {currentUser} = firebase.auth();
  const userEmail = currentUser.email;

  return dispatch => {
    // Convert to base64
    const user_email_encode = base64.encode(userEmail);
    const contact_email_encode = base64.encode(contactEmail);

    // Push to firebase (send and receive)
    firebase
      .database()
      .ref(`/messages/${user_email_encode}/${contact_email_encode}`)
      .push({message: message, type: 'send'})
      .then(() => {
        firebase
          .database()
          .ref(`/messages/${contact_email_encode}/${user_email_encode}`)
          .push({message: message, type: 'receive'})
          .then(() => dispatch({type: SEND_MESSAGE_SUCCESS}));
      })
      .then(() => {
        // Store header user conversations
        firebase
          .database()
          .ref(
            `/user_conversations/${user_email_encode}/${contact_email_encode}`,
          )
          .set({
            name: contactName,
            email: contactEmail,
            lastMessage: message,
          });
      })
      .then(() => {
        // Store header contact conversations
        firebase
          .database()
          .ref(`/users/${user_email_encode}`)
          .once('value')
          .then(snapshot => {
            const dataUser = _.first(_.values(snapshot.val()));
            firebase
              .database()
              .ref(
                `/user_conversations/${contact_email_encode}/${user_email_encode}`,
              )
              .set({
                name: dataUser.name,
                email: userEmail,
                lastMessage: message,
              });
          });
      });
  };
};

export const fetchAllChats = currentUserEmail => {
  return dispatch => {
    axios.get(api_url + '/api/v1/user_conversations').then(response => {
      let user_conversations = response.data;
      axios.get(api_url + '/api/v1/users_of_contacts').then(response => {
        let users_of_contacts = response.data;
        const contacts = _.map(users_of_contacts, (value, uid) => {
          return {...value, uid};
        });

        const conversations = _.map(user_conversations, (value, uid) => {
          return {...value, uid};
        });

        let array_merged = [];
        let count = 0;
        let i = 0;
        let y = 0;

        for (i = 0; i < conversations.length; i++) {
          for (y = 0; y < contacts.length; y++) {
            if (conversations[i].email == contacts[y].email) {
              array_merged[count] = {...conversations[i], ...contacts[y]};
              count++;
            }
          }
        }
        console.log(array_merged);

        dispatch({
          type: FETCH_ALL_CHATS,
          payload: array_merged,
        });
      });
    });
  };
};
//fatch Questions

export const fetchQuestions = template_id => {
  console.log(111);
  return dispatch => {
    AsyncStorage.getItem('authorization')
      .then(token => {
        let url =
          api_url + '/api/v1//questions/template_questions/' + template_id;
        axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
            let questions = response.data.data;
            console.log('Questions: ', questions);
            dispatch({
              type: FETCH_QUESTION,
              payload: {templateId: template_id, questions: questions},
            });
          })
          .catch(api_err => {
            console.log('API ERR: ', api_err);
          });
      })
      .catch(err => {
        console.log('Token Error: ', err);
      });
  };
};

export const fetchSurveyQuestions = template_id => {
  console.log(111);
  return dispatch => {
    AsyncStorage.getItem('authorization')
      .then(token => {
        let url =
          api_url +
          '/api/v1/questions/survey_template_questions/' +
          template_id;
        axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
            let questions = response.data.data;
            console.log('Questions: ', questions);
            dispatch({
              type: FETCH_SURVEY_QUESTION,
              payload: {templateId: template_id, questions: questions},
            });
          })
          .catch(api_err => {
            console.log('API ERR: ', api_err);
          });
      })
      .catch(err => {
        console.log('Token Error: ', err);
      });
  };
};

export const fetchResponses = template_id => {
  return dispatch => {
    AsyncStorage.getItem('authorization')
      .then(token => {
        let url = api_url + '/api/v1/responses/feedbacks/' + template_id;
        axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
            let feedbacks = response.data.data;
            console.log('feedbacks: ', feedbacks);
            dispatch({
              type: FETCH_SURVEY_FEEDBACK,
              payload: {templateId: template_id, feedbacks: feedbacks},
            });
          })
          .catch(api_err => {
            console.log('API ERR: ', api_err);
          });
      })
      .catch(err => {
        console.log('Token Error: ', err);
      });
  };
};

// Fetch templates
export const fetchTemplates = () => {
  return dispatch => {
    AsyncStorage.getItem('authorization')
      .then(token => {
        let url = api_url + '/api/v1/templates';
        axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
            let templates = response.data.data;
            dispatch({
              type: TEMPLATES_LIST,
              payload: templates,
            });
          })
          .catch(api_err => {
            console.log('API ERR: ', api_err);
          });
      })
      .catch(err => {
        console.log('Token Error: ', err);
      });
  };
};

// Fetch templates
export const fetchSingleTemplate = id => {
  return dispatch => {
    AsyncStorage.getItem('authorization')
      .then(token => {
        let url = api_url + '/api/v1/templates/' + id;
        axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
            let templates = response.data;
            dispatch({
              type: SINGLE_TEMPLATE,
              payload: templates,
            });
          })
          .catch(api_err => {
            console.log('API ERR: ', api_err);
          });
      })
      .catch(err => {
        console.log('Token Error: ', err);
      });
  };
};

// Fetch templates
export const fetchUserTemplates = (creatorId, userId) => {
  return dispatch => {
    AsyncStorage.getItem('authorization')
      .then(token => {
        let url =
          api_url +
          '/api/v1/templates/my_templates/user/' +
          creatorId +
          '/' +
          userId;
        axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
            let templates = response.data.data;
            templates.forEach(element => {
              element['color'] = getColor()
            });
            dispatch({
              type: USER_TEMPLATE_LIST,
              payload: templates,
            });
          })
          .catch(api_err => {
            console.log('API ERR: ', api_err);
          });
      })
      .catch(err => {
        console.log('Token Error: ', err);
      });
  };
};

// Fetch  Coach templates
export const fetchCoachTemplates = () => {
  return dispatch => {
    AsyncStorage.getItem('authorization')
      .then(token => {
        let url = api_url + '/api/v1/templates/my_templates/coach';
        axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
            let templates = response.data.data;
            templates.forEach(element => {
              element['color'] = getColor()
            });
            dispatch({
              type: COACH_TEMPLATE_LIST,
              payload: templates,
            });
          })
          .catch(api_err => {
            console.log('API ERR: ', api_err);
          });
      })
      .catch(err => {
        console.log('Token Error: ', err);
      });
  };
};

// Fetch templates
export const createTemplates = template => {
  return dispatch => {
    let data = {
      template: template,
    };
    AsyncStorage.getItem('authorization')
      .then(token => {
        let url = api_url + '/api/v1/templates';
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
        axios
          .post(url, data, {
            headers: headers,
          })
          .then(response => {
            let newTemplate = response.data.data;
            dispatch({
              type: CREATE_TEMPLATE,
              payload: newTemplate,
            });
          })
          .catch(error => {
            // dispatch({
            //   type: ERROR_ADDING_TEMPLATE
            // })
            console.log('dispatchError: ', error);
            return null;
          });
      })
      .catch(err => {
        console.log('Token Error: ', err);
        return null;
      });
  };
};

// Fetch templates
export const updateTemplates = template => {
  return dispatch => {
    let data = {
      template: template,
    };
    AsyncStorage.getItem('authorization')
      .then(token => {
        let url = api_url + '/api/v1/templates/' + template.id;
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
        axios
          .put(url, data, {
            headers: headers,
          })
          .then(response => {
            let newTemplate = response.data.data;
            console.log('Updated Templates');
            return newTemplate;
          })
          .catch(error => {
            console.log('dispatchError: ', error);
            return null;
          });
      })
      .catch(err => {
        console.log('Token Error: ', err);
        return null;
      });
  };
};

// Share template to user
// export const shareTemplate = (userId, templateId) => {
//   return dispatch => {
//     let data = {
//       user: {
//         template_ids: [templateId]
//       }
//     }
//     AsyncStorage.getItem("authorization")
//     .then((token) => {
//       let url = api_url + "/api/v1/users/" + userId + "/upsert_templates";
//       const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       }
//       axios.put(url, data, {
//         headers: headers
//       }).then(response => {
//         let template = response.data.data;
//         console.log("Template: ", template);
//         return template;
//       }).catch((error) => {
//         console.log(error);
//         return null;
//       })
//     })
//     .catch((err) => {
//       console.log("Token Error: ", err);
//       return null;
//     })
//   }
// }

// Create a survey template for user
export const shareTemplate = (userId, templateId) => {
  return dispatch => {
    AsyncStorage.getItem('authorization')
      .then(token => {
        let url =
          api_url +
          '/api/v1/survey_templates/create_and_share_survey/' +
          templateId +
          '/' +
          userId;
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
        axios
          .get(url, {
            headers: headers,
          })
          .then(response => {
            let template = response.data.data;
            console.log('Template: ', template);
            return template;
          })
          .catch(error => {
            console.log(error);
            return null;
          });
      })
      .catch(err => {
        console.log('Token Error: ', err);
        return null;
      });
  };
};

export const saveFeedbacks = (template_id, feedbacks) => {
  return dispatch => {
    let data = {
      feedbacks: feedbacks,
    };
    AsyncStorage.getItem('authorization')
      .then(token => {
        let url = api_url + '/api/v1/responses/' + template_id + '/bulk_upsert';
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
        axios
          .post(url, data, {
            headers: headers,
          })
          .then(response => {
            let feedbacks = response.data.data;
            return feedbacks;
          })
          .catch(error => {
            console.log(err);
            return null;
          });
      })
      .catch(err => {
        console.log('Token Error: ', err);
        return null;
      });
  };
};

/* Seatch conversation and return it to ListConversation reducer */
export const fetchMessages = contactEmail => {
  const {currentUser} = firebase.auth();
  let user_email_encode = base64.encode(currentUser.email);
  let contact_email_encode = base64.encode(contactEmail);

  return dispatch => {
    firebase
      .database()
      .ref(`/messages/${user_email_encode}/${contact_email_encode}`)
      .on('value', snapshot => {
        dispatch({
          type: LIST_CONVERSATION_USER,
          payload: snapshot.val(),
        });
      });
  };
};

const registerNewContactError = (error, dispatch) => {
  dispatch({
    type: ADD_NEW_CONTACT_ERROR,
    payload: error.message,
  });
};

const registerNewContactSuccess = dispatch =>
  dispatch({
    type: ADD_NEW_CONTACT_SUCCESS,
    payload: true,
  });

export const enableInclusionContact = () => ({
  type: ADD_NEW_CONTACT_SUCCESS,
  payload: false,
});

/* Chat component message */
export const changeMessage = text => {
  return {
    type: CHANGE_MESSAGE,
    payload: text,
  };
};

const getColor  =() => {
  var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}