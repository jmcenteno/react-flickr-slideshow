import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'babel-polyfill';

import store from './store';
import AppContainer from './views/App';

import '../scss/app.scss';

ReactDOM.render(
  <Provider store={ store }>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
