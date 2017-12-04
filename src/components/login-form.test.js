'use strict';
import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import {LoginForm} from './login-form';

describe('login-form', () => {
  //ensure that it renders without issues
  it('should render', () => {
    const handleSubmit = jest.fn();
    shallow(<LoginForm handleSubmit={handleSubmit}/>);
  });
  //take snapshot for future changes
  it('snapshot', () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(<LoginForm handleSubmit={handleSubmit}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  //click on login button and check dispatches
  it('login button click', () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(<LoginForm handleSubmit={handleSubmit}/>);
    wrapper.find('[name="email"]').at(0).simulate('change', { target: { value: 'test@test.com' } });
    wrapper.find('[name="password"]').at(0).simulate('change', { target: { value: 'somereallylongpassword2343' } });
    wrapper.find('.log-in').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
