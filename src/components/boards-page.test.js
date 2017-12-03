'use strict';
import React from 'react';
import {shallow} from 'enzyme';
import {BoardsPage} from './boards-page';
import {Redirect} from 'react-router-dom';
import toJson from 'enzyme-to-json';

describe('boards-page', () => {
  it('should render page when authenticated', () => {
    const wrapper = shallow(<BoardsPage loggedIn={true}/>);
    expect(wrapper.find(Redirect)).toHaveLength(0);
  });
  it('authenticated snapshot', () => {
    const wrapper = shallow(<BoardsPage loggedIn={true}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('renders redirect when user is not authenticated', () => {
    const wrapper = shallow(<BoardsPage loggedIn={false}/>);
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });
  it('not authenticated snapshot', () => {
    const wrapper = shallow(<BoardsPage loggedIn={false}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
