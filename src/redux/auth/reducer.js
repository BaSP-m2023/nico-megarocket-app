import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  GET_AUTHENTICATION_PENDING,
  GET_AUTHENTICATION_SUCCESS,
  GET_AUTHENTICATION_ERROR,
  RECOVER_PASSWORD_PENDING,
  RECOVER_PASSWORD_ERROR,
  RECOVER_PASSWORD_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  authenticate: false,
  role: null,
  email: null,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
    case LOGOUT_PENDING:
    case GET_AUTHENTICATION_PENDING:
    case SIGN_UP_PENDING:
    case RECOVER_PASSWORD_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_ERROR:
    case GET_AUTHENTICATION_ERROR:
    case LOGOUT_ERROR:
    case SIGN_UP_ERROR:
    case RECOVER_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        authenticate: true,
        role: action.payload.role
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        authenticate: true,
        role: action.payload.role
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        authenticate: false,
        role: null
      };
    }
    case GET_AUTHENTICATION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        authenticate: true,
        role: action.payload.role
      };
    }

    case RECOVER_PASSWORD_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        authenticate: false,
        role: null
      };
    }
    default:
      return state;
  }
};

export default authReducer;
