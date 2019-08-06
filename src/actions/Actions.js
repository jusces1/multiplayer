export const CLOSE_GAME = 'CLOSE_GAME';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';

export const LOGIN_PLAYER = 'LOGIN_PLAYER';
export const loginUser = (player) => ({type: LOGIN_PLAYER, payload: player});

export const LOG_OUT = 'LOG_OUT';
export const logout = (disconectReason) => ({type: LOG_OUT, disconectReason});

export const LOGED_IN_PLAYERS = 'LOGED_IN_PLAYERS';
export const addLogedInPlayers = (players) => ({type: LOGED_IN_PLAYERS, payload: players});


export const CREATE_GAME_REQUEST = 'CREATE_GAME_REQUEST';
export const createGameRequest = (frequency) => ({type: CREATE_GAME_REQUEST, frequency: frequency});

export const CREATE_HIT_REQUEST = 'CREATE_HIT_REQUEST';
export const createHitRequest = (gameId) => ({type: CREATE_HIT_REQUEST, gameId});

export const HANDLE_ERROR = 'HANDLE_ERROR';
export const handleError = ({status, message}) => ({type: HANDLE_ERROR, error: {status, message}});

export const PRELIMNAR_MISS = 'PRELIMNAR_MISS';
export const handlePreliminarMiss = (gameId) => ({type: PRELIMNAR_MISS, payload: {gameId, miss: Date.now()}});

export const CHANGE_LOADING = 'CHANGE_LOADING';
export const changeLoading = (loading) => ({type: CHANGE_LOADING, loading});

export const NEW_GAME = 'NEW_GAME';
export const createGame = ({frequency, startMilliseconds, id}) => ({
  type: NEW_GAME,
  payload: {frequency, startMilliseconds, id}
});

export const RECORD_HIT = 'RECORD_HIT';
export const createHit = ({gameId, miss}) => ({type: RECORD_HIT, payload: {gameId, miss}});
