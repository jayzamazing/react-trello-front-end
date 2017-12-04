'use strict';
import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {UpdateBoardForm} from './update-board-form';

describe('update-board-form', () => {
  //ensure that it renders without issues
  it('should render', () => {
    const initialValues = {
      "35re4qwefgt34werwd": "super testing"
    }
    const handleSubmit = jest.fn();
    shallow(<UpdateBoardForm handleSubmit={handleSubmit} initialValues={initialValues} boardId="35re4qwefgt34werwd"/>);
  });
  //take snapshot for future changes
  it('snapshot', () => {
    const initialValues = {
      "35re4qwefgt34werwd": "super testing"
    }
    const handleSubmit = jest.fn();
    const wrapper = shallow(<UpdateBoardForm handleSubmit={handleSubmit} initialValues={initialValues} boardId="35re4qwefgt34werwd"/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  //click on update button and check dispatches
  it('update board click', () => {
    const initialValues = {
      "35re4qwefgt34werwd": "super testing"
    }
    const handleSubmit = jest.fn();
    const wrapper = shallow(<UpdateBoardForm handleSubmit={handleSubmit} initialValues={initialValues} boardId="35re4qwefgt34werwd"/>);
    wrapper.find('[name="35re4qwefgt34werwd"]').at(0).simulate('change', { target: { value: 'testing' } });
    wrapper.find('.update-board-btn').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
  //click on create button and check dispatches
  it('close button', () => {
    const initialValues = {
      "35re4qwefgt34werwd": "super testing"
    }
    const handleSubmit = jest.fn();
    const closeModal = jest.fn();
    const wrapper = shallow(<UpdateBoardForm closeModal={closeModal} initialValues={initialValues} boardId="35re4qwefgt34werwd" handleSubmit={handleSubmit}/>);
    wrapper.find('[aria-label="close button"]').simulate('click');
    expect(closeModal).toHaveBeenCalled();
  });
});
