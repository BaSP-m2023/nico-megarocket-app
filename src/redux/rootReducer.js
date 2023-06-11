import { combineReducers } from 'redux';
import trainersReducer from './trainers/reducer';
import superAdminReducer from './superAdmins/reducer';
import memberReducer from './members/reducer';
import adminReducer from './admins/reducer';

const rootReducer = combineReducers({
  admins: adminReducer,
  trainers: trainersReducer,
  members: memberReducer,
  superAdmin: superAdminReducer
});
export default rootReducer;
