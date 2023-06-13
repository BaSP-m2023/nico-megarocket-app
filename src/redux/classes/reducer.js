import {
  GET_CLASSES_PENDING,
  GET_CLASSES_SUCCESS,
  GET_CLASSES_ERROR,
  DELETE_CLASSES_PENDING,
  DELETE_CLASSES_SUCCESS,
  DELETE_CLASSES_ERROR
} from './constants';

const initialState = {
  list: []
};

const classesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLASSES_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }
    case GET_CLASSES_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }
    case GET_CLASSES_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
    case DELETE_CLASSES_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }
    case DELETE_CLASSES_SUCCESS: {
      const filterClasses = state.list.filter((classes) => {
        return classes._id !== action.payload;
      });
      return {
        list: [...filterClasses]
      };
    }
    case DELETE_CLASSES_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
    default:
      return state;
  }
};

export default classesReducer;
