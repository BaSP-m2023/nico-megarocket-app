import {
  GET_SUBSCRIPTION_SUCCESS,
  GET_SUBSCRIPTION_PENDING,
  GET_SUBSCRIPTION_ERROR,
  PUT_SUBSCRIPTION_SUCCESS,
  PUT_SUBSCRIPTION_PENDING,
  PUT_SUBSCRIPTION_ERROR,
  POST_SUBSCRIPTION_SUCCESS,
  POST_SUBSCRIPTION_PENDING,
  POST_SUBSCRIPTION_ERROR,
  DELETE_SUBSCRIPTION_SUCCESS,
  DELETE_SUBSCRIPTION_PENDING,
  DELETE_SUBSCRIPTION_ERROR
} from './constants';

const subscriptionReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SUBSCRIPTION_SUCCESS: {
      return {
        ...state,
        data: action.payload
      };
    }

    case GET_SUBSCRIPTION_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_SUBSCRIPTION_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case PUT_SUBSCRIPTION_SUCCESS: {
      return {
        ...state,
        data: action.payload
      };
    }

    case PUT_SUBSCRIPTION_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case PUT_SUBSCRIPTION_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case POST_SUBSCRIPTION_SUCCESS: {
      return {
        ...state,
        data: action.payload
      };
    }

    case POST_SUBSCRIPTION_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case POST_SUBSCRIPTION_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_SUBSCRIPTION_SUCCESS: {
      const newData = state.filter((subs) => {
        return subs._id !== action.payload;
      });
      return {
        data: [...newData]
      };
    }

    case DELETE_SUBSCRIPTION_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_SUBSCRIPTION_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default subscriptionReducer;
