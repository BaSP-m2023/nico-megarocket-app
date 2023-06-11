import {
  getSuperAdminPending,
  getSuperAdminSuccess,
  getSuperAdminError,
  postSuperAdminPending,
  postSuperAdminSuccess,
  postSuperAdminError
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

export const addSuperAdmin = async (dispatch, supAdminData) => {
  try {
    dispatch(postSuperAdminPending());
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(supAdminData)
    });
    if (!response.ok) {
      throw new Error(data.message);
    }
    const data = await response.json();
    dispatch(postSuperAdminSuccess(data.result));
  } catch (error) {
    dispatch(postSuperAdminError(error.message));
  }
};
