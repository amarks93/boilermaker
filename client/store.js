import { createStore, applyMiddleware } from 'redux';
import appReducer from './store/index.js';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const store = createStore(
  appReducer,
  applyMiddleware(thunkMiddleware, loggingMiddleware)
);

export default store;
