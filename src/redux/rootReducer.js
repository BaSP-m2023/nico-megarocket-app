import { combineReducers } from 'redux';
import trainersReducer from './trainers/reducer';
import { superAdminReducer } from './superAdmins/reducer';
import memberReducer from './members/reducer';
import adminReducer from './admins/reducer';
import subscriptionReducer from './subscriptions/reducer';
import classesReducer from './classes/reducer';
import activitiesReducer from './activities/reducer';

const rootReducer = combineReducers({
  admins: adminReducer,
  trainers: trainersReducer,
  members: memberReducer,
  superAdmin: superAdminReducer,
  subscription: subscriptionReducer,
  classes: classesReducer,
  activities: activitiesReducer
});

export default rootReducer;
