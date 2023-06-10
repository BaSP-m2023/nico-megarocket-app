import {
  GET_MEMBERS_PENDING,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_ERROR,
  ADD_MEMBER_SUCCESS,
  EDIT_MEMBER_SUCCESS,
  DELETE_MEMBER_PENDING,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_ERROR
} from './constants';

const INITIAL_STATE = {
  list: []
};

const memberReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MEMBERS_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_MEMBERS_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_MEMBERS_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case ADD_MEMBER_SUCCESS: {
      console.log('action ADD_MEMBER', action.payload);
      return {
        ...state,
        list: action.payload
      };
    }

    case EDIT_MEMBER_SUCCESS: {
      console.log('action EDIT_MEMBER', action.payload);
      const editMember = state.list.map((member) => {
        return member._id === action.payload._id ? { ...member, ...action.payload } : member;
      });
      return {
        ...state,
        list: [...editMember]
      };
    }

    case DELETE_MEMBER_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_MEMBER_SUCCESS: {
      const newList = state.list.filter((member) => {
        return member._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_MEMBER_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default memberReducer;
