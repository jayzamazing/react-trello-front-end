'use strict';
import {normalize} from 'normalizr';
import {cardsListSchema} from '../board-schema';

/*
* action to tell store that a cardslist has been created
* @params data - data to be sent to store
* @returns action type and data
*/
export const CREATE_CARDSLIST_SUCCESS = 'CREATE_CARDSLIST_SUCCESS';
export const createCardslistSuccess = cardslist => {
  const items = (normalize(cardslist, cardsListSchema)).entities;
  return {
    type: CREATE_CARDSLIST_SUCCESS,
    items
  };
};
/*
* function to create a cardslist
* @params postData - data to update on the cardslist
* @params createCardslistSuccess or passed in action
* @dispatch createCardslistSuccess or passed in action
*/
export const createCardslist = (postData, action = createCardslistSuccess) => dispatch => {
  return fetch('/cardslist', {
    method: "POST",
    body: postData
  })
    .then(res => {
      if (!res.ok) return Promise.reject(res.statusText);
      return dispatch(action(res.body));
    });
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
export const deleteCardslist = (id, action = deleteCardslistSuccess) => dispatch => {
  return fetch(`/cardslist/${id}`, {
    method: 'DELETE'
  })
    .then((res) => {
      if (!res.ok) return Promise.reject(res.statusText);
      dispatch(action(id));
    });
};
/*
* action to tell store that a cardslist has been updated
* @params cardslist - cardslist to be sent to store
* @params id - id of the cardslist to update in the store
* @returns action type and cardslist
*/
export const UPDATE_CARDSLIST_SUCCESS = 'UPDATE_CARDSLIST_SUCCESS';
export const updateCardslistSuccess = function(id, cardslist) {
  const items = (normalize(cardslist, cardsListSchema)).entities;
  return {
    type: UPDATE_CARDSLIST_SUCCESS,
    items,
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
export const updateCardslist = (id, postData, action = updateCardslistSuccess) => dispatch => {
  return fetch(`/cardslist/${id}`, {
    method: 'PUT',
    body: postData
  })
    .then((res) => {
      if (!res.ok) return Promise.reject(res.statusText);
      dispatch(action(id, postData));
    });
};
