'use strict';
import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {CreateCardslistForm} from './create-cardslist-form';

describe('create-cardslist-form', () => {
  //ensure that it renders without issues
  it('should render', () => {
    const handleSubmit = jest.fn();
    shallow(<CreateCardslistForm handleSubmit={handleSubmit}/>);
  });
  //take snapshot for future changes
  it('snapshot', () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(<CreateCardslistForm handleSubmit={handleSubmit}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  //click on create button and check dispatches
  it('add board click', () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(<CreateCardslistForm handleSubmit={handleSubmit}/>);
    wrapper.find('[name="cardslistTitle"]').at(0).simulate('change', { target: { value: 'testing' } });
    wrapper.find('.create-cardslist-btn').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
  //click on create button and check dispatches
  it('close button', () => {
    const handleSubmit = jest.fn();
    const closeModal = jest.fn();
    const wrapper = shallow(<CreateCardslistForm close={closeModal} handleSubmit={handleSubmit}/>);
    wrapper.find('[aria-label="close button"]').simulate('click');
    expect(closeModal).toHaveBeenCalled();
  });
});
