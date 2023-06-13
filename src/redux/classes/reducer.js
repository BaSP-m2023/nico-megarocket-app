import {
  GET_CLASSES_PENDING,
  GET_CLASSES_SUCCESS,
  GET_CLASSES_ERROR,
  DELETE_CLASSES_PENDING,
  DELETE_CLASSES_SUCCESS,
  DELETE_CLASSES_ERROR,
  ADD_CLASSES_PENDING,
  ADD_CLASSES_SUCCESS,
  ADD_CLASSES_ERROR,
  EDIT_CLASSES_PENDING,
  EDIT_CLASSES_SUCCESS,
  EDIT_CLASSES_ERROR
} from './constants';

const initialState = {
  list: [],
  error: ''
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
    case ADD_CLASSES_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }
    case ADD_CLASSES_SUCCESS: {
      return {
        ...state,
        success: [...state.list, action.payload]
      };
    }
    case ADD_CLASSES_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
    case EDIT_CLASSES_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }
    case EDIT_CLASSES_SUCCESS: {
      return {
        ...state,
        success: [state]
      };
    }
    case EDIT_CLASSES_ERROR: {
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
