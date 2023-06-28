import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  GET_AUTHENTICATION_PENDING,
  GET_AUTHENTICATION_SUCCESS,
  GET_AUTHENTICATION_ERROR,
  RECOVER_PASSWORD_PENDING,
  RECOVER_PASSWORD_SUCCESS,
  RECOVER_PASSWORD_ERROR
} from './constants';

export const loginPending = () => {
  return {
    type: LOGIN_PENDING
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error
  };
};

export const signUpPending = () => {
  return {
    type: SIGN_UP_PENDING
  };
};

export const signUpSuccess = (data) => {
  return {
    type: SIGN_UP_SUCCESS,
    payload: data
  };
};

export const signUpError = (error) => {
  return {
    type: SIGN_UP_ERROR,
    payload: error
  };
};

export const logOutPending = () => {
  return {
    type: LOGOUT_PENDING
  };
};

export const logOutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const logOutError = (error) => {
  return {
    type: LOGOUT_ERROR,
    payload: error
  };
};

export const getAuthenticationPending = () => {
  return {
    type: GET_AUTHENTICATION_PENDING
  };
};

export const getAuthenticationSuccess = (data) => {
  return {
    type: GET_AUTHENTICATION_SUCCESS,
    payload: data
  };
};

export const getAuthenticationError = (error) => {
  return {
    type: GET_AUTHENTICATION_ERROR,
    payload: error
  };
};

export const recoverPasswordPending = () => {
  return {
    type: RECOVER_PASSWORD_PENDING
  };
};

export const recoverPasswordSuccess = (data) => {
  return {
    type: RECOVER_PASSWORD_SUCCESS,
    payload: data
  };
};

export const recoverPasswordError = (error) => {
  return {
    type: RECOVER_PASSWORD_ERROR,
    payload: error
  };
};
