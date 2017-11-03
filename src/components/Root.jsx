import React from 'react';
import { Provider } from 'react-redux';
import { App } from '../App.jsx';
import { createApplicationStore } from '../utils/createStore';

export const Root = () => {
  return (
    <Provider store={createApplicationStore()}>
      <App />
    </Provider>
  );
};
