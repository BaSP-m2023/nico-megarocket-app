import { combineReducers } from 'redux';
import { superAdminReducer } from './superAdmins/reducer';

import memberReducer from './members/reducer';

const rootReducer = combineReducers({
  members: memberReducer,
  superAdmin: superAdminReducer
});
export default rootReducer;
