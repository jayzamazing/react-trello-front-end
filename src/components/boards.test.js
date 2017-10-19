'use strict';
import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow, mount} from 'enzyme';
import {Boards} from './boards';
import {seedBoards2} from '../testutils/seeddata';
import * as actions from '../actions/boards';
import renderer from 'react-test-renderer';
let boards = {};

//mock find boards action
const mockFindBoards = {
  type: 'FIND_BOARDS'
};
const mockDeleteBoards = {
  type: 'DELETE_BOARDS'
};
const mockUpdateBoards = {
  type: 'UPDATE_BOARDS'
};
jest.mock('../actions/boards', () => Object.assign({},
require.requireActual('../actions/boards'),
{
  getBoards: jest.fn().mockImplementation(() => {
    return mockFindBoards;
  }),
  deleteBoards: jest.fn().mockImplementation(() => {
    return mockDeleteBoards;
  }),
  updateBoards: jest.fn().mockImplementation(() => {
    return mockUpdateBoards;
  })
}
));
//testing for the boards class
describe('Boards component', () => {
  //setup before all tests
  beforeEach(() => {
    let ids = ['2skdde39hzdo08aqcdgd', '14w43d4opubteu021ato', 'kd5o3ve2858vpjxd7wjp'];
    let words = ['XML Health', 'Bedfordshire Illinois Liaison', 'Sports Analyst Cambridgeshire'];
    boards = seedBoards2(0, ids, words);
  });
  //tear down after tests are complete
  afterEach(() => {
    boards = {};
  });
  it('should render', () => {
    const dispatch = jest.fn();
    shallow(<Boards boards={boards} dispatch={dispatch}/>);
  });
  it('dispatches findBoards on mount', () => {
    const dispatch = jest.fn();
    shallow(<Boards boards={boards} dispatch={dispatch}/>);
    expect(dispatch).toHaveBeenCalledWith(mockFindBoards);
  });
  it('boards snapshot', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<Boards boards={boards} dispatch={dispatch}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('add board click snapshot', () => {
    const dispatch = jest.fn();
    const wrapper = mount(<Boards boards={boards} dispatch={dispatch}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('[name="addBoard"]').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('dispatches delete board', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<Boards boards={boards} dispatch={dispatch}/>);
    //clear previous dispatches
    dispatch.mockClear();
    const instance = wrapper.instance();
    const keys = Object.keys(boards);
    instance.deleteBoard(keys[1]);
    expect(dispatch).toHaveBeenCalledWith(actions.deleteBoards(keys[1]));
  });
  it('delete board snapshot', () => {
    const dispatch = jest.fn();
    const wrapper = mount(<Boards boards={boards} dispatch={dispatch}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('[name="deleteBoard"]').at(2).simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('dispatches update board', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<Boards boards={boards} dispatch={dispatch}/>);
    //clear previous dispatches
    dispatch.mockClear();
    const instance = wrapper.instance();
    const keys = Object.keys(boards);
    instance.updateBoard(keys[1]);
    expect(dispatch).toHaveBeenCalledWith(actions.updateBoards(keys[1]));
  });
  it('update board snapshot', () => {
    const dispatch = jest.fn();
    const wrapper = mount(<Boards boards={boards} dispatch={dispatch}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('[name="editBoard"]').at(0).simulate('click');
    const keys = Object.keys(boards);
    wrapper.find('[name="boardName"]').at(0).simulate('change', { target: { value: 'testing', id: keys[0] } });
    let test = wrapper.find('[name="boardName"]').at(0);
    wrapper.find('[name="boardName"]').at(0).simulate('keypress', {key: 'Enter'})
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
