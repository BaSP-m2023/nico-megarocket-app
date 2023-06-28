import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  deleteAdminPending,
  deleteAdminSuccess,
  deleteAdminError,
  addAdminPending,
  addAdminSuccess,
  addAdminError,
  editAdminPending,
  editAdminSuccess,
  editAdminError
} from './actions';
const token = sessionStorage.getItem('token');

export const getAllAdmins = async (dispatch) => {
  try {
    dispatch(getAdminsPending(true));
    const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
      method: 'GET',
      headers: { token: token }
    });
    const data = await reponse.json();
    const adminsList = data.data;
    dispatch(getAdminsPending(false));
    dispatch(getAdminsSuccess(adminsList));
  } catch (error) {
    dispatch(getAdminsPending(false));
    dispatch(getAdminsError(true));
  }
};

export const adminDelete = (adminID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteAdminPending(true));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${adminID}`, {
        method: 'DELETE',
        headers: { token: token }
      });
      if (response.ok) {
        dispatch(deleteAdminPending(false));
        dispatch(deleteAdminSuccess(adminID));
      }
    } catch (error) {
      dispatch(deleteAdminError(error));
    }
  };
};

export const createAdmin = async (dispatch, adminData) => {
  try {
    dispatch(addAdminPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token
      },
      body: JSON.stringify(adminData)
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(addAdminPending(false));
      throw new Error(data.message);
    }
    dispatch(addAdminSuccess(data.result));
  } catch (error) {
    dispatch(addAdminPending(false));
    dispatch(addAdminError(error.message));
  }
};

export const updateAdmin = async (dispatch, id, adminData) => {
  try {
    dispatch(editAdminPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: token
      },
      body: JSON.stringify(adminData)
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(editAdminPending(false));
      throw new Error(data.message);
    }

    dispatch(editAdminSuccess(data));
  } catch (error) {
    dispatch(editAdminPending(false));
    dispatch(editAdminError(error.message));
  }
};
