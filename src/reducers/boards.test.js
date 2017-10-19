'use strict';
import reducer from './boards';
import {findBoardsSuccess, createBoardSuccess, deleteBoardSuccess, updateBoardSuccess} from '../actions/boards';
import {seedBoards} from '../testutils/seeddata';


describe('board reducer', () => {
  let boards;
  beforeEach(() => {
    boards = seedBoards(5);
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
      expect(state.boards).toEqual(expect.anything());
    });
    it('should have properties', () => {
      let keys = Object.keys(state.boards);
      expect(state.boards).toHaveProperty(keys[0]);
      expect(state.boards[keys[0]]).toHaveProperty('_id');
      expect(state.boards[keys[0]]).toHaveProperty('title');
      expect(state.boards[keys[0]]).toHaveProperty('cardsList');
      expect(Array.isArray(state.boards[keys[0]].cardsList)).toBe(true);
    });
    it('should deserialize the order', () => {
      let keys = Object.keys(state.boards);
      expect(state.boards[keys[0]]._id).toEqual(boards[0]._id);
      expect(state.boards[keys[1]].title).toEqual(boards[1].title);
    });
  });
  describe('CREATE_BOARD_SUCCESS', () => {
    let state, test;
    beforeEach(() => {
      test = seedBoards(0, 'grocery list');
      state = reducer(undefined, findBoardsSuccess(boards));
      state = reducer(state, createBoardSuccess(test));
    });
    it('should exist', () => {
      expect(state.boards).toEqual(expect.anything());
    });
    it('should have properties', () => {
      let keys = Object.keys(state.boards);
      expect(state.boards).toHaveProperty(keys[0]);
      expect(state.boards[keys[0]]).toHaveProperty('_id');
      expect(state.boards[keys[0]]).toHaveProperty('title');
      expect(state.boards[keys[0]]).toHaveProperty('cardsList');
    });
    it('should deserialize the order', () => {
      expect(state.boards[test._id]._id).toEqual(test._id);
      expect(state.boards[test._id].title).toEqual('grocery list');
    });
  });
  describe('DELETE_BOARD_SUCCESS', () => {
    let state;
    beforeEach(() => {
      state = reducer(undefined, findBoardsSuccess(boards));
      state = reducer(state, deleteBoardSuccess(boards[1]._id));
    });
    it('should exist', () => {
      expect(state.boards).toEqual(expect.anything());
    });
    it('should not have properties', () => {
      expect(state.boards).not.toHaveProperty(boards[1]._id);
    });
  });
  describe('UPDATE_BOARD_SUCCESS', () => {
    let state, test;
    beforeEach(() => {
      test = seedBoards(0, 'super mario', boards[2]._id);
      state = reducer(undefined, findBoardsSuccess(boards));
      state = reducer(state, updateBoardSuccess(boards[2]._id,
      test));
    });
    it('should exist', () => {
      expect(state.boards).toEqual(expect.anything());
    });
    it('should have properties', () => {
      expect(state.boards).toHaveProperty(test._id);
      expect(state.boards[test._id]).toHaveProperty('_id');
      expect(state.boards[test._id]).toHaveProperty('title');
    });
    it('should deserialize the order', () => {
      expect(state.boards[test._id]._id).toEqual(test._id);
      expect(state.boards[test._id].title).toEqual('super mario');
    });
  });
});
