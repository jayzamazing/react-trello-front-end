import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import {BrowserRouter as Router} from 'react-router-dom';
import store from './store';
import {Provider} from 'react-redux';

describe('Program loads', () => {
  it('renders properly', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>,
      div
    );
  });
});
