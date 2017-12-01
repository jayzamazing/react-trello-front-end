import {createCardslist, createCardslistSuccess, CREATE_CARDSLIST_SUCCESS,
  deleteCardslistSuccess, DELETE_CARDSLIST_SUCCESS, deleteCardslist,
  updateCardslistSuccess, UPDATE_CARDSLIST_SUCCESS, updateCardslist} from './cardslist';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {seedCardslistCount, seedCardslistSingle, createTitle} from '../testutils/seeddata';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
//used to mock getting the auth token from state
const state = () => {
  return {
    auth: {
      authToken: 'fdr3rweasdfqwearfaere'
    }
  }
}
let cdls;
describe('createCardslistSuccess', () => {
  beforeEach(() => {
    cdls = seedCardslistCount(35634235543, 1);
  });
  it('Should return the action', () => {
    const cardslist = {};
    const action = createCardslistSuccess(cardslist);
    expect(action.type).toEqual(CREATE_CARDSLIST_SUCCESS);
    expect(action.cardslist).toEqual({ undefined: {} });
  });
  it('Should normalize the data', () => {
    const action = createCardslistSuccess(cdls[0]);
    //get array of card keys
    let keys = Object.keys(action.cardslist);
    expect(action.cardslist[keys[0]]).toHaveProperty('title');
    expect(action.cardslist[keys[0]].title).toEqual(cdls[0].title);
    expect(action.cardslist[keys[0]]).toHaveProperty('_id');
    expect(action.cardslist[keys[0]]._id).toEqual(cdls[0]._id);
  });
});
describe('createCardslist', () => {
  let card, data;
  beforeEach(() => {
    data = createTitle();
    card = seedCardslistSingle(2343242341311, data.title);
    cdls = seedCardslistSingle(2343242341311, data.title);
  });
  it('should dispatch createCardslistSuccess', () => {
    const data = createTitle();
    const card = seedCardslistSingle(2343242341311, data.title);
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json() {
        return card;
      }
    }));
    const dispatch = jest.fn();
    //call create cardslist
    return createCardslist(data)(dispatch, state)
    .then(() => {
      // expect(fetch).toHaveBeenCalledWith('/cardslist', {'body': data, 'method': 'POST'});
      expect(fetch).toHaveBeenCalledWith('http://localhost:3030/cardslist',
      {"body": `{\"title\":\"${data.title}\"}`, "headers": {"Accept": "application/json",
      "Authorization": "Bearer fdr3rweasdfqwearfaere", "Content-Type": "application/json"},
      "method": "POST"});
      expect(dispatch).toHaveBeenCalledWith(createCardslistSuccess(card));
    });
  });
  it('should normalize data after createCardslistSuccess is dispatched', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json() {
        return cdls;
      }
    }));
    const dispatch = jest.fn();
    return createCardslist({title: ''})(dispatch, state)
    .then(() => {
      const action = dispatch.mock.calls[0][0];
      //get array of card keys
      let keys = Object.keys(action.cardslist);
      expect(action.cardslist[keys[0]]).toHaveProperty('title');
      expect(action.cardslist[keys[0]].title).toEqual(cdls.title);
      expect(action.cardslist[keys[0]]).toHaveProperty('_id');
      expect(action.cardslist[keys[0]]._id).toEqual(cdls._id);
    });
  });
});
describe('deleteCardslistSuccess', () => {
  it('Should return the action', () => {
    const action = deleteCardslistSuccess(1);
    expect(action.type).toEqual(DELETE_CARDSLIST_SUCCESS);
    expect(action.cardslistId).toEqual(1);
  });
});
describe('deleteCardslist', () => {
  let card, data;
  beforeEach(() => {
    data = createTitle();
    card = seedCardslistSingle(2343242341311, data.title);
    cdls = seedCardslistSingle(2343242341311, data.title);
  });
  it('should dispatch deleteCardslistSuccess', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }));
    const dispatch = jest.fn();
    //call create cardslist
    return deleteCardslist(1)(dispatch, state)
    .then(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:3030/cardslist/1',
      {"headers": {"Authorization": "Bearer fdr3rweasdfqwearfaere"},
      "method": "DELETE"});
      expect(dispatch).toHaveBeenCalledWith(deleteCardslistSuccess(1));
    });
  });
  it('should normalize data after deleteCardslistSuccess is dispatched', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      id: 1
    }));
    const dispatch = jest.fn();
    return deleteCardslist(1)(dispatch, state)
    .then(() => {
      const action = dispatch.mock.calls[0][0];
      expect(action.cardslistId).toEqual(1);
    });
  });
});
describe('updateCardslistSuccess', () => {//TODO continue from here
  beforeEach(() => {
    cdls = seedCardslistSingle(2343242341311, 'hello');
  });
  it('Should return the action', () => {
    const cardslist = {};
    const action = updateCardslistSuccess(1, cardslist);
    expect(action.type).toEqual(UPDATE_CARDSLIST_SUCCESS);
    expect(action.cardslist).toEqual({"1": {"_id": 1}});
  });
  it('Should normalize the data', () => {
    const action = updateCardslistSuccess(1, cdls);
    //get array of card keys
    let keys = Object.keys(action.cardslist);
    expect(action.cardslist[keys[0]]).toHaveProperty('title');
    expect(action.cardslist[keys[0]].title).toEqual(cdls.title);
    expect(action.cardslist[keys[0]]).toHaveProperty('_id');
    expect(action.cardslist[keys[0]]._id).toEqual(cdls._id);
  });
});
describe('updateCardslist', () => {
  let card, data;
  beforeEach(() => {
    data = createTitle();
    card = seedCardslistSingle(2343242341311, data.title);
    cdls = seedCardslistSingle(2343242341311, data.title);
  });
  it('should dispatch updateCardslistSuccess', () => {
    const data = createTitle();
    const card = seedCardslistSingle(2343242341311, data.title);
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json() {
        return card;
      }
    }));
    const dispatch = jest.fn();
    //call create cardslist
    return updateCardslist(1, data)(dispatch, state)
    .then(() => {
      // console.log(card);
      expect(fetch).toHaveBeenCalledWith('http://localhost:3030/cardslist/1',
      {"body": `{\"title\":\"${data.title}\"}`, "headers": {"Accept": "application/json",
      "Authorization": "Bearer fdr3rweasdfqwearfaere", "Content-Type": "application/json"},
      "method": "PUT"});
      expect(dispatch).toHaveBeenCalledWith(updateCardslistSuccess(1, card));
    });
  });
  it('should normalize data after updateCardslistSuccess is dispatched', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json() {
        return cdls;
      }
    }));
    const dispatch = jest.fn();
    return updateCardslist(1, cdls)(dispatch, state)
    .then(() => {
      const action = dispatch.mock.calls[0][0];
      //get array of card keys
      let keys = Object.keys(action.cardslist);
      expect(action.cardslist[keys[0]]).toHaveProperty('title');
      expect(action.cardslist[keys[0]].title).toEqual(cdls.title);
      expect(action.cardslist[keys[0]]).toHaveProperty('_id');
      expect(action.cardslist[keys[0]]._id).toEqual(cdls._id);
    });
  });
});
