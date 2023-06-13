import {
  GET_SUBSCRIPTION_SUCCESS,
  GET_SUBSCRIPTION_PENDING,
  GET_SUBSCRIPTION_ERROR,
  PUT_SUBSCRIPTION_SUCCESS,
  PUT_SUBSCRIPTION_PENDING,
  PUT_SUBSCRIPTION_ERROR,
  POST_SUBSCRIPTION_SUCCESS,
  POST_SUBSCRIPTION_PENDING,
  POST_SUBSCRIPTION_ERROR,
  DELETE_SUBSCRIPTION_SUCCESS,
  DELETE_SUBSCRIPTION_PENDING,
  DELETE_SUBSCRIPTION_ERROR
} from './constants';

export const getSubscriptionSuccess = (data) => {
  return {
    type: GET_SUBSCRIPTION_SUCCESS,
    payload: data
  };
};

export const getSubscriptionPending = (pending) => {
  return {
    type: GET_SUBSCRIPTION_PENDING,
    payload: pending
  };
};

export const getSubscriptionError = (error) => {
  return {
    type: GET_SUBSCRIPTION_ERROR,
    payload: error
  };
};

export const editSubscriptionSuccess = (id) => {
  return {
    type: PUT_SUBSCRIPTION_SUCCESS,
    payload: id
  };
};

export const editSubscriptionPending = (pending) => {
  return {
    type: PUT_SUBSCRIPTION_PENDING,
    payload: pending
  };
};

export const editSubscriptionError = (error) => {
  return {
    type: PUT_SUBSCRIPTION_ERROR,
    payload: error
  };
};

export const addSubscriptionSuccess = (data) => {
  return {
    type: POST_SUBSCRIPTION_SUCCESS,
    payload: data
  };
};

export const addSubscriptionPending = (pending) => {
  return {
    type: POST_SUBSCRIPTION_PENDING,
    payload: pending
  };
};

export const addSubscriptionError = (error) => {
  return {
    type: POST_SUBSCRIPTION_ERROR,
    payload: error
  };
};

export const deleteSubscriptionSuccess = (id) => {
  return {
    type: DELETE_SUBSCRIPTION_SUCCESS,
    payload: id
  };
};

export const deleteSubscriptionPending = (pending) => {
  return {
    type: DELETE_SUBSCRIPTION_PENDING,
    payload: pending
  };
};

export const deleteSubscriptionError = (error) => {
  return {
    type: DELETE_SUBSCRIPTION_ERROR,
    payload: error
  };
};
