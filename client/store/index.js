import { combineReducers } from 'redux';
import auth from './auth';

const appReducer = combineReducers({
  auth: auth,
});

export default appReducer;
