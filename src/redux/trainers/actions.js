import {
  ADD_TRAINER_PENDING,
  ADD_TRAINER,
  ADD_TRAINER_ERROR,
  UPDATE_TRAINER_PENDING,
  UPDATE_TRAINER,
  UPDATE_TRAINER_ERROR
} from './constants';
import * as types from './constants';
import * as thunks from './thunks';

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
  type: types.GET_TRAINERS_PENDING,
  payload: pending
});

export const getTrainersSuccess = (trainers) => ({
  type: types.GET_TRAINERS_SUCCESS,
  payload: trainers
});

export const getTrainersFailure = (error) => ({
  type: types.GET_TRAINERS_FAILURE,
  payload: error
});

export const deleteTrainerPending = (pending) => ({
  type: types.DELETE_TRAINER_PENDING,
  payload: pending
});

export const deleteTrainerSuccess = () => ({
  type: types.DELETE_TRAINER_SUCCESS
});

export const deleteTrainerFailure = (error) => ({
  type: types.DELETE_TRAINER_FAILURE,
  payload: error
});

export const getTrainers = thunks.getTrainers;
export const deleteTrainer = thunks.deleteTrainer;
