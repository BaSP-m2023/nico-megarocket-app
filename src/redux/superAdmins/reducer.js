import {
  GET_SUPERADMIN_PENDING,
  GET_SUPERADMIN_SUCCESS,
  GET_SUPERADMIN_ERROR,
  POST_SUPERADMIN_PENDING,
  POST_SUPERADMIN_SUCCESS,
  POST_SUPERADMIN_ERROR,
  PUT_SUPERADMIN_PENDING,
  PUT_SUPERADMIN_SUCCESS,
  PUT_SUPERADMIN_ERROR,
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
    case POST_SUPERADMIN_PENDING: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case POST_SUPERADMIN_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
        error: null
      };
    }
    case POST_SUPERADMIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case PUT_SUPERADMIN_PENDING: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case PUT_SUPERADMIN_SUCCESS: {
      const supAdminUpdated = action.payload;
      const updatedSupAdmins = state.list.map((supAdmins) => {
        if (supAdmins._id === supAdmins._id) {
          return {
            ...supAdmins,
            ...supAdminUpdated
          };
        }
        return supAdmins;
      });
      return {
        ...state,
        list: updatedSupAdmins,
        loading: false,
        error: null
      };
    }
    case PUT_SUPERADMIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
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
