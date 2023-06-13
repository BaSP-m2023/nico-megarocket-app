import {
  getSubscriptionSuccess,
  getSubscriptionPending,
  getSubscriptionError,
  deleteSubscriptionSuccess,
  deleteSubscriptionPending,
  deleteSubscriptionError
} from './actions';

export const getSuscription = async (dispatch) => {
  try {
    dispatch(getSubscriptionPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription`);
    const data = await response.json();
    dispatch(getSubscriptionPending(false));
    if (data.data.length !== 0) {
      dispatch(getSubscriptionSuccess(data.data));
    } else {
      dispatch(getSubscriptionSuccess(data.message));
    }
  } catch (error) {
    dispatch(getSubscriptionPending(false));
    dispatch(getSubscriptionError(true));
  }
};

export const deleteSubscription = (id) => {
  return async (dispatch) => {
    try {
      dispatch(deleteSubscriptionPending(true));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      dispatch(deleteSubscriptionPending(false));
      if (data) {
        dispatch(deleteSubscriptionSuccess(id));
      } else {
        dispatch(getSubscriptionSuccess(data.message));
      }
    } catch (error) {
      dispatch(deleteSubscriptionPending(false));
      dispatch(deleteSubscriptionError(error));
    }
  };
};
