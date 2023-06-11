import { combineReducers } from 'redux';
import trainerReducer from './trainers/reducer';

const rootReducer = combineReducers({
  trainers: trainerReducer
});

export default rootReducer;
