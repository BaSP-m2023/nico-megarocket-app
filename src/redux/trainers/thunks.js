import { addTrainerPending, addTrainer, updateTrainerSuccess } from './actions';

export const createTrainer = async (dispatch, body) => {
  try {
    dispatch(addTrainerPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`, body);
    const data = await response.json();
    dispatch(addTrainerPending(false));
    dispatch(addTrainer(data));
  } catch (error) {
    console.log(error);
  }
};

export const updateTrainer = async (dispatch, id, body) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`, body);
    const data = await response.json();
    console.log(data);
    dispatch(updateTrainerSuccess(data));
  } catch (error) {
    console.log(error);
  }
};
