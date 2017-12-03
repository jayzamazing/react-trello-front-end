import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import {MemoryRouter as Router} from 'react-router-dom';
import store from './store';
import {Provider} from 'react-redux';
import {shallow} from 'enzyme';

describe('Program loads', () => {
  it('renders properly', () => {
    shallow(<App store={store}/>);
  });
});
