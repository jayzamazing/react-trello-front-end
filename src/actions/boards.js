import {normalize} from 'normalizr';
import {boardArray, boardsSchema} from '../board-schema';
import {BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

/*
* action to tell store that all boards has been retrieved
* @params boards - boards to be sent to store
* @returns action type and boards
*/
export const FIND_BOARDS_SUCCESS = 'FIND_BOARDS_SUCCESS';
export const findBoardsSuccess = items => {
  //grab all boards array with cards and cardslist and normalize it
  const {boards, cardslist, cards} = items ? normalize(items, boardArray).entities : {};
  return {
    type: FIND_BOARDS_SUCCESS,
    boards,
    cardslist,
    cards
  };
};
/*
* function to get all boards
* @params findBoardsSuccess or passed in action
* @dispatch findBoardsSuccess or passed in action
*/
export const getBoards = (action = findBoardsSuccess) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${BASE_URL}/boards`, {
    headers: {
      Accept: 'application/json',
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => {
      if (res.status === 204) {
        dispatch(action());
      }
      return normalizeResponseErrors(res);
    })
    .then(res => res.json())
    .then(res => dispatch(action(res)))
    .catch(err => {console.log(err)});
};
/*
* action to tell store that a board has been created
* @params boards - boards to be sent to store
* @returns action type and boards
*/
export const CREATE_BOARD_SUCCESS = 'CREATE_BOARD_SUCCESS';
export const createBoardSuccess = items => {
  const {boards} = items ? normalize(items, boardsSchema).entities : {};
  return {
    type: CREATE_BOARD_SUCCESS,
    boards
  };
};
/*
* function to create a board
* @params postData - boards to update on the board
* @params createBoardSuccess or passed in action
* @dispatch createBoardSuccess or passed in action
*/
export const createBoards = (postData, action = createBoardSuccess) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${BASE_URL}/boards`, {
    method: "POST",
    body: JSON.stringify({
      ...postData
    }),
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`,
      "Content-Type": 'application/json',
      Accept: 'application/json'
    }
  })
    .then((res) => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((res) => dispatch(action(res)))
    .catch(err => {console.log(err)});
};
/*
* action to tell store that a board has been deleted
* @params id - id of the board to delete in the store
* @returns action type and boards
*/
export const DELETE_BOARD_SUCCESS = 'DELETE_BOARD_SUCCESS';
export const deleteBoardSuccess = id => {
  return {
    type: DELETE_BOARD_SUCCESS,
    boardId: id
  };
};
/*
* function to delete a board
* @params id - id of the board to delete
* @params deleteBoardSuccess or passed in action
* @dispatch deleteBoardSuccess or passed in action
*/
export const deleteBoards = (id, action = deleteBoardSuccess) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${BASE_URL}/boards/${id}`, {
    method: 'DELETE',
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
  .then((res) => normalizeResponseErrors(res))
    .then((res) => dispatch(action(id)));
};
/*
* action to tell store that a board has been updated
* @params boards - boards to be sent to store
* @params id - id of the board to update in the store
* @returns action type and boards
*/
export const UPDATE_BOARD_SUCCESS = 'UPDATE_BOARD_SUCCESS';
export const updateBoardSuccess = (id, items) => {
  items._id = id;
  const {boards} = items ? normalize(items, boardsSchema).entities : {};
  return {
    type: UPDATE_BOARD_SUCCESS,
    boards,
    boardId: id
  };
};
/*
* function to update the board
* @params id - id of the board to update
* @params postData - boards to update on the board
* @params updateBoardSuccess or passed in action
* @dispatch updateBoardSuccess or passed in action
*/
export const updateBoards = (id, postData, action = updateBoardSuccess) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${BASE_URL}/boards/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      ...postData
    }),
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`,
      "Content-Type": 'application/json',
      Accept: 'application/json'
    }
  })
  .then((res) => normalizeResponseErrors(res))
  .then(res => res.json())
  .then((res) => dispatch(action(id, res)));
};
