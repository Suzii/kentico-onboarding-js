import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { App } from './containers/App.ts';
import { defaultStateValues } from './constants/defaultListItems.ts';
import { root } from './reducers/root.ts';
import { fetchItems } from './actions/fetchActions.ts';
import thunk from 'redux-thunk';

const store = createStore(
  root,
  defaultStateValues,
  applyMiddleware(thunk, logger),
);

store.dispatch(fetchItems());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
