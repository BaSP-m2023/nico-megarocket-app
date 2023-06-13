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
      dispatch(getSubscriptionSuccess(data.data));
    } else {
      dispatch(getSubscriptionPending(false));
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
      if (data) {
        dispatch(deleteSubscriptionSuccess(id));
        dispatch(deleteSubscriptionPending(false));
      } else {
        dispatch(getSubscriptionPending(false));
        dispatch(getSubscriptionSuccess(data.message));
      }
    } catch (error) {
      dispatch(deleteSubscriptionPending(false));
      dispatch(deleteSubscriptionError(error));
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
    if (res.ok) {
      dispatch(addSubscriptionPending(false));
      dispatch(addSubscriptionSuccess(data.result));
    } else {
      dispatch(addSubscriptionPending(false));
      dispatch(addSubscriptionError(data.message));
    }
  } catch (error) {
    dispatch(addSubscriptionPending(false));
    dispatch(addSubscriptionError(error));
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
    if (res.ok) {
      dispatch(editSubscriptionPending(false));
      dispatch(editSubscriptionSuccess(id, data.result));
    } else {
      dispatch(editSubscriptionPending(false));
      dispatch(editSubscriptionError(data.message));
    }
  } catch (error) {
    dispatch(editSubscriptionPending(false));
    dispatch(editSubscriptionError(error));
  }
};
