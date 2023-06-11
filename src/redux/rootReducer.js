import { combineReducers } from 'redux';
import memberReducer from './members/reducer';
import adminReducer from './admins/reducer';

const rootReducer = combineReducers({
  admins: adminReducer,
  members: memberReducer
});
export default rootReducer;
