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
    console.error(error);
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
      console.error(error);
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
    console.error(error);
  }
};

export const updateClass = async (id, body, dispatch) => {
  try {
    dispatch(editClassPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`, body);
    const data = await response.json();
    dispatch(editClassPending(false));
    if (response.status !== 200) {
      dispatch(editClassError(data.message));
    } else {
      dispatch(editClassSuccess(body));
    }
  } catch (error) {
    dispatch(editClassPending(false));
    console.error(error);
  }
};
