import { getSuperAdminPending, getSuperAdminSuccess, getSuperAdminError } from './actions';

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
