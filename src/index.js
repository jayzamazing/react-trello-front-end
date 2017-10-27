import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Provider} from 'react-redux';
import Home from './components/home';
import Boards from './components/boards';
import Cardslist from './components/cardslist';
import store from './store';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <header>

    </header>
    <Router>
      <main>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/boards" component={Boards} />
        <Route exact path="/board/:boardId" component={Cardslist} />
      </main>
    </Router>
  </Provider>,
document.getElementById('root'));
registerServiceWorker();
