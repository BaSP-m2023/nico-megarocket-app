import { combineReducers } from 'redux';
import trainersReducer from './trainers/reducer';
import { superAdminReducer } from './superAdmins/reducer';
import memberReducer from './members/reducer';
import adminReducer from './admins/reducer';
import classesReducer from './classes/reducer';

const rootReducer = combineReducers({
  admins: adminReducer,
  trainers: trainersReducer,
  members: memberReducer,
  superAdmin: superAdminReducer,
  classes: classesReducer
});
export default rootReducer;
