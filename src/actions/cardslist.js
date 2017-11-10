import {normalize} from 'normalizr';
import {cardsListSchema} from '../board-schema';
import {BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
/*
* action to tell store that a cardslist has been created
* @params data - data to be sent to store
* @returns action type and data
*/
export const CREATE_CARDSLIST_SUCCESS = 'CREATE_CARDSLIST_SUCCESS';
export const createCardslistSuccess = items => {
  const {cardslist} = items ? normalize(items, cardsListSchema).entities : {};
  return {
    type: CREATE_CARDSLIST_SUCCESS,
    cardslist
  };
};
/*
* function to create a cardslist
* @params postData - data to update on the cardslist
* @params createCardslistSuccess or passed in action
* @dispatch createCardslistSuccess or passed in action
*/
export const createCardslist = (postData, action = createCardslistSuccess) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${BASE_URL}/cardslist`, {
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
* action to tell store that a cardslist has been created
* @params data - data to be sent to store
* @returns action type and data
*/
export const DELETE_CARDSLIST_SUCCESS = 'DELETE_CARDSLIST_SUCCESS';
export const deleteCardslistSuccess = id => {
  return {
    type: DELETE_CARDSLIST_SUCCESS,
    cardslistId: id
  };
};
/*
* function to delete a cardslist
* @params id - id of the cardslist to delete
* @params deleteCardslistSuccess or passed in action
* @dispatch deleteCardslistSuccess or passed in action
*/
export const deleteCardslist = (id, action = deleteCardslistSuccess) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${BASE_URL}/cardslist/${id}`, {
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
* action to tell store that a cardslist has been updated
* @params cardslist - cardslist to be sent to store
* @params id - id of the cardslist to update in the store
* @returns action type and cardslist
*/
export const UPDATE_CARDSLIST_SUCCESS = 'UPDATE_CARDSLIST_SUCCESS';
export const updateCardslistSuccess = (id, items) => {
  items._id = id;
  const {cardslist} = items ? normalize(items, cardsListSchema).entities : {};
  return {
    type: UPDATE_CARDSLIST_SUCCESS,
    cardslist,
    cardslistId: id
  };
};
/*
* function to update the cardslist
* @params id - id of the cardslist to update
* @params postData - cardslist to update on the board
* @params updateCardslistSuccess or passed in action
* @dispatch updateCardslistSuccess or passed in action
*/
export const updateCardslist = (id, postData, action = updateCardslistSuccess) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${BASE_URL}/cardslist/${id}`, {
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
