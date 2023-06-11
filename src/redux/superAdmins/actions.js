import { GET_SUPERADMIN_PENDING, GET_SUPERADMIN_SUCCESS, GET_SUPERADMIN_ERROR } from './constants';

export const getSuperAdminPending = () => {
  return {
    type: GET_SUPERADMIN_PENDING
  };
};

export const getSuperAdminSuccess = (data) => {
  return {
    type: GET_SUPERADMIN_SUCCESS,
    payload: data
  };
};

export const getSuperAdminError = (error) => {
  return {
    type: GET_SUPERADMIN_ERROR,
    payload: error
  };
};
