import { combineReducers } from 'redux';
import { superAdminReducer } from './superAdmins/reducer';

const rootReducer = combineReducers({
  superAdmin: superAdminReducer
});
export default rootReducer;
