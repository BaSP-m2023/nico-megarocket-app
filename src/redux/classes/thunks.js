import {
  getClassPending,
  getClassSuccess,
  getClassError,
  deleteClassPending,
  deleteClassSuccess,
  deleteClassError
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
