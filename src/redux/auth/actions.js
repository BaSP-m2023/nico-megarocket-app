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
  SET_AUTHENTICATION
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

export const setAuthentication = (role) => {
  return {
    type: SET_AUTHENTICATION,
    payload: { role }
  };
};
