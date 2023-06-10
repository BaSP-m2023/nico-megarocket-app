import {
  ADD_TRAINER_PENDING,
  ADD_TRAINER,
  ADD_TRAINER_ERROR,
  UPDATE_TRAINER_PENDING,
  UPDATE_TRAINER,
  UPDATE_TRAINER_ERROR
} from './constants';

export const addTrainerPending = (pending) => {
  return {
    type: ADD_TRAINER_PENDING,
    pending: pending
  };
};

export const addTrainer = (data) => {
  return {
    type: ADD_TRAINER,
    payload: data
  };
};

export const addTrainerError = () => {
  return {
    type: ADD_TRAINER_ERROR
  };
};

export const updateTrainerPending = () => {
  return {
    type: UPDATE_TRAINER_PENDING
  };
};

export const updateTrainerSuccess = (data) => {
  return {
    type: UPDATE_TRAINER,
    payload: data
  };
};

export const updateTrainerError = () => {
  return {
    type: UPDATE_TRAINER_ERROR
  };
};
