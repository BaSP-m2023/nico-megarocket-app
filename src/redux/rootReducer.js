import { combineReducers } from 'redux';

import memberReducer from './members/reducer';

const rootReducer = combineReducers({
  members: memberReducer
});
export default rootReducer;
