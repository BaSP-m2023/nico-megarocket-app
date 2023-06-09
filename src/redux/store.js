import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import trainerReducer from './trainers/reducer';

const store = createStore(trainerReducer, applyMiddleware(thunk));

export default store;
