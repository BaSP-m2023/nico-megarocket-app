import {
  ADD_TRAINER,
  ADD_TRAINER_PENDING,
  ADD_TRAINER_ERROR,
  UPDATE_TRAINER,
  UPDATE_TRAINER_ERROR,
  UPDATE_TRAINER_PENDING,
  GET_TRAINERS_PENDING,
  GET_TRAINERS_SUCCESS,
  GET_TRAINERS_FAILURE,
  DELETE_TRAINER_PENDING,
  DELETE_TRAINER_SUCCESS,
  DELETE_TRAINER_FAILURE
} from './constants';

const initialState = {
  list: []
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRAINER_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }
    case ADD_TRAINER: {
      return {
        ...state,
        list: action.payload
      };
    }

    case ADD_TRAINER_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UPDATE_TRAINER_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case UPDATE_TRAINER: {
      const trainerUpdated = action.payload;
      const updatedTrainers = state.list.map((trainer) => {
        if (trainer._id === trainerUpdated._id) {
          return {
            ...trainer,
            ...trainerUpdated
          };
        }
        return trainer;
      });
      return {
        ...state,
        list: updatedTrainers
      };
    }

    case UPDATE_TRAINER_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case GET_TRAINERS_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_TRAINER_PENDING: {
      return {
        ...state,
        pending: action.payload,
        error: null
      };
    }

    case GET_TRAINERS_SUCCESS: {
      return {
        ...state,
        trainers: action.payload,
        loading: false,
        error: null
      };
    }

    case GET_TRAINERS_FAILURE:
    case DELETE_TRAINER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }

    case DELETE_TRAINER_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null
      };
    }

    default:
      return state;
  }
};

export default reducer;
