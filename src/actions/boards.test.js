import {findBoardsSuccess, FIND_BOARDS_SUCCESS, getBoards,
  createBoards, createBoardSuccess, CREATE_BOARD_SUCCESS,
  deleteBoardSuccess, DELETE_BOARD_SUCCESS, deleteBoards,
  updateBoardSuccess, UPDATE_BOARD_SUCCESS, updateBoards} from './boards';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {seedBoardsCount, seedBoardsSingle, createTitle} from '../testutils/seeddata';

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
let bds;
describe('findBoardsSuccess', () => {
  beforeEach(() => {
    bds = seedBoardsCount(3);
  });
  it('Should return the action', () => {
    const boards = {};
    const action = findBoardsSuccess(boards);
    expect(action.type).toEqual(FIND_BOARDS_SUCCESS);
    expect(action.boards).toEqual(undefined);
  });
  it('Should normalize the data', () => {
    const action = findBoardsSuccess(bds);
    //get array of board keys
    let keys = Object.keys(action.boards);
    expect(action.boards[keys[0]]).toHaveProperty('title');
    expect(action.boards[keys[0]].title).toEqual(bds[0].title);
    expect(action.boards[keys[0]]).toHaveProperty('_id');
    expect(action.boards[keys[0]]._id).toEqual(bds[0]._id);
  });
});
describe('getBoards', () => {
  beforeEach(() => {
    bds = seedBoardsCount(3);
  });
  it('should dispatch findBoardsSuccess', () => {
    const boards = {}
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json() {
        return bds;
      }
    }));
    const dispatch = jest.fn();
    //call get boards
    return getBoards()(dispatch, state)
    .then(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:3030/boards", {"headers": {"Accept": "application/json", "Authorization": "Bearer fdr3rweasdfqwearfaere"}});
      expect(dispatch).toHaveBeenCalledWith(findBoardsSuccess(bds));
    });
  });
  it('should normalize data after findBoardsSuccess is dispatched', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json() {
        return bds;
      }
    }));
    const dispatch = jest.fn();
    return getBoards()(dispatch, state)
    .then(() => {
      const action = dispatch.mock.calls[0][0];
      //get array of board keys
      let keys = Object.keys(action.boards);
      expect(action.boards[keys[0]]).toHaveProperty('title');
      expect(action.boards[keys[0]].title).toEqual(bds[0].title);
      expect(action.boards[keys[0]]).toHaveProperty('_id');
      expect(action.boards[keys[0]]._id).toEqual(bds[0]._id);
    });
  });
});
describe('createBoardSuccess', () => {
  beforeEach(() => {
    bds = seedBoardsCount(1);
  });
  it('Should return the action', () => {
    const boards = {};
    const action = createBoardSuccess(boards);
    expect(action.type).toEqual(CREATE_BOARD_SUCCESS);
    expect(action.boards).toEqual({"undefined": {}});
  });
  it('Should normalize the data', () => {
    const action = createBoardSuccess(bds[0]);
    //get array of board keys
    let keys = Object.keys(action.boards);
    expect(action.boards[keys[0]]).toHaveProperty('title');
    expect(action.boards[keys[0]].title).toEqual(bds[0].title);
    expect(action.boards[keys[0]]).toHaveProperty('_id');
    expect(action.boards[keys[0]]._id).toEqual(bds[0]._id);
  });
});
describe('createBoards', () => {
  let board, data;
  beforeEach(() => {
    data = createTitle();
    board = seedBoardsSingle(data.title);
    bds = seedBoardsSingle(data.title);
  });
  it('should dispatch createBoardSuccess', () => {
    const data = createTitle();
    const board = seedBoardsSingle(data.title);
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json() {
        return board;
      }
    }));
    const dispatch = jest.fn();
    //call create boards
    return createBoards(data)(dispatch, state)
    .then(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:3030/boards',
      {"body": `{\"title\":\"${data.title}\"}`, "headers": {"Accept": "application/json",
      "Authorization": "Bearer fdr3rweasdfqwearfaere", "Content-Type": "application/json"},
      "method": "POST"});
      expect(dispatch).toHaveBeenCalledWith(createBoardSuccess(board));
    });
  });
  it('should normalize data after createBoardsSuccess is dispatched', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json() {
        return bds;
      }
    }));
    const dispatch = jest.fn();
    return createBoards({title: ''})(dispatch, state)
    .then(() => {
      const action = dispatch.mock.calls[0][0];
      //get array of board keys
      let keys = Object.keys(action.boards);
      expect(action.boards[keys[0]]).toHaveProperty('title');
      expect(action.boards[keys[0]].title).toEqual(bds.title);
      expect(action.boards[keys[0]]).toHaveProperty('_id');
      expect(action.boards[keys[0]]._id).toEqual(bds._id);
    });
  });
});
describe('deleteBoardSuccess', () => {
  it('Should return the action', () => {
    const action = deleteBoardSuccess(1);
    expect(action.type).toEqual(DELETE_BOARD_SUCCESS);
    expect(action.boardId).toEqual(1);
  });
});
describe('deleteBoards', () => {
  let board, data;
  beforeEach(() => {
    data = createTitle();
    board = seedBoardsSingle(data.title);
    bds = seedBoardsSingle(data.title);
  });
  it('should dispatch deleteBoardSuccess', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }));
    const dispatch = jest.fn();
    //call create boards
    return deleteBoards(1)(dispatch, state)
    .then(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:3030/boards/1', {"headers": {"Authorization": "Bearer fdr3rweasdfqwearfaere"}, "method": "DELETE"});
      expect(dispatch).toHaveBeenCalledWith(deleteBoardSuccess(1));
    });
  });
  it('should normalize data after deleteBoardsSuccess is dispatched', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      id: 1
    }));
    const dispatch = jest.fn();
    return deleteBoards(1)(dispatch, state)
    .then(() => {
      const action = dispatch.mock.calls[0][0];
      expect(action.boardId).toEqual(1);
    });
  });
});
describe('updateBoardSuccess', () => {//TODO continue from here
  beforeEach(() => {
    bds = seedBoardsSingle('hello');
  });
  it('Should return the action', () => {
    const boards = {};
    const action = updateBoardSuccess(1, boards);
    expect(action.type).toEqual(UPDATE_BOARD_SUCCESS);
    expect(action.boards).toEqual({"1": {"_id": 1}});
  });
  it('Should normalize the data', () => {
    const action = updateBoardSuccess(1, bds);
    //get array of board keys
    let keys = Object.keys(action.boards);
    expect(action.boards[keys[0]]).toHaveProperty('title');
    expect(action.boards[keys[0]].title).toEqual(bds.title);
    expect(action.boards[keys[0]]).toHaveProperty('_id');
    expect(action.boards[keys[0]]._id).toEqual(bds._id);
  });
});
describe('updateBoards', () => {
  let board, data;
  beforeEach(() => {
    data = createTitle();
    board = seedBoardsSingle(data.title);
    bds = seedBoardsSingle(data.title);
  });
  it('should dispatch updateBoardSuccess', () => {
    const data = createTitle();
    const board = seedBoardsSingle(data.title);
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json() {
        return data;
      }
    }));
    const dispatch = jest.fn();
    //call create boards
    return updateBoards(1, data)(dispatch, state)
    .then(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:3030/boards/1',
      {"body": `{\"title\":\"${data.title}\"}`, "headers": {"Accept": "application/json",
      "Authorization": "Bearer fdr3rweasdfqwearfaere", "Content-Type": "application/json"},
      "method": "PUT"});
      expect(dispatch).toHaveBeenCalledWith(updateBoardSuccess(1, data));
    });
  });
  it('should normalize data after updateBoardsSuccess is dispatched', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json() {
        return bds;
      }
    }));
    const dispatch = jest.fn();
    return updateBoards(1, bds)(dispatch, state)
    .then(() => {
      const action = dispatch.mock.calls[0][0];
      //get array of board keys
      let keys = Object.keys(action.boards);
      expect(action.boards[keys[0]]).toHaveProperty('title');
      expect(action.boards[keys[0]].title).toEqual(bds.title);
      expect(action.boards[keys[0]]).toHaveProperty('_id');
      expect(action.boards[keys[0]]._id).toEqual(bds._id);
    });
  });
});
