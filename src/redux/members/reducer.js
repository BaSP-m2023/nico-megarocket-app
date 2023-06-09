import { GET_MEMBERS, ADD_MEMBER, EDIT_MEMBER, DELETE_MEMBER } from './constants';

const INITIAL_STATE = {
  list: []
};

const memberReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MEMBERS: {
      console.log('action GET_MEMBERS', action.payload);
      return {
        ...state,
        list: action.payload
      };
    }

    case ADD_MEMBER: {
      console.log('action ADD_MEMBER', action.payload);
      return {
        ...state,
        list: action.payload
      };
    }

    case EDIT_MEMBER: {
      console.log('action EDIT_MEMBER', action.payload);
      const editMember = state.list.map((member) => {
        return member._id === action.payload._id ? { ...member, ...action.payload } : member;
      });
      return {
        ...state,
        list: [...editMember]
      };
    }

    case DELETE_MEMBER: {
      console.log('action DELETE_MEMBER', action.payload);
      const newList = state.list.filter((member) => {
        return member._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    default:
      return state;
  }
};

export default memberReducer;
