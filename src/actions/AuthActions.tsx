import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import base64 from 'base-64';
import axios from 'axios';

import {
  ADD_NAME,
  ADD_EMAIL,
  ADD_PASSWORD,
  SIGN_IN_LOADING,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  SIGN_UP_LOADING,
  SUCCESS_REGISTER,
  FAILURE_REGISTER,
} from '../resources/types';

/*
ActionCreator to manipulate InputText on (SignUpScreen)
*/
export const addName = (name) => {
  return {
    type: ADD_NAME,
    payload: name
  }
}
export const addEmail = (email) => {
  return {
    type: ADD_EMAIL,
    payload: email
  }
}
export const addPassword = (password) => {
  return {
    type: ADD_PASSWORD,
    payload: password
  }
}
/*
ActionCreator to signIn on application
*/
export const SignIN = ({ email, password }) => {
  return dispatch => {
    dispatch({ type: SIGN_IN_LOADING })
    // firebase.auth().signInWithEmailAndPassword(email, password)
    axios.post("https://life-coach-api.herokuapp.com/api/v1/sign_in",{
        email: email,
        password: password
    })
    .then(response => {
      const TOKEN_KEY = response.data.jwt;
      console.log(TOKEN_KEY);
      AsyncStorage.setItem('@mytoken:key', TOKEN_KEY);
      AsyncStorage.setItem('authorization', TOKEN_KEY);
      authSuccess(dispatch)
    })
    .catch(error => authUnsuccess(error, dispatch))
  }
}
/*
ActionCreator to create new user registration
*/
export const registerUser = ({ name, email, password }) => {
  return dispatch => {
    dispatch({ type:
      SIGN_UP_LOADING
    })

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(response => {
      let EmailEncode = base64.encode(email);
      firebase.database().ref(`/users/${EmailEncode}`)
      .push({ name })
      .then(response => registerSuccess(dispatch))
    })
    .catch(error => registerUnsuccess(error, dispatch))
  }
}

const authSuccess = (dispatch) => {
  dispatch({
    type: AUTH_SUCCESS
  });
  Actions.mainScreen();
}

const authUnsuccess = (error, dispatch) => {
  dispatch({
    type: AUTH_FAILURE,
    payload: error.code
  })
}

const registerSuccess = (dispatch) => {
  dispatch({ type: SUCCESS_REGISTER });
  Actions.welcomeScreen();
}

const registerUnsuccess = (error, dispatch) => {
  dispatch({
    type: FAILURE_REGISTER,
    payload: error.code
  })
}
