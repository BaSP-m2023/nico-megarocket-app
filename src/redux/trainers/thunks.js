import * as actions from './actions';

export const getTrainers = () => {
  return async (dispatch) => {
    dispatch(actions.getTrainersRequest());

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
    dispatch(actions.deleteTrainerRequest());

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
