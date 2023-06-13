import {
  GET_ACTIVITIES_PENDING,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_ERROR,
  DELETE_ACTIVITIES_PENDING,
  DELETE_ACTIVITIES_SUCCESS,
  DELETE_ACTIVITIES_ERROR,
  ADD_ACTIVITIES_PENDING,
  ADD_ACTIVITIES_SUCCESS,
  ADD_ACTIVITIES_ERROR,
  UPDATE_ACTIVITIES_PENDING,
  UPDATE_ACTIVITIES_SUCCESS,
  UPDATE_ACTIVITIES_ERROR
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
    case ADD_ACTIVITIES_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }
    case ADD_ACTIVITIES_SUCCESS: {
      const newActivity = action.payload;
      return {
        ...state,
        list: [...state.list, newActivity]
      };
    }
    case ADD_ACTIVITIES_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
    case UPDATE_ACTIVITIES_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }
    case UPDATE_ACTIVITIES_SUCCESS: {
      const newActivity = action.payload;
      const newActivities = state.list.map((activity) =>
        activity._id === newActivity._id ? { ...activity, ...newActivity } : activity
      );
      return {
        ...state,
        list: newActivities
      };
    }
    case UPDATE_ACTIVITIES_ERROR: {
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
