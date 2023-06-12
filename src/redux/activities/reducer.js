import {
  GET_ACTIVITIES_PENDING,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_ERROR,
  DELETE_ACTIVITIES_PENDING,
  DELETE_ACTIVITIES_SUCCESS,
  DELETE_ACTIVITIES_ERROR
} from './constants';

const INITIAL_STATE = {
  list: []
};

const activityReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ACTIVITIES_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }
    case GET_ACTIVITIES_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }
    case GET_ACTIVITIES_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
    case DELETE_ACTIVITIES_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }
    case DELETE_ACTIVITIES_SUCCESS: {
      const updatedList = state.list.reduce((newList, activity) => {
        if (activity._id !== action.payload) {
          newList.push(activity);
        }
        return newList;
      }, []);
      return {
        list: [...updatedList]
      };
    }
    case DELETE_ACTIVITIES_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
    default:
      return state;
  }
};

export default activityReducer;
