'use strict';
import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {UpdateCardsTextForm} from './update-cardstext-form';

describe('update-cardstext-form', () => {
  //ensure that it renders without issues
  it('should render', () => {
    const initialValues = {
      "35re4qwefgt34werwd": "super testing"
    }
    const handleSubmit = jest.fn();
    shallow(<UpdateCardsTextForm handleSubmit={handleSubmit} initialValues={initialValues} _id="35re4qwefgt34werwd"/>);
  });
  //take snapshot for future changes
  it('snapshot', () => {
    const initialValues = {
      "35re4qwefgt34werwd": "super testing"
    }
    const handleSubmit = jest.fn();
    const wrapper = shallow(<UpdateCardsTextForm handleSubmit={handleSubmit} initialValues={initialValues} _id="35re4qwefgt34werwd"/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  //click on update button and check dispatches
  it('update cardslist click', () => {
    const initialValues = {
      "35re4qwefgt34werwd": "super testing"
    }
    const handleSubmit = jest.fn();
    const wrapper = shallow(<UpdateCardsTextForm handleSubmit={handleSubmit} initialValues={initialValues} _id="35re4qwefgt34werwd"/>);
    wrapper.find('[name="35re4qwefgt34werwd"]').at(0).simulate('change', { target: { value: 'testing' } });
    wrapper.find('.update-cardstext-area').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
