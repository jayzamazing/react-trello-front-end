import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from './reducers/index';

export default createStore(reducer);
