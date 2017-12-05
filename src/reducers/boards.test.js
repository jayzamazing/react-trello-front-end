'use strict';
import reducer from './boards';
import {findBoardsSuccess, createBoardSuccess, deleteBoardSuccess, updateBoardSuccess} from '../actions/boards';
import {seedBoardsCount, seedBoardsSingle} from '../testutils/seeddata';


describe('board reducer', () => {
  let boards;
  beforeEach(() => {
    boards = seedBoardsCount(5);
  });
  afterEach(() => {
    boards = {};
  });
  describe('reducer for FIND_BOARDS_SUCCESS', () => {
    let state;
    beforeEach(() => {
      state = reducer(undefined, findBoardsSuccess(boards));
    });
    it('should exist', () => {
      expect(state).toEqual(expect.anything());
    });
    it('should have properties', () => {
      let keys = Object.keys(state);
      expect(state).toHaveProperty(keys[0]);
      expect(state[keys[0]]).toHaveProperty('_id');
      expect(state[keys[0]]).toHaveProperty('title');
      expect(state[keys[0]]).toHaveProperty('cardsList');
      expect(Array.isArray(state[keys[0]].cardsList)).toBe(true);
    });
    it('should deserialize the order', () => {
      let keys = Object.keys(state);
      expect(state[keys[0]]._id).toEqual(boards[0]._id);
      expect(state[keys[1]].title).toEqual(boards[1].title);
    });
  });
  describe('CREATE_BOARD_SUCCESS', () => {
    let state, test;
    beforeEach(() => {
      test = seedBoardsSingle('grocery list');
      state = reducer(undefined, findBoardsSuccess(boards));
      state = reducer(state, createBoardSuccess(test));
    });
    it('should exist', () => {
      expect(state).toEqual(expect.anything());
    });
    it('should have properties', () => {
      let keys = Object.keys(state);
      expect(state).toHaveProperty(keys[0]);
      expect(state[keys[0]]).toHaveProperty('_id');
      expect(state[keys[0]]).toHaveProperty('title');
      expect(state[keys[0]]).toHaveProperty('cardsList');
    });
    it('should deserialize the order', () => {
      expect(state[test._id]._id).toEqual(test._id);
      expect(state[test._id].title).toEqual('grocery list');
    });
  });
  describe('DELETE_BOARD_SUCCESS', () => {
    let state;
    beforeEach(() => {
      state = reducer(undefined, findBoardsSuccess(boards));
      state = reducer(state, deleteBoardSuccess(boards[1]._id));
    });
    it('should exist', () => {
      expect(state).toEqual(expect.anything());
    });
    it('should not have properties', () => {
      expect(state).not.toHaveProperty(boards[1]._id);
    });
  });
  describe('UPDATE_BOARD_SUCCESS', () => {
    let state, test;
    beforeEach(() => {
      test = seedBoardsSingle('super mario', boards[2]._id);
      state = reducer(undefined, findBoardsSuccess(boards));
      state = reducer(state, updateBoardSuccess(boards[2]._id,
      test));
    });
    it('should exist', () => {
      expect(state).toEqual(expect.anything());
    });
    it('should have properties', () => {
      expect(state).toHaveProperty(test._id);
      expect(state[test._id]).toHaveProperty('_id');
      expect(state[test._id]).toHaveProperty('title');
    });
    it('should deserialize the order', () => {
      expect(state[test._id]._id).toEqual(test._id);
      expect(state[test._id].title).toEqual('super mario');
    });
  });
});
