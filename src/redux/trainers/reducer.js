import * as types from './constants';

const initialState = {
  trainers: [],
  loading: false,
  error: null
};

const trainerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TRAINERS_REQUEST:
    case types.DELETE_TRAINER_REQUEST:
      return {
        ...state,
        loading: true,
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
