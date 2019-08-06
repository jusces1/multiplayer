import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from './reducers/index';
import {createBrowserHistory} from 'history';

import App from './containers/App';
import LoggingMiddleware from './middlewares/LoggingMiddleware';
import apiMiddleware from './middlewares/apiMiddleware.js';

const composeStoreEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createBrowserHistory();

const store = createStore(
  createRootReducer(history), // Pass history to create "router" state slice
  composeStoreEnhancers(
    applyMiddleware(
      thunk,
      apiMiddleware,
      LoggingMiddleware
    )
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);
