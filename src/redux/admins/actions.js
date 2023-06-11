import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  ADD_ADMIN_SUCCESS,
  EDIT_ADMIN_SUCCESS,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_ERROR
} from './constants';

export const getAdminsPending = (pending) => {
  return {
    type: GET_ADMINS_PENDING,
    payload: pending
  };
};

export const getAdminsSuccess = (list) => {
  return {
    type: GET_ADMINS_SUCCESS,
    payload: list
  };
};

export const getAdminsError = (error) => {
  return {
    type: GET_ADMINS_ERROR,
    payload: error
  };
};

export const deleteAdminPending = (pending) => {
  return {
    type: DELETE_ADMIN_PENDING,
    payload: pending
  };
};

export const deleteAdminSuccess = (adminID) => {
  return {
    type: DELETE_ADMIN_SUCCESS,
    payload: adminID
  };
};

export const deleteAdminError = (error) => {
  return {
    type: DELETE_ADMIN_ERROR,
    payload: error
  };
};
export const addAdminSuccess = (admin) => {
  return {
    type: ADD_ADMIN_SUCCESS,
    payload: admin
  };
};

export const editAdminSuccess = (admin) => {
  return {
    type: EDIT_ADMIN_SUCCESS,
    payload: admin
  };
};
