'use strict';
import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import UpdateCardsModal from './update-cards-modal';
//testing for the create-board-modal
describe('update-cards-modal', () => {
  it('should render', () => {
    shallow(<UpdateCardsModal isOpen={true}/>);
  });
  //take snapshot
  it('snapshot should match', () => {
    const wrapper = shallow(<UpdateCardsModal isOpen={true}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
