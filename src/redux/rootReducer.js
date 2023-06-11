import { combineReducers } from 'redux';
import trainersReducer from './trainers/reducer';
import memberReducer from './members/reducer';

const rootReducer = combineReducers({
  trainers: trainersReducer,
  members: memberReducer
});
export default rootReducer;
