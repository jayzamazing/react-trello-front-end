import React from 'react';
import {shallow} from 'enzyme';
import CreateItems from './create-items';

describe('<create-items/>', () => {
  it('Render component', () => {
    const dispatch = jest.fn();
    shallow(<CreateItems/>)
  });
  it('renders the form with the inputs', () => {
    const dispatch = jest.fn();
    const item = shallow(<CreateItems/>);
    expect(item.contains(<input type="text"/>)).toEqual(true);
    expect(item.contains(<input type="button" value="Submit"/>)).toEqual(true);
  });
});
