import { combineReducers } from 'redux';
import boardReducer from './boards';
import cardsReducer from './cards';
import cardslistReducer from './cardslist';
export default combineReducers({
  boardReducer,
  cardsReducer,
  cardslistReducer
});
