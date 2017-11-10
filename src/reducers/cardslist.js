import Immutable from 'seamless-immutable';
import {FIND_BOARDS_SUCCESS} from '../actions/boards';
import {CREATE_CARDSLIST_SUCCESS, DELETE_CARDSLIST_SUCCESS, UPDATE_CARDSLIST_SUCCESS} from '../actions/cardslist';

const initialRepositoryState = Immutable({});

/*
* Function called when DELETE_CARDSLIST_SUCCESS is called to deal with deleting a Cardslist and removing it from state
* params state- old state before merge
* params action.cardslistid- Cardslist to delete
*/
export const deleteCardslist = (state, {cardslistId}) => state.without(cardslistId);

/*
* Function called when UPDATE_CARDSLIST_SUCCESS is called to update cardslsit with a new cardslist
* params state- old state before merge
* params action.items.cardslsit- cardslist to update
*/
export const updateCardslist = (state, {cardslist}) => state.merge(cardslist, {deep: true});

/*
* Function to deal with using various reducer functions
* params state- old state before merge
* params action- action with data to modify state
*/
export default (state = initialRepositoryState, action) => {
  switch (action.type) {
  case FIND_BOARDS_SUCCESS:
  case CREATE_CARDSLIST_SUCCESS:
  case UPDATE_CARDSLIST_SUCCESS:
    if (action.cardslist) {
      return updateCardslist(state, action);
    } else {
      return state;
    }
  case DELETE_CARDSLIST_SUCCESS:
    return deleteCardslist(state, action);
  default:
    return state;
  }
};
