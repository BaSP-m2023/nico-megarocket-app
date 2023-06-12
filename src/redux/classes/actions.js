import {
  GET_CLASSES_SUCCESS,
  GET_CLASSES_PENDING,
  GET_CLASSES_ERROR,
  DELETE_CLASSES_SUCCESS,
  DELETE_CLASSES_PENDING,
  DELETE_CLASSES_ERROR
} from './constants';

export const getClassSuccess = (data) => {
  return {
    type: GET_CLASSES_SUCCESS,
    payload: data
  };
};

export const getClassPending = (pending) => {
  return {
    type: GET_CLASSES_PENDING,
    payload: pending
  };
};

export const getClassError = (error) => {
  return {
    type: GET_CLASSES_ERROR,
    payload: error
  };
};

export const deleteClassSuccess = (id) => {
  return {
    type: DELETE_CLASSES_SUCCESS,
    payload: id
  };
};

export const deleteClassPending = (pending) => {
  return {
    type: DELETE_CLASSES_PENDING,
    payload: pending
  };
};

export const deleteClassError = (error) => {
  return {
    type: DELETE_CLASSES_ERROR,
    payload: error
  };
};
