'use strict';
import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import {HeaderBar} from './header-bar';

describe('header-bar', () => {
  it('should render with login button', () => {
    let location = {
      pathname: '/'
    }
    const wrapper = shallow(<HeaderBar location={location}/>);
    expect(wrapper.find('.login-btn')).toHaveLength(1);
  });
  it('snapshot with login button', () => {
    let location = {
      pathname: '/boards'
    }
    const wrapper = shallow(<HeaderBar location={location}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should render with logout button', () => {
    let location = {
      pathname: '/'
    }
    const wrapper = shallow(<HeaderBar location={location} loggedIn="true"/>);
    expect(wrapper.find('.logout-btn')).toHaveLength(1);
  });
  it('snapshot with logout button', () => {
    let location = {
      pathname: '/boards'
    }
    const wrapper = shallow(<HeaderBar location={location} loggedIn="true"/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  //ensure that header cannot be found when it is rendered
  it('should not be visible', () => {
    let location = {
      pathname: '/register'
    }
    let wrapper = shallow(<HeaderBar location={location}/>);
    expect(wrapper.find('header')).toHaveLength(0);
    location = {
      pathname: '/login'
    }
    wrapper = shallow(<HeaderBar location={location}/>);
    expect(wrapper.find('header')).toHaveLength(0);
  });
  //ensure the snapshot has no data for either of the following paths
  it('should not be visible', () => {
    let location = {
      pathname: '/register'
    }
    let wrapper = shallow(<HeaderBar location={location}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
    location = {
      pathname: '/login'
    }
    wrapper = shallow(<HeaderBar location={location}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  //check dispatch is fired off when logout button is clicked
  it('dispatches logout', () => {
    let location = {
      pathname: '/boards'
    }
    const dispatch = jest.fn();
    const wrapper = shallow(<HeaderBar location={location} dispatch={dispatch} loggedIn="true"/>);
    wrapper.find('.logout-btn').at(0).simulate('click');
    expect(dispatch).toHaveBeenCalledWith({"authToken": null, "type": "SET_AUTH_TOKEN"});
    expect(dispatch).toHaveBeenCalledWith({"currentUser": null, "type": "SET_CURRENT_USER"});
  });
});
