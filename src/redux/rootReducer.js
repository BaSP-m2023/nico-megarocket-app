import { combineReducers } from 'redux';
import trainersReducer from './trainers/reducer';
import { superAdminReducer } from './superAdmins/reducer';

import memberReducer from './members/reducer';

const rootReducer = combineReducers({
  trainers: trainersReducer,
  members: memberReducer,
  superAdmin: superAdminReducer
});
export default rootReducer;
