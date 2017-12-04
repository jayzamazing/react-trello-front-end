'use strict';
import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import {RegistrationPage} from './registration-page';
import {Redirect} from 'react-router-dom';

describe('home-page', () => {
  it('should render page', () => {
    shallow(<RegistrationPage />);
  });
  it('snapshot', () => {
    const wrapper = shallow(<RegistrationPage />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should redirect when user is logged in', () => {
    const wrapper = shallow(<RegistrationPage loggedIn="true"/>);
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });
  it('redirect snapshow', () => {
    const wrapper = shallow(<RegistrationPage loggedIn="true"/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
