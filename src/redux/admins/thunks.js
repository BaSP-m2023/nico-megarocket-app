import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  deleteAdminPending,
  deleteAdminSuccess,
  deleteAdminError
} from './actions';

export const getAllAdmins = async (dispatch) => {
  try {
    dispatch(getAdminsPending(true));
    const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/admin`);
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/${adminID}`, {
        method: 'DELETE'
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
