import {
  createGame, createHit, changeLoading, handleError, handlePreliminarMiss,
  loginUser, addLogedInPlayers, logout,
  CREATE_GAME_REQUEST, CREATE_HIT_REQUEST, LOGIN_REQUEST
} from '../actions/Actions';
import {connect as connectWebSocket} from '../WebSocket';

const api = 'http://localhost:8081/';

export const newGame = (frequency, fetch = window.fetch) => {
  return async (dispatch) => {
    dispatch(handleError({status: false, message: ''}));
    try {
      dispatch(changeLoading(true));
      const response = await fetch(api + 'games/', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          type: 'metronome',
          frequency: frequency
        })
      });
      if (response.ok) {
        const result = await response.json();
        dispatch(createGame({frequency: result.frequency, startMilliseconds: result.startTimeMillis, id: result.id}));
      } else {
        const result = await response.json();
        dispatch(handleError({status: true, message: result.error}));
      }
    } catch (error) {
      return error;
    }
    dispatch(changeLoading(false));
  };
};

export const recordHit = (payload, fetch = window.fetch) => {
  return async (dispatch) => {
    dispatch(handlePreliminarMiss(payload.gameId));
    dispatch(handleError({status: false, message: ''}));
    dispatch(changeLoading(true));
    const response = await fetch(api + 'games/' + payload.gameId + '/moves', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    });
    if (response.ok) {
      const result = await response.json();
      console.log(result.tries[result.tries.length - 1]);
      console.log(payload.gameId);
      dispatch(createHit({gameId: payload.gameId, miss: result.tries[result.tries.length - 1].miss}));
    } else {
      const result = await response.json();
      dispatch(handleError({status: true, message: result.error}));
    }
    dispatch(changeLoading(false));
  };
};

export let webSocketConnection = null;
const initiateConnection = (name, store) => {
  // Every asynchronous process initiation is accompanied by a notification
  store.dispatch({type: 'CONNECTING', payload: name});

  webSocketConnection = connectWebSocket({
    onOpen: () => {
      store.dispatch({type: 'CONNECTED'});
    },
    onClose: ({reason}) => {
      let reas = '';
      if (reason === 'player-name-taken') {
        reas = 'Name is already taken';
      }
      store.dispatch(logout(reas));
      store.dispatch({type: 'DISCONNECTED', payload: {reason}});
    },
    onMessage: ({eventName, payload}) => {
      if (eventName === 'connection:accepted') {
        store.dispatch(loginUser({playerId: payload.playerId, playerName: name}));
      } else if (eventName === 'online-players') {
        store.dispatch(addLogedInPlayers(payload));
      }
    },
    parameters: {playerName: name}
  });
};
const metronomServerMiddleware = (store) => (next) => {
  return (action) => {
    if (action) {
      if (action.type === CREATE_GAME_REQUEST) {
        store.dispatch(newGame(action.frequency));
      } else if (action.type === CREATE_HIT_REQUEST) {
        store.dispatch(recordHit(action.gameId));
      } else if (action.type === LOGIN_REQUEST) {
        store.dispatch(initiateConnection(action.payload, store));
      }
      return next(action);
    }
  };
};

export default metronomServerMiddleware;
