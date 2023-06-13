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
      dispatch(addSubscriptionSuccess(data.result));
    } else {
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
    dispatch(editSubscriptionPending(false));
    if (res.ok) {
      dispatch(editSubscriptionSuccess(id, data.result));
    } else {
      dispatch(editSubscriptionError(data.message));
    }
  } catch (error) {
    dispatch(editSubscriptionPending(false));
    dispatch(editSubscriptionError(error));
  }
};
