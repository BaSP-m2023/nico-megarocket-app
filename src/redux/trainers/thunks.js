import {
  addTrainerPending,
  addTrainer,
  addTrainerError,
  updateTrainerPending,
  updateTrainerSuccess,
  updateTrainerError
} from './actions';
import * as actions from './actions';

export const createTrainer = async (dispatch, body) => {
  try {
    dispatch(addTrainerPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`, body);
    const data = await response.json();
    dispatch(addTrainerPending(false));
    dispatch(addTrainer(data));
  } catch (error) {
    dispatch(addTrainerPending(false));
    dispatch(addTrainerError(true));
  }
};

export const updateTrainer = async (dispatch, id, body) => {
  try {
    dispatch(updateTrainerPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`, body);
    const data = await response.json();
    dispatch(updateTrainerPending(false));
    dispatch(updateTrainerSuccess(data));
  } catch (error) {
    dispatch(updateTrainerPending(false));
    dispatch(updateTrainerError(true));
  }
};

export const getTrainers = () => {
  return async (dispatch) => {
    dispatch(actions.getTrainersPending());

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers`);
      const data = await response.json();

      if (response.ok) {
        dispatch(actions.getTrainersSuccess(data.trainers));
      } else {
        dispatch(actions.getTrainersFailure(data.error));
      }
    } catch (error) {
      dispatch(actions.getTrainersFailure(error.message));
    }
  };
};

export const deleteTrainer = (id) => {
  return async (dispatch) => {
    dispatch(actions.deleteTrainerPending());

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();

      if (response.ok) {
        dispatch(actions.deleteTrainerSuccess());
        dispatch(getTrainers());
      } else {
        dispatch(actions.deleteTrainerFailure(data.error));
      }
    } catch (error) {
      dispatch(actions.deleteTrainerFailure(error.message));
    }
  };
};
