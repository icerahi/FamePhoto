import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initialState, reducer } from './state/reducer';
import { StateProvider } from './state/StateProvider';

ReactDOM.render(
  <StateProvider reducer={reducer} initialState={initialState}>
          <App />
  </StateProvider>,
 
  document.getElementById('root')
);

 