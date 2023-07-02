import {
  ADD_TRAINER,
  ADD_TRAINER_PENDING,
  ADD_TRAINER_ERROR,
  UPDATE_TRAINER,
  UPDATE_TRAINER_ERROR,
  UPDATE_TRAINER_PENDING,
  UPDATE_TRAINER_IS_ACTIVE_PENDING,
  UPDATE_TRAINER_IS_ACTIVE,
  UPDATE_TRAINER_IS_ACTIVE_ERROR,
  GET_TRAINERS_PENDING,
  GET_TRAINERS_SUCCESS,
  GET_TRAINERS_FAILURE,
  DELETE_TRAINER_PENDING,
  DELETE_TRAINER_SUCCESS,
  DELETE_TRAINER_FAILURE
} from './constants';

const initialState = {
  list: [],
  error: '',
  formError: { error: false, message: '' }
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
        formError: action.payload
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

    case UPDATE_TRAINER_IS_ACTIVE_PENDING: {
      return {
        ...state,
        isActivePending: action.payload
      };
    }

    case UPDATE_TRAINER_IS_ACTIVE: {
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
        isActiveList: updatedTrainers
      };
    }

    case UPDATE_TRAINER_IS_ACTIVE_ERROR: {
      return {
        ...state,
        isActiveError: action.payload
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
