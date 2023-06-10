import { ADD_TRAINER, ADD_TRAINER_PENDING, UPDATE_TRAINER } from './constants';

const initialState = {
  list: [
    {
      _id: '64847b7de11f590534914333',
      firstName: 'John',
      lastName: 'Doe',
      dni: '123456789',
      phone: '123-456-7890',
      email: 'johndoe@example.com',
      city: 'New York',
      salary: 50000
    }
  ]
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRAINER_PENDING: {
      console.log(action.payload);
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

    case UPDATE_TRAINER: {
      const trainerUpdated = action.payload;
      console.log(state);
      console.log(trainerUpdated._id);
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

    default:
      return state;
  }
};

export default reducer;
