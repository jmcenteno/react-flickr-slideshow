import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import logger from '../tools/logger';
import rootReducer from './reducers';

const isProduction = process.env.NODE_ENV === 'production';

// Creating store
let middleware;

if (isProduction) {

  // In production adding only thunk middleware
  middleware = applyMiddleware(thunk);

} else {

  // In development mode beside thunk
  // logger and DevTools are added
  middleware = applyMiddleware(thunk, logger);

  // Enable DevTools if browser extension is installed
  if (window.__REDUX_DEVTOOLS_EXTENSION__) { // eslint-disable-line

    middleware = compose(
      middleware,
      window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
    );

  } else {

    middleware = compose(middleware);

  }

}

const store = createStore(
  rootReducer,
  middleware
);

export default store;
