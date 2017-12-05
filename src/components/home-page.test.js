'use strict';
import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import {HomePage} from './home-page';
import {Redirect} from 'react-router-dom';

describe('home-page', () => {
  it('should render page', () => {
    shallow(<HomePage />);
  });
  it('snapshot', () => {
    const wrapper = shallow(<HomePage />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should redirect when user is logged in', () => {
    const wrapper = shallow(<HomePage loggedIn="true"/>);
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });
  it('redirect snapshow', () => {
    const wrapper = shallow(<HomePage loggedIn="true"/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
