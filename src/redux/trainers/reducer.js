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
        list: [...state.list, action.payload]
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
        pending: action.payload
      };
    }

    case GET_TRAINERS_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_TRAINERS_FAILURE: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_TRAINER_FAILURE: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_TRAINER_SUCCESS: {
      const newListTrainer = state.list.filter((trainer) => {
        return trainer._id !== action.payload;
      });
      return {
        list: [...newListTrainer]
      };
    }

    default:
      return state;
  }
};

export default reducer;
