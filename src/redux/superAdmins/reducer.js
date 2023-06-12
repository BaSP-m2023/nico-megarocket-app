import {
  GET_SUPERADMIN_PENDING,
  GET_SUPERADMIN_SUCCESS,
  GET_SUPERADMIN_ERROR,
  ADD_SUPERADMIN_SUCCESS,
  EDIT_SUPERADMIN_SUCCESS,
  DELETE_SUPERADMIN_PENDING,
  DELETE_SUPERADMIN_SUCCESS,
  DELETE_SUPERADMIN_ERROR
} from './constants';

const INITIAL_STATE = {
  list: [],
  loading: false,
  error: null
};

export const superAdminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUPERADMIN_PENDING: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case GET_SUPERADMIN_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        loading: false,
        error: null
      };
    }

    case GET_SUPERADMIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }

    case ADD_SUPERADMIN_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case EDIT_SUPERADMIN_SUCCESS: {
      const editSuperAdmin = state.list.map((superAdmin) => {
        return superAdmin._id === action.payload._id
          ? { ...superAdmin, ...action.payload }
          : superAdmin;
      });
      return {
        ...state,
        list: [...editSuperAdmin]
      };
    }

    case DELETE_SUPERADMIN_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_SUPERADMIN_SUCCESS: {
      const newList = state.list.filter((superAdmin) => {
        return superAdmin._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_SUPERADMIN_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default superAdminReducer;
