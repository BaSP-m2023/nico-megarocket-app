import * as types from './constants';
import * as thunks from './thunks';

export const getTrainersRequest = () => ({
  type: types.GET_TRAINERS_REQUEST
});

export const getTrainersSuccess = (trainers) => ({
  type: types.GET_TRAINERS_SUCCESS,
  payload: trainers
});

export const getTrainersFailure = (error) => ({
  type: types.GET_TRAINERS_FAILURE,
  payload: error
});

export const deleteTrainerRequest = () => ({
  type: types.DELETE_TRAINER_REQUEST
});

export const deleteTrainerSuccess = () => ({
  type: types.DELETE_TRAINER_SUCCESS
});

export const deleteTrainerFailure = (error) => ({
  type: types.DELETE_TRAINER_FAILURE,
  payload: error
});

export const getTrainers = thunks.fetchTrainers;
export const deleteTrainer = thunks.deleteTrainer;
