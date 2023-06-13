import {
  ADD_TRAINER_PENDING,
  ADD_TRAINER,
  ADD_TRAINER_ERROR,
  UPDATE_TRAINER_PENDING,
  UPDATE_TRAINER,
  UPDATE_TRAINER_ERROR,
  GET_TRAINERS_PENDING,
  GET_TRAINERS_SUCCESS,
  GET_TRAINERS_FAILURE,
  DELETE_TRAINER_PENDING,
  DELETE_TRAINER_SUCCESS,
  DELETE_TRAINER_FAILURE
} from './constants';

export const addTrainerPending = (pending) => {
  return {
    type: ADD_TRAINER_PENDING,
    payload: pending
  };
};

export const addTrainer = (data) => {
  return {
    type: ADD_TRAINER,
    payload: data
  };
};

export const addTrainerError = (error) => {
  return {
    type: ADD_TRAINER_ERROR,
    payload: error
  };
};

export const updateTrainerPending = (pending) => {
  return {
    type: UPDATE_TRAINER_PENDING,
    payload: pending
  };
};

export const updateTrainerSuccess = (data) => {
  return {
    type: UPDATE_TRAINER,
    payload: data
  };
};

export const updateTrainerError = (error) => {
  return {
    type: UPDATE_TRAINER_ERROR,
    payload: error
  };
};

export const getTrainersPending = (pending) => ({
  type: GET_TRAINERS_PENDING,
  payload: pending
});

export const getTrainersSuccess = (trainers) => ({
  type: GET_TRAINERS_SUCCESS,
  payload: trainers
});

export const getTrainersFailure = (error) => ({
  type: GET_TRAINERS_FAILURE,
  payload: error
});

export const deleteTrainerPending = (pending) => ({
  type: DELETE_TRAINER_PENDING,
  payload: pending
});

export const deleteTrainerSuccess = (id) => ({
  type: DELETE_TRAINER_SUCCESS,
  payload: id
});

export const deleteTrainerFailure = (error) => ({
  type: DELETE_TRAINER_FAILURE,
  payload: error
});
