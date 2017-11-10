import Immutable from 'seamless-immutable';
import {FIND_BOARDS_SUCCESS} from '../actions/boards';
import {CREATE_CARDS_SUCCESS, DELETE_CARDS_SUCCESS, UPDATE_CARDS_SUCCESS} from '../actions/cards';

const initialRepositoryState = Immutable({});

/*
* Function called when DELETE_CARDS_SUCCESS is called to deal with deleting a Cards and removing it from state
* params state- old state before merge
* params action.cardsid- Cards to delete
*/
export const deleteCards= (state, {cardsId}) => state.without(cardsId);

/*
* Function called when UPDATE_CARDS_SUCCESS is called to update cardslsit with a new cards
* params state- old state before merge
* params action.items.cardslsit- cards to update
*/
export const updateCards= (state, {cards}) => state.merge(cards, {deep: true});

/*
* Function to deal with using various reducer functions
* params state- old state before merge
* params action- action with data to modify state
*/
export default (state = initialRepositoryState, action) => {
  switch (action.type) {
  case FIND_BOARDS_SUCCESS:
  case CREATE_CARDS_SUCCESS:
  case UPDATE_CARDS_SUCCESS:
    if (action.cards) {
      return updateCards(state, action);
    } else {
      return state;
    }
  case DELETE_CARDS_SUCCESS:
    return deleteCards(state, action);
  default:
    return state;
  }
};
