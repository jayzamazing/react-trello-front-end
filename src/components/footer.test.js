'use strict';
import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import {FooterBar} from './footer';

describe('footer', () => {
  it('should render page when home', () => {
    let location = {
      pathname: '/'
    }
    const wrapper = shallow(<FooterBar location={location}/>);
  });
  it('home snapshot', () => {
    let location = {
      pathname: '/'
    }
    const wrapper = shallow(<FooterBar location={location}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should not be visible', () => {
    let location = {
      pathname: '/other'
    }
    const wrapper = shallow(<FooterBar location={location}/>);
    expect(wrapper.find('footer')).toHaveLength(0);
  });
  it('should not be visible snapshot', () => {
    let location = {
      pathname: '/other'
    }
    const wrapper = shallow(<FooterBar location={location}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
