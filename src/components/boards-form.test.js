'use strict';
import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow, mount} from 'enzyme';
import component, {Boards} from './boards-form';
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
  //click on add button and check before and after snapshots
  // it.only('add board click snapshot', () => {
  //   const dispatch = jest.fn();
  //   const wrapper = mount(
  //     <Router>
  //       <Boards boards={boards} dispatch={dispatch}/>
  //     </Router>
  //   );
  //   expect(toJson(wrapper)).toMatchSnapshot();
  //   wrapper.find('[name="addBoard"]').simulate('click');
  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });
  //check dispatch is fired off when delete button is clicked
  it('dispatches delete board', () => {
    const deleteBoard = jest.fn();
    const dispatch = jest.fn();
    const wrapper = shallow(<Boards boards={boards} dispatch={dispatch} deleteBoard={deleteBoard}/>);
    const keys = Object.keys(boards);
    wrapper.find('[name="deleteBoard"]').at(0).simulate('click');
    expect(deleteBoard).toHaveBeenCalledWith(keys[0]);
  });
  //click on delete button and check before and after snapshots
  it('delete board snapshot', () => {
    const deleteBoard = jest.fn();
    const dispatch = jest.fn();
    const wrapper = mount(<Boards boards={boards} dispatch={dispatch} deleteBoard={deleteBoard}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('[name="deleteBoard"]').at(2).simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  //check dispatch is fired when update button is clicked
  it('dispatches update board', () => {
    const updateBoard = jest.fn();
    const wrapper = shallow(<Boards boards={boards} updateBoard={updateBoard}/>);
    // const keys = Object.keys(boards);
    wrapper.find('[name="boardName"]').at(0).simulate('keypress', {key: 'Enter'});
    expect(updateBoard).toHaveBeenCalledWith({"key": "Enter"});
  });
  //click on update button and check before and after snapshots
  it('update board snapshot', () => {
    const updateBoard = jest.fn();
    const wrapper = mount(<Boards boards={boards} updateBoard={updateBoard}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('[name="editBoard"]').at(0).simulate('click');
    const keys = Object.keys(boards);
    wrapper.find('[name="boardName"]').at(0).simulate('change', { target: { value: 'testing', id: keys[0] } });
    wrapper.find('[name="boardName"]').at(0).simulate('keypress', {key: 'Enter'})
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
