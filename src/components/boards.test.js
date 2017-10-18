'use strict';
import React from 'react';
// import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';
import {Boards} from './boards';
import {seedBoards2} from '../testutils/seeddata';
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
    boards = seedBoards2(3);
  });
  //tear down after tests are complete
  afterEach(() => {
    boards = {};
  });
  it('should render', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<Boards boards={boards}/>);
    console.log(wrapper);
  });
  // test showing board data
  // it('should render the board items', function() {
    //render an image component
    // let component = renderer.create(<Boards boards={boards}/>);
    //get the rendered react component to test against
    // let result = component.toJSON();
    // expect(result).toMatchSnapshot();
    //check class name is correct
    // result.type.should.shallowDeepEqual('div');
    //get props
    // let board = result.props.children;
    // let keys = Object.keys(boards);
    //test props for various values
    // board[0].type.should.equal('ul');
    // board[1].type.should.equal('input');
    // board[1].props.type.should.equal('button');
    // board[1].props.value.should.equal('Add Board');
    // let board_list = board[0].props.children;
    // board_list[0].type.should.shallowDeepEqual('li');
    // board_list[0].props.children[0].type.should.equal('span');
    // let span_input = board_list[0].props.children[0];
    // span_input.props.children.type.should.equal('input');
    // span_input.props.children.props.value.should.equal(boards[keys[0]].title);
    // board_list[0].props.children[1].type.should.equal('input');
    // board_list[0].props.children[1].props.type.should.equal('button');
    // board_list[0].props.children[1].props.value.should.equal('Delete Board');
    // board_list[1].type.should.shallowDeepEqual('li');
    // let span_input2 = board_list[1].props.children[0];
    // span_input2.props.children.type.should.equal('input');
    // span_input2.props.children.props.value.should.equal(boards[keys[1]].title);
    // board_list[1].props.children[1].type.should.equal('input');
    // board_list[1].props.children[1].props.type.should.equal('button');
    // board_list[1].props.children[1].props.value.should.equal('Delete Board');
    // board_list[1].props.children[2].type.should.equal('input');
    // board_list[1].props.children[2].props.type.should.equal('button');
    // board_list[1].props.children[2].props.value.should.equal('Edit Board');
  // });
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
