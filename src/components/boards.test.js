'use strict';
import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import {Boards} from './boards';
import {seedBoardsInput} from '../testutils/seeddata';
import * as actions from '../actions/boards';
import {MemoryRouter as Router} from 'react-router-dom';

//testing for the boards class
describe('Boards component', () => {
  let boards = {};
  //setup before all tests
  beforeEach(() => {
    let ids = ['2skdde39hzdo08aqcdgd', '14w43d4opubteu021ato', 'kd5o3ve2858vpjxd7wjp'];
    let ids2 = ['2skdde39hzdo08aqcdgd', '14w43d4opubteu021ato', 'kd5o3ve2858vpjxd7wjp'];
    let words = ['XML Health', 'Bedfordshire Illinois Liaison', 'Sports Analyst Cambridgeshire'];
    boards = seedBoardsInput(ids, words, ids2);
  });
  //tear down after tests are complete
  afterEach(() => {
    boards = {};
  });
  //ensure board is rendered without issues
  it('should render', () => {
    const dispatch = jest.fn();
    shallow(<Boards boards={boards} dispatch={dispatch}/>);
  });
  //render board and check against the previous snapshot
  it('boards snapshot', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(
      <Boards boards={boards} dispatch={dispatch}/>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  //check dispatch is fired off when delete button is clicked
  it('dispatches delete board', () => {
    const deleteBoard = jest.fn();
    const dispatch = jest.fn();
    const wrapper = shallow(<Boards boards={boards} dispatch={dispatch} deleteBoard={deleteBoard}/>);
    const keys = Object.keys(boards);
    wrapper.find('[name="deleteBoard"]').at(0).simulate('click');
    expect(deleteBoard).toHaveBeenCalledWith(keys[0]);
  });
  //take snapshot and ensure that createboardmodal isOpen is set to true
  it('click on create board snapshot', () => {
    const store = boards;
    const dispatch = jest.fn();
    const wrapper = shallow(
      <Boards boards={boards} dispatch={dispatch} />
    );
    const keys = Object.keys(boards);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('[name="createBoard"]').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
