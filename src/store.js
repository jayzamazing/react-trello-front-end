import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import boardReducer from './reducers/boards';
import cardsReducer from './reducers/cards';
import cardslistReducer from './reducers/cardslist';

export default createStore(
  combineReducers({
    boardReducer,
    cardsReducer,
    cardslistReducer
  }),
  applyMiddleware(thunk)
);
