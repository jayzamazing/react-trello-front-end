'use strict';
import React from 'react';
// import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';
import {Boards} from './boards';
import {seedBoards2} from '../testutils/seeddata';
import renderer from 'react-test-renderer';
let boards = {};

//mock find boards action
const mockFindBoards = {
  type: 'FIND_BOARDS'
};
jest.mock('../actions/boards', () => Object.assign({},
require.requireActual('../actions/boards'),
{
  getBoards: jest.fn().mockImplementation(() => {
    return mockFindBoards;
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
    const value = renderer.create(<Boards boards={boards} dispatch={dispatch}/>).toJSON();
    expect(value).toMatchSnapshot();
  });
//   //test for performing click event on add board
  // it('should simulate a click event on add board input', () => {
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
//     renderer.Simulate.click(inputs[9]);
//     //get all buttons on the page after button press
//     let inputs2 = renderer.scryRenderedDOMComponentsWithTag(renderer, 'input');
//     //check that previous input is there plus two inputs from create-items
//     inputs2.length.should.equal(12);
//     inputs2[10].value = 'happy';
//     renderer.Simulate.change(inputs2[10]);
//     renderer.Simulate.click(inputs2[11]);
//   });
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
