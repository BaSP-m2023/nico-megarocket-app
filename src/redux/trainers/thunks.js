import { addTrainer, updateTrainerSuccess } from './actions';

export const createTrainer = async (dispatch, body) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`, body);
    const data = await response.json();
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
