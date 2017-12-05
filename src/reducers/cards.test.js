'use strict';
import reducer from './cards';
import {normalize} from 'normalizr';
import {cardsSchema, cardsArray} from '../board-schema';
import {createCardsSuccess, deleteCardsSuccess, updateCardsSuccess} from '../actions/cards';
import {seedCardsSingle, seedCardsCount} from '../testutils/seeddata';
import {FIND_BOARDS_SUCCESS} from '../actions/boards';

describe('cards reducer', () => {
  let cards, items;
  beforeEach(() => {
    cards = seedCardsCount(234543234542, 5);
    items = (normalize(cards, cardsArray)).entities;
  });
  afterEach(() => {
    cards = {};
    items = {};
  });
  describe('reducer for FIND_BOARDS_SUCCESS', () => {
    let state;
    beforeEach(() => {
      const {cards} = items;
      state = reducer(undefined, {type: FIND_BOARDS_SUCCESS, cards});
    });
    it('should exist', () => {
      expect(state).toEqual(expect.anything());
    });
    it('should have properties', () => {
      let keys = Object.keys(state);
      expect(state).toHaveProperty(keys[0]);
      expect(state[keys[0]]).toHaveProperty('_id');
      expect(state[keys[0]]).toHaveProperty('text');
    });
    it('should deserialize the order', () => {
      let keys = Object.keys(state);
      expect(state[keys[0]]._id).toEqual(cards[0]._id);
      expect(state[keys[1]].title).toEqual(cards[1].title);
    });
  });
  describe('CREATE_CARDS_SUCCESS', () => {
    let state, test;
    beforeEach(() => {
      test = seedCardsSingle(234543234542, 'grocery list');
      state = reducer(undefined, {type: FIND_BOARDS_SUCCESS, items});
      state = reducer(state, createCardsSuccess(test));
    });
    it('should exist', () => {
      expect(state).toEqual(expect.anything());
    });
    it('should have properties', () => {
      let keys = Object.keys(state);
      expect(state).toHaveProperty(keys[0]);
      expect(state[keys[0]]).toHaveProperty('_id');
      expect(state[keys[0]]).toHaveProperty('text');
    });
    it('should deserialize the order', () => {
      expect(state[test._id]._id).toEqual(test._id);
      expect(state[test._id].text).toEqual('grocery list');
    });
  });
  describe('DELETE_CARDS_SUCCESS', () => {
    let state;
    beforeEach(() => {
      state = reducer(undefined, {type: FIND_BOARDS_SUCCESS, items});
      state = reducer(state, deleteCardsSuccess(cards[1]._id));
    });
    it('should exist', () => {
      expect(state).toEqual(expect.anything());
    });
    it('should not have properties', () => {
      expect(state).not.toHaveProperty(cards[1]._id);
    });
  });
  describe('UPDATE_CARDS_SUCCESS', () => {
    let state, test;
    beforeEach(() => {
      test = seedCardsSingle(234543234542, 'super mario', cards[2]._id);
      state = reducer(undefined, {type: FIND_BOARDS_SUCCESS, items});
      state = reducer(state, updateCardsSuccess(cards[2]._id, test));
    });
    it('should exist', () => {
      expect(state).toEqual(expect.anything());
    });
    it('should have properties', () => {
      expect(state).toHaveProperty(test._id);
      expect(state[test._id]).toHaveProperty('_id');
      expect(state[test._id]).toHaveProperty('text');
    });
    it('should deserialize the order', () => {
      expect(state[test._id]._id).toEqual(test._id);
      expect(state[test._id].text).toEqual('super mario');
    });
  });
});
