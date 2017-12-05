'use strict';
import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import {LoginPage} from './login-page';
import {Redirect} from 'react-router-dom';

describe('home-page', () => {
  it('should render page', () => {
    shallow(<LoginPage />);
  });
  it('snapshot', () => {
    const wrapper = shallow(<LoginPage />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should redirect when user is logged in', () => {
    const wrapper = shallow(<LoginPage loggedIn="true"/>);
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });
  it('redirect snapshow', () => {
    const wrapper = shallow(<LoginPage loggedIn="true"/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
