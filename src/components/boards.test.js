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
jest.mock('../actions/boards', () => Object.assign({},
require.requireActual('../actions/boards'),
{
  getBoards: jest.fn().mockImplementation(() => {
    return mockFindBoards;
  }),
  deleteBoards: jest.fn().mockImplementation(() => {
    return mockDeleteBoards;
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
//   //test for performing clic event on delete board
//   it('should simulate a click event on delete board input', () => {//TODO continue from here
//     //set up a mockstore
//     const store = mockStore({'boards': boards});
//     //create instance of render and pass store to it
//     let renderer = renderer.renderIntoDocument(
//       <Provider store={store}>
//         <BoardsContainer/>
//       </Provider>
//     );
//     //get the input for boards
//     let inputs = renderer.scryRenderedDOMComponentsWithTag(renderer, 'input');
//     inputs.length.should.equal(10);
//     //simulate button click
//     renderer.Simulate.click(inputs[7]);
//   });
//   it.only('should simulate a click event on edit board input', () => {
//     //set up a mockstore
//     const store = mockStore({'boards': boards});
//     //create instance of render and pass store to it
//     let renderer = renderer.renderIntoDocument(
//       <Provider store={store}>
//         <BoardsContainer/>
//       </Provider>
//     );
//     //get the input for boards
//     let inputs = renderer.scryRenderedDOMComponentsWithTag(renderer, 'input');
//     inputs.length.should.equal(10);
//     //simulate button click
//     renderer.Simulate.click(inputs[8]);
//     inputs[6].value = 'happy';
//     // console.log(inputs[5]);
//     renderer.Simulate.change(inputs[6]);
//     //simulate button click
//     renderer.Simulate.keyDown(inputs[6], {key: 'Enter', keyCode: 13, which: 13});
//   });
});
