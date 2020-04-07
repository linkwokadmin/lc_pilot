import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import base64 from 'base-64';
import axios from 'axios';
import { api_url } from './../resources/constants'

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
  SPLASH_READ
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

export const readSplash = () => {
  return {
    type: SPLASH_READ
  }
}

export const splashRead = () => {
  readSplash();
  AsyncStorage.setItem('sread', 'true');
  Actions.loginScreen();
}
/*
ActionCreator to signIn on application
*/
export const SignIN = ({ email, password }) => {
  return dispatch => {
    dispatch({ type: SIGN_IN_LOADING })
    // firebase.auth().signInWithEmailAndPassword(email, password)
    axios.post(api_url + "/api/v1/sign_in",{
        email: email,
        password: password
    })
    .then(response => {
      const TOKEN_KEY = response.data.jwt;
      console.log(TOKEN_KEY);
      AsyncStorage.setItem('@mytoken:key', TOKEN_KEY);
      AsyncStorage.setItem('authorization', TOKEN_KEY);
      AsyncStorage.setItem('currentUser', response.data.user);
      authSuccess(dispatch, response.data.user)
    }).catch(error => authUnsuccess(error, dispatch));
  }
}
/*
ActionCreator to create new user registration
*/
export const registerUser = ({ name, email, password, userType }) => {
  const newUserObj = {
    user:{
      email: email,
      password: password,
      name: name,
      password_confirmation: password,
      user_type: userType
    }
  };
  console.log(newUserObj);
  return dispatch => {
    dispatch({ type:
      SIGN_UP_LOADING
    })

    axios.post(api_url + "/api/v1/sign_up", newUserObj)
    .then(response => {
      const TOKEN_KEY = response.data.jwt;
      console.log(TOKEN_KEY);
      AsyncStorage.setItem('@mytoken:key', TOKEN_KEY);
      AsyncStorage.setItem('authorization', TOKEN_KEY);
      AsyncStorage.setItem('currentUser', response.data.user);
      console.log(response.data.user);
      authSuccess(dispatch, response.data.user)
      registerSuccess(dispatch)
      // let EmailEncode = base64.encode(email);
      // firebase.database().ref(`/users/${EmailEncode}`)
      // .push({ name })
      // .then(response => registerSuccess(dispatch))
    })
    .catch(error => registerUnsuccess(error, dispatch))
  }
}

export const fetchCurrentUser = () => {
  console.log("Fetching......");
  return dispatch => {
    AsyncStorage.getItem('currentUser')
    .then(user => {
      console.log("User:", user);
      authSuccess(dispatch, user);
    })
    .catch(err => {
      console.log(err);
    })
  }
}

const authSuccess = (dispatch, payload) => {
  dispatch({
    type: AUTH_SUCCESS,
    payload: payload
  });
  Actions.mainScreen({currentUser: payload});
}

const authUnsuccess = (error, dispatch) => {
  dispatch({
    type: AUTH_FAILURE,
    payload: error.code
  })
}

const registerSuccess = (dispatch) => {
  dispatch({ type: SUCCESS_REGISTER });
  Actions.mainScreen();
}

const registerUnsuccess = (error, dispatch) => {
  dispatch({
    type: FAILURE_REGISTER,
    payload: error.code
  })
}
