import {
  GET_SUPERADMIN_PENDING,
  GET_SUPERADMIN_SUCCESS,
  GET_SUPERADMIN_ERROR,
  ADD_SUPERADMIN_SUCCESS,
  EDIT_SUPERADMIN_SUCCESS,
  DELETE_SUPERADMIN_PENDING,
  DELETE_SUPERADMIN_SUCCESS,
  DELETE_SUPERADMIN_ERROR
} from './constants';

export const getSuperAdminPending = () => {
  return {
    type: GET_SUPERADMIN_PENDING
  };
};

export const getSuperAdminSuccess = (data) => {
  return {
    type: GET_SUPERADMIN_SUCCESS,
    payload: data
  };
};

export const getSuperAdminError = (error) => {
  return {
    type: GET_SUPERADMIN_ERROR,
    payload: error
  };
};

export const deleteSuperAdminPending = (pending) => {
  return {
    type: DELETE_SUPERADMIN_PENDING,
    payload: pending
  };
};

export const deleteSuperAdminSuccess = (superAdminID) => {
  return {
    type: DELETE_SUPERADMIN_SUCCESS,
    payload: superAdminID
  };
};

export const deleteSuperAdminError = (error) => {
  return {
    type: DELETE_SUPERADMIN_ERROR,
    payload: error
  };
};
export const addSuperAdminSuccess = (superAdmin) => {
  return {
    type: ADD_SUPERADMIN_SUCCESS,
    payload: superAdmin
  };
};

export const editSuperAdminSuccess = (superAdmin) => {
  return {
    type: EDIT_SUPERADMIN_SUCCESS,
    payload: superAdmin
  };
};
