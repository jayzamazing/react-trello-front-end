import reducer from './auth';
import {setAuthToken, setCurrentUser} from '../actions/auth';

describe('auth reducer', () => {
  describe('reducer for SET_AUTH_TOKEN', () => {
    let state;
    beforeEach(() => {
      state = reducer(undefined, setAuthToken('dsfr2qrweeardq3we443'));
    });
    it('should exist', () => {
      expect(state.authToken).toEqual(expect.anything());
    });
    it('should store data in state', () => {
      expect(state.authToken).toEqual('dsfr2qrweeardq3we443');
    });
  });
  describe('reducer for SET_CURRENT_USER', () => {
    let state;
    beforeEach(() => {
      state = reducer(undefined, setCurrentUser('test@test.com'));
    });
    it('should exist', () => {
      expect(state.currentUser).toEqual(expect.anything());
    });
    it('should store data in state', () => {
      expect(state.currentUser).toEqual('test@test.com');
    });
  });
});
