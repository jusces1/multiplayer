import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {newGame} from '../../src/middlewares/apiMiddleware';
import {HANDLE_ERROR} from '../../src//actions/Actions';
describe('createGame', () => {
  context('when game created', () => {
    const middlewares = [thunk];
    const createMockStore = configureStore(middlewares);
    let store;
    let fetch;
    // const waitForPromiseToSettle = (fn) => {
    //   // Promises by design resolve/reject on the *next event loop*.
    //   // We can delay execution of assertion code also by *one event loop* by
    //   // delaying it by 0 using setTimeout.
    //   setTimeout(fn, 0);
    // };
    beforeEach(() => {
      const initialState = {};
      store = createMockStore(initialState);

      fetch = sinon.stub();
      fetch.returns(Promise.resolve({}));
    });
    it('dispatches game post requested', () => {
      store.dispatch(newGame(500, fetch));
      console.log(store.getActions());
      expect(store.getActions()).to.deep.contain({type: HANDLE_ERROR, error: {status: false, message: ''}});
    });
  });
});
