import chai from 'chai';
import {createCards, createCardsSuccess, CREATE_CARDS_SUCCESS,
  deleteCardsSuccess, DELETE_CARDS_SUCCESS, deleteCards,
  updateCardsSuccess, UPDATE_CARDS_SUCCESS, updateCards} from './cards';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {seedCardsSingle, seedCardsCount, createTitle} from '../testutils/seeddata';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let cds;
describe('createCardsSuccess', () => {
  beforeEach(() => {
    cds = seedCardsCount(12345422345, 1);
  });
  it('Should return the action', () => {
    const cards = {};
    const action = createCardsSuccess(cards);
    expect(action.type).toEqual(CREATE_CARDS_SUCCESS);
    expect(action.items).toEqual({ cards: { undefined: {} } });
  });
  it('Should normalize the data', () => {
    const action = createCardsSuccess(cds[0]);
    //get array of card keys
    let keys = Object.keys(action.items.cards);
    expect(action.items.cards[keys[0]]).toHaveProperty('text');
    expect(action.items.cards[keys[0]].text).toEqual(cds[0].text);
    expect(action.items.cards[keys[0]]).toHaveProperty('_id');
    expect(action.items.cards[keys[0]]._id).toEqual(cds[0]._id);
  });
});
describe('createCards', () => {
  let card, data;
  beforeEach(() => {
    data = createTitle();
    card = seedCardsSingle(2455332123455, data.text);
    cds = seedCardsSingle(23545432123444, data.text);
  });
  it('should dispatch createCardsSuccess', () => {
    const data = createTitle();
    const card = seedCardsSingle(23453212345, data.text);
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      body: card
    }));
    const dispatch = jest.fn();
    //call create cards
    return createCards(data)(dispatch)
    .then(() => {
      expect(fetch).toHaveBeenCalledWith('/cards', {'body': data, 'method': 'POST'});
      expect(dispatch).toHaveBeenCalledWith(createCardsSuccess(card));
    });
  });
  it('should normalize data after createCardsSuccess is dispatched', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      body: cds
    }));
    const dispatch = jest.fn();
    return createCards({text: ''})(dispatch)
    .then(() => {
      const action = dispatch.mock.calls[0][0];
      //get array of card keys
      let keys = Object.keys(action.items.cards);
      expect(action.items.cards[keys[0]]).toHaveProperty('text');
      expect(action.items.cards[keys[0]].text).toEqual(cds.text);
      expect(action.items.cards[keys[0]]).toHaveProperty('_id');
      expect(action.items.cards[keys[0]]._id).toEqual(cds._id);
    });
  });
});
describe('deleteCardsSuccess', () => {
  it('Should return the action', () => {
    const action = deleteCardsSuccess(1);
    expect(action.type).toEqual(DELETE_CARDS_SUCCESS);
    expect(action.cardsId).toEqual(1);
  });
});
describe('deleteCards', () => {
  let card, data;
  beforeEach(() => {
    data = createTitle();
    card = seedCardsSingle(2455332123455, data.text);
    cds = seedCardsSingle(23545432123444, data.text);
  });
  it('should dispatch deleteCardsSuccess', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }));
    const dispatch = jest.fn();
    //call create cards
    return deleteCards(1)(dispatch)
    .then(() => {
      expect(fetch).toHaveBeenCalledWith('/cards/1', {"method": "DELETE"});
      expect(dispatch).toHaveBeenCalledWith(deleteCardsSuccess(1));
    });
  });
  it('should normalize data after deleteCardsSuccess is dispatched', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      id: 1
    }));
    const dispatch = jest.fn();
    return deleteCards(1)(dispatch)
    .then(() => {
      const action = dispatch.mock.calls[0][0];
      expect(action.cardsId).toEqual(1);
    });
  });
});
describe('updateCardsSuccess', () => {
  beforeEach(() => {
    cds = seedCardsSingle(23545432123444, 'hello');
  });
  it('Should return the action', () => {
    const cards = {};
    const action = updateCardsSuccess(1, cards);
    expect(action.type).toEqual(UPDATE_CARDS_SUCCESS);
    expect(action.items).toEqual({ cards: { undefined: {} } });
  });
  it('Should normalize the data', () => {
    const action = updateCardsSuccess(1, cds);
    //get array of card keys
    let keys = Object.keys(action.items.cards);
    expect(action.items.cards[keys[0]]).toHaveProperty('text');
    expect(action.items.cards[keys[0]].text).toEqual(cds.text);
    expect(action.items.cards[keys[0]]).toHaveProperty('_id');
    expect(action.items.cards[keys[0]]._id).toEqual(cds._id);
  });
});
describe('updateCards', () => {
  let card, data;
  beforeEach(() => {
    data = createTitle();
    card = seedCardsSingle(2455332123455, data.text);
    cds = seedCardsSingle(23545432123444, data.text);
  });
  it('should dispatch updateCardsSuccess', () => {
    const data = createTitle();
    const card = seedCardsSingle(data.text);
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      body: card
    }));
    const dispatch = jest.fn();
    //call create cards
    return updateCards(1, data)(dispatch)
    .then(() => {
      // console.log(card);
      expect(fetch).toHaveBeenCalledWith('/cards/1', {'body': data, 'method': 'PUT'});
      expect(dispatch).toHaveBeenCalledWith(updateCardsSuccess(1, data));
    });
  });
  it('should normalize data after updateCardsSuccess is dispatched', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      body: cds
    }));
    const dispatch = jest.fn();
    return updateCards(1, cds)(dispatch)
    .then(() => {
      const action = dispatch.mock.calls[0][0];
      //get array of card keys
      let keys = Object.keys(action.items.cards);
      expect(action.items.cards[keys[0]]).toHaveProperty('text');
      expect(action.items.cards[keys[0]].text).toEqual(cds.text);
      expect(action.items.cards[keys[0]]).toHaveProperty('_id');
      expect(action.items.cards[keys[0]]._id).toEqual(cds._id);
    });
  });
});
