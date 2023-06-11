import {
  ADD_TRAINER,
  ADD_TRAINER_PENDING,
  ADD_TRAINER_ERROR,
  UPDATE_TRAINER,
  UPDATE_TRAINER_ERROR,
  UPDATE_TRAINER_PENDING
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

    default:
      return state;
  }
};

export default reducer;
