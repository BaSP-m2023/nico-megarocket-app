const {
  loginPending,
  loginSuccess,
  loginError,
  logOutError,
  logOutSuccess,
  logOutPending,
  getAuthenticationPending,
  getAuthenticationSuccess,
  getAuthenticationError,
  signUpPending,
  signUpError,
  signUpSuccess
} = require('./actions');

import { firebaseApp } from 'helper/firebase';

export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(loginPending());
    try {
      const firebaseResponse = await firebaseApp
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);
      const token = await firebaseResponse.user.getIdToken();
      const {
        claims: { role }
      } = await firebaseResponse.user.getIdTokenResult();
      return dispatch(loginSuccess({ role, token }));
    } catch (error) {
      return dispatch(loginError(error.toString()));
    }
  };
};

export const signUpMember = (data) => {
  return async (dispatch) => {
    dispatch(signUpPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      console.log(response);
      if (response.error) {
        throw new Error(response.message);
      }
      return dispatch(signUpSuccess(data));
    } catch (error) {
      return dispatch(signUpError(error.toString()));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(logOutPending());
    try {
      await firebaseApp.auth().signOut();
      dispatch(logOutSuccess());
      sessionStorage.removeItem('token', '');
      sessionStorage.removeItem('role', '');
      return { error: false, message: 'Logout successfully' };
    } catch (error) {
      dispatch(logOutError(error));
      return { error: true, message: 'Error' };
    }
  };
};

export const getAuth = (token) => {
  return async (dispatch) => {
    dispatch(getAuthenticationPending());
    try {
      const response = fetch(`${process.env.REACT_APP_API_URL}/api/auth/`, { headers: { token } });
      const res = (await response).json();
      dispatch(getAuthenticationSuccess(res.data));
      return res.data;
    } catch (error) {
      return dispatch(getAuthenticationError(error.toString()));
    }
  };
};
