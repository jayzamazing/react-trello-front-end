'use strict';
import React from 'react';
import component, {CreateBoardForm} from './create-board-form';
import {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('create-board-form', () => {
  //ensure that it renders without issues
  it('should render', () => {
    const handleSubmit = jest.fn();
    shallow(<CreateBoardForm handleSubmit={handleSubmit}/>);
  });
  //take snapshot for future changes
  it('snapshot', () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(<CreateBoardForm handleSubmit={handleSubmit}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  //click on create button and check dispatches
  it('add board click', () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(<CreateBoardForm handleSubmit={handleSubmit}/>);
    wrapper.find('[name="boardTitle"]').at(0).simulate('change', { target: { value: 'testing' } });
    wrapper.find('.create-board-input-area').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
  //click on create button and check dispatches
  it('close button', () => {
    const handleSubmit = jest.fn();
    const closeModal = jest.fn();
    const wrapper = shallow(<CreateBoardForm closeModal={closeModal} handleSubmit={handleSubmit}/>);
    wrapper.find('[aria-label="close button"]').simulate('click');
    expect(closeModal).toHaveBeenCalled();
  });
});
