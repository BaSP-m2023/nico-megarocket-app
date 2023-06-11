import * as types from './constants';
import * as thunks from './thunks';

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
