import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import { appReducer } from '../reducers/app';
import { createLogger } from 'redux-logger';
import { getDefaultList } from './getDefaultList';

const logger = createLogger({});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  appReducer,
  { list: getDefaultList() },
  composeEnhancers(applyMiddleware(logger))
);

