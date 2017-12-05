import {SET_AUTH_TOKEN, setAuthToken, SET_CURRENT_USER, setCurrentUser,
login, refreshAuthToken} from './auth';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('setAuthToken', () => {
  it('Should return the action', () => {
    const action = setAuthToken('fdr3rweasdfqwearfaere');
    expect(action.type).toEqual(SET_AUTH_TOKEN);
    expect(action.authToken).toEqual('fdr3rweasdfqwearfaere');
  });
});
describe('setCurrentUser', () => {
  it('Should return the action', () => {
    const action = setCurrentUser('test@test.com');
    expect(action.type).toEqual(SET_CURRENT_USER);
    expect(action.currentUser).toEqual('test@test.com');
  });
});
describe('login', () => {
  let token_1, token_2, decoded;
  const username = 'test@test.com';
  const password = 'test@test.com';
  beforeEach(() => {
    token_1 = jwt.sign(
    {user: 'test@test.com'},
      'SOME_SECRET_STRING',
      {algorithm: 'HS256', subject: 'test@test.com', expiresIn: '7d'});
    token_2 = btoa(`${username}:${password}`);
  });
  it('Should dispatch setcurrentuser and setauthtoken when logging in', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json() {
        return {
          authToken: token_1
        };
      }
    }));
    const dispatch = jest.fn();
    return login('test@test.com', 'test@test.com')(dispatch)
    .then(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:3030/auth/login", {"headers": {"Authorization": "Basic " + token_2}, "method": "POST"});
      expect(dispatch).toHaveBeenCalledWith(setCurrentUser('test@test.com'));
      expect(dispatch).toHaveBeenCalledWith(setAuthToken(token_1));
    });
  });
  it('Should dispatch setcurrentuser and setauthtoken when refreshing token', () => {
    const state = () => {
      return {
        auth: {
          authToken: token_1
        }
      }
    }
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json() {
        return {
          authToken: token_1
        };
      }
    }));
    const dispatch = jest.fn();
    return refreshAuthToken()(dispatch, state)
    .then(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:3030/auth/refresh", {"headers": {"Authorization": "Bearer " + token_1}, "method": "POST"});
      expect(dispatch).toHaveBeenCalledWith(setCurrentUser('test@test.com'));
      expect(dispatch).toHaveBeenCalledWith(setAuthToken(token_1));
    });
  });
});
