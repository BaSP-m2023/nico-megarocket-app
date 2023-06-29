import {
  getClassPending,
  getClassSuccess,
  getClassError,
  deleteClassPending,
  deleteClassSuccess,
  deleteClassError,
  addClassPending,
  addClassSuccess,
  addClassError,
  editClassPending,
  editClassSuccess,
  editClassError
} from './actions';

export const getClasses = async (dispatch) => {
  try {
    dispatch(getClassPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class`);
    const data = await response.json();
    dispatch(getClassPending(false));
    if (response.status === 200) {
      dispatch(getClassSuccess(data.data));
    } else {
      dispatch(getClassError(data.message));
    }
  } catch (error) {
    dispatch(getClassPending(false));
  }
};

export const deleteClass = (id) => {
  return async (dispatch) => {
    try {
      dispatch(deleteClassPending(true));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      dispatch(deleteClassPending(false));
      if (response.status === 200) {
        dispatch(deleteClassSuccess(id));
      } else {
        dispatch(deleteClassError(data.message));
      }
    } catch (error) {
      dispatch(deleteClassPending(false));
    }
  };
};

export const createClass = async (body, dispatch) => {
  try {
    dispatch(addClassPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class`, body);
    const data = await response.json();
    dispatch(addClassPending(false));
    if (response.status !== 200) {
      dispatch(addClassError(data.error));
    } else {
      dispatch(addClassSuccess(body));
    }
  } catch (error) {
    dispatch(addClassPending(false));
  }
};

export const updateClass = (id, body) => {
  return async (dispatch) => {
    try {
      dispatch(editClassPending(true));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      dispatch(editClassPending(false));
      if (response.status !== 200) {
        return dispatch(editClassError(data.message));
      } else {
        return dispatch(editClassSuccess(body));
      }
    } catch (error) {
      return dispatch(editClassPending(false));
    }
  };
};
