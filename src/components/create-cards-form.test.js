'use strict';
import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import {CreateCardsForm} from './create-cards-form';

describe('create-cards-form', () => {
  //ensure that it renders without issues
  it('should render', () => {
    const handleSubmit = jest.fn();
    shallow(<CreateCardsForm handleSubmit={handleSubmit}/>);
  });
  //take snapshot for future changes
  it('snapshot', () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(<CreateCardsForm handleSubmit={handleSubmit}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  //click on create button and check dispatches
  it('add cards click', () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(<CreateCardsForm handleSubmit={handleSubmit}/>);
    wrapper.find('[name="cardsTitle"]').at(0).simulate('change', { target: { value: 'testing' } });
    wrapper.find('.create-cards-btn').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
  //click on create button and check dispatches
  it('close button', () => {
    const handleSubmit = jest.fn();
    const closeModal = jest.fn();
    const wrapper = shallow(<CreateCardsForm close={closeModal} handleSubmit={handleSubmit}/>);
    wrapper.find('[aria-label="close button"]').simulate('click');
    expect(closeModal).toHaveBeenCalled();
  });
});
