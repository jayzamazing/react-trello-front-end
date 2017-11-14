import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import boardReducer from './reducers/boards';
import cardsReducer from './reducers/cards';
import cardslistReducer from './reducers/cardslist';
import {reducer as formReducer} from 'redux-form';
import authReducer from './reducers/auth';
import {loadAuthToken} from './local-storage';
import {setAuthToken} from './actions/auth';

const store = createStore(
  combineReducers({
    boards: boardReducer,
    cards: cardsReducer,
    cardslist: cardslistReducer,
    auth: authReducer,
    form: formReducer
  }),
  applyMiddleware(thunk)
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
}

export default store;
