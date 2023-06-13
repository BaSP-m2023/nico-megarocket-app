import {
  GET_SUPERADMIN_PENDING,
  GET_SUPERADMIN_SUCCESS,
  GET_SUPERADMIN_ERROR,
  POST_SUPERADMIN_PENDING,
  POST_SUPERADMIN_SUCCESS,
  POST_SUPERADMIN_ERROR,
  PUT_SUPERADMIN_PENDING,
  PUT_SUPERADMIN_SUCCESS,
  PUT_SUPERADMIN_ERROR,
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

export const postSuperAdminPending = () => {
  return {
    type: POST_SUPERADMIN_PENDING
  };
};

export const postSuperAdminSuccess = (sAdmin) => {
  return {
    type: POST_SUPERADMIN_SUCCESS,
    payload: sAdmin
  };
};

export const postSuperAdminError = (error) => {
  return {
    type: POST_SUPERADMIN_ERROR,
    payload: error
  };
};

export const putSuperAdminPending = () => {
  return {
    type: PUT_SUPERADMIN_PENDING
  };
};

export const putSuperAdminSuccess = (sAdmin) => {
  return {
    type: PUT_SUPERADMIN_SUCCESS,
    payload: sAdmin
  };
};

export const putSuperAdminError = (error) => {
  return {
    type: PUT_SUPERADMIN_ERROR,
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
