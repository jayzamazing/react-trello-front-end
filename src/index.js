import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Boards from './components/boards';
import Cards from './components/cards';
import Cardslist from './components/cardslist';
import store from './store';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
