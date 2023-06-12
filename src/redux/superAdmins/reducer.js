import {
  GET_SUPERADMIN_PENDING,
  GET_SUPERADMIN_SUCCESS,
  GET_SUPERADMIN_ERROR,
  POST_SUPERADMIN_PENDING,
  POST_SUPERADMIN_SUCCESS,
  POST_SUPERADMIN_ERROR,
  PUT_SUPERADMIN_PENDING,
  PUT_SUPERADMIN_SUCCESS,
  PUT_SUPERADMIN_ERROR
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
      const newList = state.list.map((supAdmin) => {
        if (supAdmin._id === action.payload._id) {
          return action.payload;
        }
      });
      return {
        ...state,
        list: newList,
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

    default:
      return state;
  }
};
