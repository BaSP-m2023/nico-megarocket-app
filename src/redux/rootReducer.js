import { combineReducers } from 'redux';
import trainerReducer from './trainerReducer';

const rootReducer = combineReducers({
  trainers: trainerReducer
});

export default rootReducer;
