import MetronomeRerducer from './MetronomeRerducer';
import WebSocketReducer from './WebSocketReducer';
import {connectRouter} from 'connected-react-router';

import {combineReducers} from 'redux';

// `combineReducers` is used to create different _slices_ of application state
// which are managed by different reducers.
export default (history) => combineReducers({
  router: connectRouter(history),
  MetronomeRerducer: MetronomeRerducer,
  WebSocketReducer: WebSocketReducer
});
