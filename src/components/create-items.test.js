import React from 'react';
import {shallow} from 'enzyme';
import CreateItems from './create-items';

describe('<create-items/>', () => {
  it('Render component', () => {
    const dispatch = jest.fn();
    const dispatch2 = jest.fn();
    shallow(<CreateItems onAddInputChanged={dispatch} addItems={dispatch2}/>);
  });
  it('renders the form with the inputs', () => {
    const dispatch = jest.fn();
    const dispatch2 = jest.fn();
    const wrapper = shallow(<CreateItems onAddInputChanged={dispatch} addItems={dispatch2}/>);
    expect(wrapper.contains(<input type="text" onChange={dispatch}/>)).toEqual(true);
    expect(wrapper.contains(<button type="submit" value="Submit" onClick={dispatch2}/>)).toEqual(true);
  });
  it('changes text in input', () => {
    const dispatch = jest.fn();
    const dispatch2 = jest.fn();
    const wrapper = shallow(<CreateItems onAddInputChanged={dispatch} addItems={dispatch2}/>);
    const inputText = wrapper.find('input');
    inputText.simulate('change', {target: {value: 'My new value'}});
    expect(dispatch).toHaveBeenCalled();
  });
  it('performs click event', () => {
    const dispatch = jest.fn();
    const dispatch2 = jest.fn();
    const wrapper = shallow(<CreateItems onAddInputChanged={dispatch} addItems={dispatch2}/>);
    const submitButton = wrapper.find('button');
    submitButton.simulate('click');
    expect(dispatch2).toHaveBeenCalled();
  });
});
