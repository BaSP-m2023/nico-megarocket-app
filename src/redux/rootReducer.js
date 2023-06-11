import { combineReducers } from 'redux';

import adminReducer from './admins/reducer';

const rootReducer = combineReducers({
  admins: adminReducer
});
export default rootReducer;
