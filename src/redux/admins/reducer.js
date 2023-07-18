import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  ADD_ADMIN_PENDING,
  ADD_ADMIN_SUCCESS,
  ADD_ADMIN_ERROR,
  EDIT_ADMIN_PENDING,
  EDIT_ADMIN_SUCCESS,
  EDIT_ADMIN_ERROR,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_ERROR
} from './constants';

const INITIAL_STATE = {
  list: []
};

const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ADMINS_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_ADMINS_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_ADMINS_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case ADD_ADMIN_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case ADD_ADMIN_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case ADD_ADMIN_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case EDIT_ADMIN_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case EDIT_ADMIN_SUCCESS: {
      const editedAdmins = state.list.map((admin) => {
        return admin._id === action.payload._id ? { ...admin, ...action.payload } : admin;
      });
      return {
        ...state,
        list: [...editedAdmins]
      };
    }

    case EDIT_ADMIN_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_ADMIN_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_ADMIN_SUCCESS: {
      const newList = state.list.filter((admin) => {
        return admin._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_ADMIN_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default adminReducer;
