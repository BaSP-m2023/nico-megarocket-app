import {
  addTrainerPending,
  addTrainer,
  addTrainerError,
  updateTrainerPending,
  updateTrainerSuccess,
  updateTrainerError,
  getTrainersPending,
  getTrainersSuccess,
  getTrainersFailure,
  deleteTrainerPending,
  deleteTrainerSuccess,
  deleteTrainerFailure
} from './actions';

export const createTrainer = (body) => {
  return async (dispatch) => {
    try {
      dispatch(addTrainerPending(true));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`, body);
      dispatch(addTrainerPending(false));
      const data = await response.json();
      if (response.ok) {
        dispatch(addTrainerError({ error: false, message: '' }));
        return dispatch(addTrainer(data));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(addTrainerPending(false));
      return dispatch(addTrainerError({ error: true, message: error.message }));
    }
  };
};

const token = sessionStorage.getItem('token');

export const updateTrainer = (id, body) => {
  return async (dispatch) => {
    try {
      dispatch(updateTrainerPending(true));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`, body);
      const data = await response.json();
      dispatch(updateTrainerPending(false));
      return dispatch(updateTrainerSuccess(data));
    } catch (error) {
      dispatch(updateTrainerPending(false));
      return dispatch(updateTrainerError(true));
    }
  };
};

export const getTrainers = async (dispatch) => {
  try {
    const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`, {
      method: 'GET',
      headers: { token: token }
    });
    const data = await reponse.json();
    const listTrainers = data.data;
    if (listTrainers.length === 0) {
      dispatch(getTrainersPending(true));
    } else {
      dispatch(getTrainersPending(false));
      dispatch(getTrainersSuccess(listTrainers));
    }
  } catch (error) {
    dispatch(getTrainersPending(false));
    dispatch(getTrainersFailure(true));
  }
};

export const deleteTrainer = (id) => {
  return async (dispatch) => {
    try {
      dispatch(deleteTrainerPending(true));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`, {
        method: 'DELETE',
        headers: { token: token }
      });
      if (response.ok) {
        dispatch(deleteTrainerPending(false));
        dispatch(deleteTrainerSuccess(id));
      }
    } catch (error) {
      dispatch(deleteTrainerFailure(error));
    }
  };
};
