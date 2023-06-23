const {
  loginPending,
  loginSuccess,
  loginError,
  // signUpSuccess,
  // signUpPending,
  // signUpError,
  // logOutError,
  // logOutSuccess,
  // logOutPending,
  getAuthenticationPending,
  getAuthenticationSuccess,
  getAuthenticationError
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
