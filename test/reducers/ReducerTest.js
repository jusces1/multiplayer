import reducer, {
  totalMiss,
  averageMissPercentage,
  openGames
} from '../../src/reducers/MetronomeRerducer';

import {
  LOGIN_PLAYER,
  NEW_GAME,
  CLOSE_GAME,
  RECORD_HIT
} from '../../src/actions/Actions';

describe('Reducer', () => {
  describe('totalMiss', () => {
    it('is 0 when no games', () => {
      expect(totalMiss([])).to.eq(0);
    });

    it('sums miss of all games', () => {
      expect(totalMiss([
        {hits: [{miss: 3}, {miss: 5}]},
        {hits: [{miss: 2}]}
      ])).to.eq(10);
    });
  });

  describe('averageMissPercentage', () => {
    it('is 0 when no games', () => {
      expect(averageMissPercentage([])).to.eq(0);
    });

    it('averages misses of all games', () => {
      expect(averageMissPercentage([
        {hits: [{miss: 3}, {miss: 6}], frequency: 10},
        {hits: [{miss: 1}], frequency: 2}
      ])).to.eq(47.5);
    });
  });

  describe('openGames', () => {
    it('selects only open games', () => {
      expect(openGames([{id: 1, open: false}, {id: 2, open: true}]))
        .to.deep.eq([{id: 2, open: true}]);
    });
  });

  describe('reducer', () => {
    it('returns initial state upon unknown action', () => {
      expect(reducer(undefined, {type: 'unknown'}))
        .to.deep.include({
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
          games: []
        });
    });

    it('changes state to login upon LOGIN_PLAYER', () => {
      expect(reducer(undefined, {type: LOGIN_PLAYER, payload: 'name'}))
        .to.deep.include({loggedIn: true, player: {name: 'name'}});
    });

    it('adds new game upon NEW_GAME', () => {
      expect(reducer(undefined, {type: NEW_GAME, payload: {frequency: 10, startMilliseconds: 1, id: 0}}))
        .to.deep.include({games: [{
          id: 0,
          hits: [],
          open: true,
          frequency: 10,
          preliminar: 0,
          startMilliseconds: 1
        }]});
    });

    it('changes game to not open upon CLOSE_GAME', () => {
      const initialState = {
        loggedIn: true,
        name: 'name',
        games: [{
          id: 0,
          hits: [],
          open: true,
          frequency: 10,
          startMilliseconds: 1
        }]
      };

      expect(reducer(initialState, {type: CLOSE_GAME, payload: 0}))
        .to.deep.include({
          games: [{
            id: 0,
            hits: [],
            open: false,
            frequency: 10,
            startMilliseconds: 1
          }]
        });
    });

    it('records hit upon RECORD_HIT', () => {
      const initialState = {
        loggedIn: true,
        name: 'name',
        games: [{
          id: 0,
          hits: [],
          open: true,
          frequency: 10,
          startMilliseconds: 1
        }]
      };

      expect(reducer(initialState, {type: RECORD_HIT, payload: {gameId: 0, miss: 8}}))
        .to.deep.include({
          games: [{
            id: 0,
            hits: [{miss: 8}],
            open: true,
            frequency: 10,
            startMilliseconds: 1
          }]
        });

      expect(reducer(initialState, {type: RECORD_HIT, payload: {gameId: 0, miss: 12}}))
        .to.deep.include({
          games: [{
            id: 0,
            hits: [{miss: 12}],
            open: true,
            frequency: 10,
            startMilliseconds: 1
          }]
        });
    });
  });
});
