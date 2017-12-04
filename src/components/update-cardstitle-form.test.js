'use strict';
import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {UpdateCardsTitleForm} from './update-cardstitle-form';

describe('update-cardstitle-form', () => {
  //ensure that it renders without issues
  it('should render', () => {
    const initialValues = {
      "35re4qwefgt34werwd": "super testing"
    }
    const handleSubmit = jest.fn();
    shallow(<UpdateCardsTitleForm handleSubmit={handleSubmit} initialValues={initialValues} _id="35re4qwefgt34werwd"/>);
  });
  //take snapshot for future changes
  it('snapshot', () => {
    const initialValues = {
      "35re4qwefgt34werwd": "super testing"
    }
    const handleSubmit = jest.fn();
    const wrapper = shallow(<UpdateCardsTitleForm handleSubmit={handleSubmit} initialValues={initialValues} _id="35re4qwefgt34werwd"/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  //click on update button and check dispatches
  it('update cardstitle click', () => {
    const initialValues = {
      "35re4qwefgt34werwd": "super testing"
    }
    const handleSubmit = jest.fn();
    const wrapper = shallow(<UpdateCardsTitleForm handleSubmit={handleSubmit} initialValues={initialValues} _id="35re4qwefgt34werwd"/>);
    wrapper.find('[name="35re4qwefgt34werwd"]').at(0).simulate('change', { target: { value: 'testing' } });
    wrapper.find('.update-cardstitle-area').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
