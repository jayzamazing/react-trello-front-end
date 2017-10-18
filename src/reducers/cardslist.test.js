'use strict';
import {reducer} from './cardslist';
import {normalize} from 'normalizr';
import {cardsListSchema, cardslistArray} from '../board-schema';
import {createCardslistSuccess, deleteCardslistSuccess, updateCardslistSuccess} from '../actions/cardslist';
import {seedCardslists, seedCardslists2} from '../testutils/seeddata';
import {FIND_BOARDS_SUCCESS} from '../actions/boards';

describe('cardslist reducer', () => {
  let cardslist, items;
  beforeEach(() => {
    cardslist = seedCardslists(5);
    items = (normalize(cardslist, cardslistArray)).entities;
  });
  afterEach(() => {
    cardslist = {};
    items = {};
  });
  describe('reducer for FIND_BOARDS_SUCCESS', () => {
    let state;
    beforeEach(() => {
      state = reducer(undefined, {type: FIND_BOARDS_SUCCESS, items});
    });
    it('should exist', () => {
      expect(state.cardslist).toEqual(expect.anything());
    });
    it('should have properties', () => {
      let keys = Object.keys(state.cardslist);
      expect(state.cardslist).toHaveProperty(keys[0]);
      expect(state.cardslist[keys[0]]).toHaveProperty('_id');
      expect(state.cardslist[keys[0]]).toHaveProperty('title');
      expect(state.cardslist[keys[0]]).toHaveProperty('cards');
      expect(Array.isArray(state.cardslist[keys[0]].cards)).toBe(true);
    });
    it('should deserialize the order', () => {
      let keys = Object.keys(state.cardslist);
      expect(state.cardslist[keys[0]]._id).toEqual(cardslist[0]._id);
      expect(state.cardslist[keys[1]].title).toEqual(cardslist[1].title);
    });
  });
  describe('CREATE_CARDSLIST_SUCCESS', () => {
    let state, test;
    beforeEach(() => {
      test = seedCardslists(0, 'grocery list');
      state = reducer(undefined, {type: FIND_BOARDS_SUCCESS, items});
      state = reducer(state, createCardslistSuccess(test));
    });
    it('should exist', () => {
      expect(state.cardslist).toEqual(expect.anything());
    });
    it('should have properties', () => {
      let keys = Object.keys(state.cardslist);
      expect(state.cardslist).toHaveProperty(keys[0]);
      expect(state.cardslist[keys[0]]).toHaveProperty('_id');
      expect(state.cardslist[keys[0]]).toHaveProperty('title');
      expect(state.cardslist[keys[0]]).toHaveProperty('cards');
    });
    it('should deserialize the order', () => {
      expect(state.cardslist[test._id]._id).toEqual(test._id);
      expect(state.cardslist[test._id].title).toEqual('grocery list');
    });
  });
  describe('DELETE_CARDSLIST_SUCCESS', () => {
    let state;
    beforeEach(() => {
      state = reducer(undefined, {type: FIND_BOARDS_SUCCESS, items});
      state = reducer(state, deleteCardslistSuccess(cardslist[1]._id));
    });
    it('should exist', () => {
      expect(state.cardslist).toEqual(expect.anything());
    });
    it('should not have properties', () => {
      expect(state.cardslist).not.toHaveProperty(cardslist[1]._id);
    });
  });
  describe('UPDATE_CARDSLIST_SUCCESS', () => {
    let state, test;
    beforeEach(() => {
      test = seedCardslists(0, 'super mario', cardslist[2]._id);
      state = reducer(undefined, {type: FIND_BOARDS_SUCCESS, items});
      state = reducer(state, updateCardslistSuccess(cardslist[2]._id, test));
    });
    it('should exist', () => {
      expect(state.cardslist).toEqual(expect.anything());
    });
    it('should have properties', () => {
      expect(state.cardslist).toHaveProperty(test._id);
      expect(state.cardslist[test._id]).toHaveProperty('_id');
      expect(state.cardslist[test._id]).toHaveProperty('title');
    });
    it('should deserialize the order', () => {
      expect(state.cardslist[test._id]._id).toEqual(test._id);
      expect(state.cardslist[test._id].title).toEqual('super mario');
    });
  });
});
