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
    if (response.status === 200) {
      dispatch(getClassPending(false));
      dispatch(getClassSuccess(data.data));
    } else {
      dispatch(getClassPending(false));
      dispatch(getClassError(data.message));
    }
  } catch (error) {
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
      if (response.status === 200) {
        dispatch(deleteClassPending(false));
        dispatch(deleteClassSuccess(id));
      } else {
        dispatch(deleteClassPending(false));
        dispatch(deleteClassError(data.message));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const createClass = async (body, dispatch) => {
  try {
    dispatch(addClassPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class`, body);
    const data = await response.json();
    if (response.status !== 200) {
      dispatch(addClassPending(false));
      dispatch(addClassError(data.error));
    } else {
      dispatch(addClassPending(false));
      dispatch(addClassSuccess(body));
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateClass = async (id, body, dispatch) => {
  try {
    dispatch(editClassPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`, body);
    const data = await response.json();
    if (response.status !== 200) {
      dispatch(editClassPending(false));
      dispatch(editClassError(data.message));
    } else {
      dispatch(editClassPending(false));
      dispatch(editClassSuccess(body));
    }
  } catch (error) {
    console.error(error);
  }
};
