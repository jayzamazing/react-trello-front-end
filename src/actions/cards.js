import {normalize} from 'normalizr';
import {cardsSchema} from '../board-schema';
import {BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
/*
* action to tell store that a cards has been created
* @params data - data to be sent to store
* @returns action type and data
*/
export const CREATE_CARDS_SUCCESS = 'CREATE_CARDS_SUCCESS';
export const createCardsSuccess = items => {
  const {cards} = items ? normalize(items, cardsSchema).entities : {};
  return {
    type: CREATE_CARDS_SUCCESS,
    cards
  };
};
/*
* function to create a cards
* @params postData - data to update on the cards
* @params createCardsSuccess or passed in action
* @dispatch createCardsSuccess or passed in action
*/
export const createCards = (postData, action = createCardsSuccess) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${BASE_URL}/cards`, {
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
* action to tell store that a cards has been created
* @params data - data to be sent to store
* @returns action type and data
*/
export const DELETE_CARDS_SUCCESS = 'DELETE_CARDS_SUCCESS';
export const deleteCardsSuccess = id => {
  return {
    type: DELETE_CARDS_SUCCESS,
    cardsId: id
  };
};
/*
* function to delete a cards
* @params id - id of the cards to delete
* @params deleteCardsSuccess or passed in action
* @dispatch deleteCardsSuccess or passed in action
*/
export const deleteCards = (id, action = deleteCardsSuccess) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${BASE_URL}/cards/${id}`, {
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
* action to tell store that a cards has been updated
* @params cards - cards to be sent to store
* @params id - id of the cards to update in the store
* @returns action type and cards
*/
export const UPDATE_CARDS_SUCCESS = 'UPDATE_CARDS_SUCCESS';
export const updateCardsSuccess = function(id, items) {
  items._id = id;
  const {cards} = items ? normalize(items, cardsSchema).entities : {};
  return {
    type: UPDATE_CARDS_SUCCESS,
    cards,
    cardsId: id
  };
};
/*
* function to update the cards
* @params id - id of the cards to update
* @params postData - cards to update on the board
* @params updateCardsSuccess or passed in action
* @dispatch updateCardsSuccess or passed in action
*/
export const updateCards = (id, postData, action = updateCardsSuccess) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${BASE_URL}/cards/${id}`, {
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
