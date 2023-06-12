import {
  getSuperAdminPending,
  getSuperAdminSuccess,
  getSuperAdminError,
  deleteSuperAdminPending,
  deleteSuperAdminSuccess,
  deleteSuperAdminError
} from './actions';

export const getSuperAdmins = async (dispatch) => {
  try {
    dispatch(getSuperAdminPending());
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admin`);
    const data = await response.json();
    dispatch(getSuperAdminSuccess(data.data));
  } catch (error) {
    dispatch(getSuperAdminError(error));
  }
};

export const superAdminDelete = (superAdminID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteSuperAdminPending(true));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/super-admin/${superAdminID}`,
        {
          method: 'DELETE'
        }
      );
      if (response.ok) {
        dispatch(deleteSuperAdminPending(false));
        dispatch(deleteSuperAdminSuccess(superAdminID));
      }
    } catch (error) {
      dispatch(deleteSuperAdminError(error));
    }
  };
};
