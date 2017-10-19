'use strict';
import reducer from './cards';
import {normalize} from 'normalizr';
import {cardsSchema, cardsArray} from '../board-schema';
import {createCardsSuccess, deleteCardsSuccess, updateCardsSuccess} from '../actions/cards';
import {seedCards, seedCards2} from '../testutils/seeddata';
import {FIND_BOARDS_SUCCESS} from '../actions/boards';

describe('cards reducer', () => {
  let cards, items;
  beforeEach(() => {
    cards = seedCards(5);
    items = (normalize(cards, cardsArray)).entities;
  });
  afterEach(() => {
    cards = {};
    items = {};
  });
  describe('reducer for FIND_BOARDS_SUCCESS', () => {
    let state;
    beforeEach(() => {
      state = reducer(undefined, {type: FIND_BOARDS_SUCCESS, items});
    });
    it('should exist', () => {
      expect(state.cards).toEqual(expect.anything());
    });
    it('should have properties', () => {
      let keys = Object.keys(state.cards);
      expect(state.cards).toHaveProperty(keys[0]);
      expect(state.cards[keys[0]]).toHaveProperty('_id');
      expect(state.cards[keys[0]]).toHaveProperty('text');
    });
    it('should deserialize the order', () => {
      let keys = Object.keys(state.cards);
      expect(state.cards[keys[0]]._id).toEqual(cards[0]._id);
      expect(state.cards[keys[1]].title).toEqual(cards[1].title);
    });
  });
  describe('CREATE_CARDS_SUCCESS', () => {
    let state, test;
    beforeEach(() => {
      test = seedCards(0, 'grocery list');
      state = reducer(undefined, {type: FIND_BOARDS_SUCCESS, items});
      state = reducer(state, createCardsSuccess(test));
    });
    it('should exist', () => {
      expect(state.cards).toEqual(expect.anything());
    });
    it('should have properties', () => {
      let keys = Object.keys(state.cards);
      expect(state.cards).toHaveProperty(keys[0]);
      expect(state.cards[keys[0]]).toHaveProperty('_id');
      expect(state.cards[keys[0]]).toHaveProperty('text');
    });
    it('should deserialize the order', () => {
      expect(state.cards[test._id]._id).toEqual(test._id);
      expect(state.cards[test._id].text).toEqual('grocery list');
    });
  });
  describe('DELETE_CARDS_SUCCESS', () => {
    let state;
    beforeEach(() => {
      state = reducer(undefined, {type: FIND_BOARDS_SUCCESS, items});
      state = reducer(state, deleteCardsSuccess(cards[1]._id));
    });
    it('should exist', () => {
      expect(state.cards).toEqual(expect.anything());
    });
    it('should not have properties', () => {
      expect(state.cards).not.toHaveProperty(cards[1]._id);
    });
  });
  describe('UPDATE_CARDS_SUCCESS', () => {
    let state, test;
    beforeEach(() => {
      test = seedCards(0, 'super mario', cards[2]._id);
      state = reducer(undefined, {type: FIND_BOARDS_SUCCESS, items});
      state = reducer(state, updateCardsSuccess(cards[2]._id, test));
    });
    it('should exist', () => {
      expect(state.cards).toEqual(expect.anything());
    });
    it('should have properties', () => {
      expect(state.cards).toHaveProperty(test._id);
      expect(state.cards[test._id]).toHaveProperty('_id');
      expect(state.cards[test._id]).toHaveProperty('text');
    });
    it('should deserialize the order', () => {
      expect(state.cards[test._id]._id).toEqual(test._id);
      expect(state.cards[test._id].text).toEqual('super mario');
    });
  });
});
