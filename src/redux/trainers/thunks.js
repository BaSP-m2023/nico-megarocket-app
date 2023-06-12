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

export const getTrainers = async (dispatch) => {
  try {
    const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`);
    const data = await reponse.json();
    const listTrainers = data.data;
    if (listTrainers.length === 0) {
      dispatch(getTrainersPending(true));
    } else {
      dispatch(getTrainersPending(false));
      dispatch(getTrainersSuccess(listTrainers));
      console.log(getTrainersSuccess(listTrainers));
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
        method: 'DELETE'
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
