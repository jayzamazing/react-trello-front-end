import Immutable from 'seamless-immutable';
import {FIND_BOARDS_SUCCESS, CREATE_BOARD_SUCCESS, DELETE_BOARD_SUCCESS, UPDATE_BOARD_SUCCESS} from '../actions/boards';


const initialRepositoryState = Immutable({});

/*
* Function called when DELETE_BOARD_SUCCESS is called to deal with deleting a board and removing it from state
* params state- old state before merge
* params action.boardid- board to delete
*/
export const deleteBoard = (state, action) => (state, {boardId}) => state.without(boardId);

/*
* Function called when UPDATE_BOARD_SUCCESS is called to update boards with a new board
* params state- old state before merge
* params action.items.boards- boards to update
*/
export const updateBoard = (state, {boards}) => state.merge(boards, {deep: true});

/*
* Function to deal with using various reducer functions
* params state- old state before merge
* params action- action with data to modify state
*/
export default (state = initialRepositoryState, action) => {
  switch (action.type) {
  case FIND_BOARDS_SUCCESS:
  case CREATE_BOARD_SUCCESS:
  case UPDATE_BOARD_SUCCESS:
    return updateBoard(state, action);
  case DELETE_BOARD_SUCCESS:
    return deleteBoard(state, action);
  default:
    return state;
  }
};
