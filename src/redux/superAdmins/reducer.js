import { GET_SUPERADMIN_PENDING, GET_SUPERADMIN_SUCCESS, GET_SUPERADMIN_ERROR } from './constants';

const INITIAL_STATE = {
  list: [],
  loading: false,
  error: null
};

export const superAdminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUPERADMIN_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_SUPERADMIN_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
        error: null
      };
    case GET_SUPERADMIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
