import {
  GET_MEMBERS_PENDING,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_ERROR,
  GET_MEMBER_BY_ID_PENDING,
  GET_MEMBER_BY_ID_SUCCESS,
  GET_MEMBER_BY_ID_ERROR,
  ADD_MEMBER_PENDING,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_ERROR,
  EDIT_MEMBER_PENDING,
  EDIT_MEMBER_IS_ACTIVE_PENDING,
  EDIT_MEMBER_IS_ACTIVE_SUCCESS,
  EDIT_MEMBER_IS_ACTIVE_ERROR,
  EDIT_MEMBER_SUCCESS,
  EDIT_MEMBER_ERROR,
  DELETE_MEMBER_PENDING,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_ERROR
} from './constants';

const INITIAL_STATE = {
  list: [],
  errorForm: { error: false, message: '' },
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

    case GET_MEMBER_BY_ID_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_MEMBER_BY_ID_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_MEMBER_BY_ID_ERROR: {
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
        list: [...state.list, action.payload]
      };
    }

    case ADD_MEMBER_ERROR: {
      return {
        ...state,
        errorForm: action.payload
      };
    }

    case EDIT_MEMBER_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case EDIT_MEMBER_SUCCESS: {
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

    case EDIT_MEMBER_IS_ACTIVE_PENDING: {
      return {
        ...state,
        isActivePending: action.payload
      };
    }

    case EDIT_MEMBER_IS_ACTIVE_SUCCESS: {
      const editMember = state.list.map((member) => {
        return member._id === action.payload._id ? { ...member, ...action.payload } : member;
      });
      return {
        ...state,
        list: [...editMember]
      };
    }

    case EDIT_MEMBER_IS_ACTIVE_ERROR: {
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
