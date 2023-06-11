import * as types from './constants';

const initialState = {
  trainers: []
};

const trainerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TRAINERS_PENDING:
      return {
        ...state,
        pending: action.payload
      };
    case types.DELETE_TRAINER_PENDING:
      return {
        ...state,
        pending: action.payload,
        error: null
      };
    case types.GET_TRAINERS_SUCCESS:
      return {
        ...state,
        trainers: action.payload,
        loading: false,
        error: null
      };
    case types.GET_TRAINERS_FAILURE:
    case types.DELETE_TRAINER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.DELETE_TRAINER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    default:
      return state;
  }
};

export default trainerReducer;
