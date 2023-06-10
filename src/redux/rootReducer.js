import { combineReducers } from 'redux';
import trainersReducer from './trainers/reducer';

const rootReducer = combineReducers({
  trainers: trainersReducer
});
export default rootReducer;
