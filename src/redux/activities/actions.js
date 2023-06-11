import { GET_ACTIVITIES_PENDING, GET_ACTIVITIES_SUCCESS, GET_ACTIVITIES_ERROR } from './constants';

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
