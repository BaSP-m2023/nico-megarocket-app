import {
  GET_MEMBERS_PENDING,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_ERROR,
  ADD_MEMBER_PENDING,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_ERROR,
  EDIT_MEMBER_PENDING,
  EDIT_MEMBER_SUCCESS,
  EDIT_MEMBER_ERROR,
  DELETE_MEMBER_PENDING,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_ERROR
} from './constants';

const INITIAL_STATE = {
  list: [],
  error: ''
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

    case ADD_MEMBER_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case ADD_MEMBER_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case ADD_MEMBER_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case EDIT_MEMBER_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case EDIT_MEMBER_SUCCESS: {
      console.log(action.payload);
      const editMember = state.list.map((member) => {
        return member._id === action.payload._id ? { ...member, ...action.payload } : member;
      });
      return {
        ...state,
        list: [...editMember]
      };
    }

    case EDIT_MEMBER_ERROR: {
      return {
        ...state,
        error: action.payload
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
