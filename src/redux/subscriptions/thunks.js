import {
  getSubscriptionSuccess,
  getSubscriptionPending,
  getSubscriptionError,
  deleteSubscriptionSuccess,
  deleteSubscriptionPending,
  deleteSubscriptionError,
  addSubscriptionPending,
  addSubscriptionSuccess,
  addSubscriptionError,
  editSubscriptionPending,
  editSubscriptionSuccess,
  editSubscriptionError
} from './actions';

export const getSuscription = async (dispatch) => {
  try {
    dispatch(getSubscriptionPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription`);
    const data = await response.json();
    if (response.ok) {
      dispatch(getSubscriptionPending(false));
      return dispatch(getSubscriptionSuccess(data.data));
    } else {
      return dispatch(getSubscriptionSuccess(data.message));
    }
  } catch (error) {
    dispatch(getSubscriptionPending(false));
    return dispatch(getSubscriptionError(true));
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
        return dispatch(deleteSubscriptionSuccess(id));
      }
      return dispatch(getSubscriptionSuccess(data.message));
    } catch (error) {
      dispatch(deleteSubscriptionPending(false));
      return dispatch(deleteSubscriptionError(error));
    }
  };
};

export const addSubscriptions = async (dispatch, newSub) => {
  try {
    dispatch(addSubscriptionPending(true));
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newSub)
    });
    const data = await res.json();
    dispatch(addSubscriptionPending(false));
    if (res.ok) {
      return dispatch(addSubscriptionSuccess(data.result));
    }
    return dispatch(addSubscriptionError(data.message));
  } catch (error) {
    dispatch(addSubscriptionPending(false));
    return dispatch(addSubscriptionError(error));
  }
};

export const updateSubscriptions = async (dispatch, id, editSub) => {
  try {
    dispatch(editSubscriptionPending(true));
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(editSub)
    });
    const data = await res.json();
    dispatch(editSubscriptionPending(false));
    if (res.ok) {
      return dispatch(editSubscriptionSuccess(id, data.result));
    }
    return dispatch(editSubscriptionError(data.message));
  } catch (error) {
    dispatch(editSubscriptionPending(false));
    return dispatch(editSubscriptionError(error));
  }
};
