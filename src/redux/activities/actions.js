import {
  GET_ACTIVITIES_PENDING,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_ERROR,
  DELETE_ACTIVITIES_PENDING,
  DELETE_ACTIVITIES_SUCCESS,
  DELETE_ACTIVITIES_ERROR
} from './constants';

export const getActivitiesPending = (pending) => {
  return {
    type: GET_ACTIVITIES_PENDING,
    payload: pending
  };
};

export const getActivitiesSuccess = (list) => {
  return {
    type: GET_ACTIVITIES_SUCCESS,
    payload: list
  };
};

export const getActivitiesError = (error) => {
  return {
    type: GET_ACTIVITIES_ERROR,
    payload: error
  };
};

export const deleteActivitiesPending = (pending) => {
  return {
    type: DELETE_ACTIVITIES_PENDING,
    payload: pending
  };
};

export const deleteActivitiesSuccess = (activitiesId) => {
  return {
    type: DELETE_ACTIVITIES_SUCCESS,
    payload: activitiesId
  };
};

export const deleteActivitiesError = (error) => {
  return {
    type: DELETE_ACTIVITIES_ERROR,
    payload: error
  };
};
