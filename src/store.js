import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import boardReducer from './reducers/boards';
import cardsReducer from './reducers/cards';
import cardslistReducer from './reducers/cardslist';
import {reducer as formReducer} from 'redux-form';
import authReducer from './reducers/auth';

export default createStore(
  combineReducers({
    boards: boardReducer,
    cards: cardsReducer,
    cardslist: cardslistReducer,
    form: formReducer,
    auth: authReducer
  }),
  applyMiddleware(thunk)
);
