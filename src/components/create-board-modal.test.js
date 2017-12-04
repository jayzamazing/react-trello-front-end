'use strict';
import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import CreateBoardModal from './create-board-modal';
//testing for the create-board-modal
describe('create-board-modal', () => {
  it('should render', () => {
    shallow(<CreateBoardModal isOpen={true}/>);
  });
  //take snapshot
  it('snapshot should match', () => {
    const wrapper = shallow(<CreateBoardModal isOpen={true}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
