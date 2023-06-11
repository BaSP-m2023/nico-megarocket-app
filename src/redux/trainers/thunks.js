import {
  addTrainerPending,
  addTrainer,
  addTrainerError,
  updateTrainerPending,
  updateTrainerSuccess,
  updateTrainerError
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
