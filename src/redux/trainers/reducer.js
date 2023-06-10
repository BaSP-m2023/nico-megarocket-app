import { ADD_TRAINER, UPDATE_TRAINER } from './constants';

const initialState = {
  list: []
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRAINER: {
      return {
        ...state,
        list: action.payload
      };
    }

    case UPDATE_TRAINER:
      {
        const { _id, firstName, lastName, dni, phone, city, salary } = action.payload;
        const trainerFound = state.list.find((trainer) => trainer.id === _id);
        if (trainerFound) {
          trainerFound.firstName = firstName;
          trainerFound.lastName = lastName;
          trainerFound.dni = dni;
          trainerFound.phone = phone;
          trainerFound.city = city;
          trainerFound.salary = salary;
        }
      }
      break;

    default:
      return state;
  }
};

export default reducer;
