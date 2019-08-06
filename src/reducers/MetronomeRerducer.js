import {
  NEW_GAME, CLOSE_GAME, RECORD_HIT, LOGIN_PLAYER, CHANGE_LOADING, HANDLE_ERROR, PRELIMNAR_MISS,
  LOGED_IN_PLAYERS, LOG_OUT
} from '../actions/Actions';
import {adjustBy} from '../PureFunctions';

const initialState = {
  loggedIn: false,
  player: {},
  loading: false,
  logedInPlayers: [],
  error: {
    status: false,
    message: ''
  },
  disconectReason: '',
  preliminarMiss: 0,
  games: [],
  closedGames: []
};

const calculateMiss = (startMilliseconds, nowMilliseconds, frequency) => {
  const remainder = (nowMilliseconds - startMilliseconds) % frequency;
  if (remainder >= frequency / 2) {
    return frequency - remainder;
  } else {
    return remainder;
  }
};

export const totalMiss = (games) =>
  games.reduce(
    (acc, game) => acc + game.hits.reduce((hitAcc, hit) => hitAcc + hit.miss, 0),
    0
  );

export const averageMissPercentage = (games) => average(games.map(averageGameMissPercentage));

const averageGameMissPercentage = (game) => average(missPercentages(game));

const sum = (elems) => elems.reduce((acc, e) => acc + e, 0);
const average = (elems) => {
  if (elems.length === 0) {
    return 0;
  } else {
    return sum(elems) / elems.length;
  }
};

const missPercentages = (game) => game.hits.map((hit) => (hit.miss / game.frequency) * 100);

export const openGames = (games) => games.filter((game) => game.open);

const recordPreliminarHit = (game, millisNow) =>
  ({...game,
    preliminar: calculateMiss(game.startMilliseconds, millisNow, game.frequency)
  });
const recordHit = (game, millisNow) =>
  ({...game,
    hits: game.hits.concat([{
      miss: millisNow
    }])
  });

export default (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_PLAYER: {
    const player = action.payload;
    return {...state, loggedIn: true, player: player, disconectReason: ''};
  }
  case LOG_OUT: {
    return {...state, loggedIn: false, player: '', disconectReason: action.disconectReason};
  }
  case LOGED_IN_PLAYERS: {
    return {...state, logedInPlayers: action.payload};
  }
  case NEW_GAME: {
    const {frequency, startMilliseconds, id} = action.payload;
    const newGame = {
      id: id,
      hits: [],
      open: true,
      frequency: frequency,
      preliminar: 0,
      startMilliseconds: startMilliseconds
    };
    return {...state, games: state.games.concat(newGame)};
  }
  case CLOSE_GAME: {
    const gameId = action.payload;
    const game = state.games.find( (x) => x.id === gameId);
    const newGames = adjustBy(
      (game) => game.id === gameId,
      (game) => ({...game, open: false}),
      state.games
    );
    return {...state, games: newGames, closedGames: state.closedGames.concat(game)};
  }

  case RECORD_HIT: {
    const {gameId, miss} = action.payload;
    const newGames = adjustBy(
      (game) => game.id === gameId,
      (game) => recordHit(game, miss),
      state.games,
    );

    return {...state, games: newGames};
  }
  case PRELIMNAR_MISS: {
    const {gameId, miss} = action.payload;
    const newGames = adjustBy(
      (game) => game.id === gameId,
      (game) => recordPreliminarHit(game, miss),
      state.games,
    );
    return {...state, games: newGames};
  }
  case CHANGE_LOADING: {
    const loading = action.loading;
    return {
      ...state,
      loading: loading
    };
  }
  case HANDLE_ERROR: {
    return {
      ...state,
      error: action.error
    };
  }
  default:
    return state;
  }
};
