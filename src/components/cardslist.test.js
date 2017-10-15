// 'use strict';
// import React from 'react';
// import TestUtils from 'react-addons-test-utils';
// import chai from 'chai';
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import { Provider } from 'react-redux';
// import * as Cardslist from './cardslist';
// import {Cards} from '../cards'
// import deepEqual from 'chai-shallow-deep-equal';
// import nock from 'nock';
// import {seedBoards2, seedCardslists2, seedCards2} from '../testutils/seeddata';
//
// chai.use(deepEqual);
// chai.should();
// const middlewares = [ thunk ];
// const mockStore = configureMockStore(middlewares);
//
//
// describe('Cardslist component', function() {
//   let boards = {}, cardslist = {}, cards = {}, params = {}, boardKeys, cardslistKeys, cardsKeys;
//   beforeEach(() => {
//     nock('http://localhost/')
//     .post('/cardslist')
//     .query(true)
//     .reply(201);
//     boards = seedBoards2(3);
//     cardslist = seedCardslists2(boards);
//     cards = seedCards2(cardslist);
//     boardKeys = Object.keys(boards);
//     cardslistKeys = Object.keys(cardslist);
//     cardsKeys = Object.keys(cards);
//     params = {
//       boardName: ':' + boards[boardKeys[0]].title,
//       boardId: ':' + boardKeys[0]
//     };
//   });
//   afterEach(() => {
//     boards = {}, cardslist = {}, cards = {}, params = {};
//     nock.cleanAll();
//   });
//   it('Renders the cardslist item', function() {
//     //create instance of render
//     var renderer = TestUtils.createRenderer();
//     //render an image component
//     renderer.render(<Cardslist params={params} boards={boards} cardslist={cardslist} cards={cards}/>);
//     //get the rendered react component to test against
//     var board = renderer.getRenderOutput();
//     board.type.should.equal('div');
//     board.props.className.should.equal('board');
//     var board_name = board.props.children[0];
//     board_name.type.should.equal('div');
//     board_name.props.className.should.equal('board-name');
//     var h1_0 = board_name.props.children;
//     h1_0.type.should.equal('h1');
//     h1_0.props.children.should.equal(boards[boardKeys[0]].title);
//     var cardslist_cp = board.props.children[1];
//     cardslist_cp.type.should.equal('div');
//     cardslist_cp.props.className.should.equal('board-list');
//     var cards_cp = cardslist_cp.props.children[0];
//     cards_cp.type.should.equal('ul');
//     var cardItem = cards_cp.props.children[0];
//     cardItem.type.should.equal('li');
//     cardItem.props.children[0].type.should.equal('input');
//     cardItem.props.children[0].props.value.should.equal(cardslist[cardslistKeys[0]].title);
//     cardItem.props.children[1].type.WrappedComponent.should.shallowDeepEqual(Cards.Cards);
//     cardItem.props.children[1].props.cardslistId.should.equal(cardslist[cardslistKeys[0]]._id);
//     cardItem.props.children[1].props.boardId.should.equal(cardslist[cardslistKeys[0]].boardId);
//     cardItem.props.children[2].type.should.equal('input');
//     cardItem.props.children[2].props.type.should.equal('button');
//     cardItem.props.children[2].props.value.should.equal('Delete Cardslist');
//     cardItem.props.children[3].type.should.equal('input');
//     cardItem.props.children[3].props.type.should.equal('button');
//     cardItem.props.children[3].props.value.should.equal('Edit Cardslist');
//   });
//   //test for performing click event on add cardslist
//   it.only('should simulate a click event on add CardsList input', () => {
//     //set up a mockstore
//     const store = mockStore({
//       boards: boards,
//       cardslist: cardslist,
//       cards: cards
//     });
//     //create instance of render and pass store to it
//     let renderer = TestUtils.renderIntoDocument(
//       <Provider store={store}>
//         <Cardslist.Container params={params} />
//       </Provider>
//     );
//     //get the input for cards
//     let inputs = TestUtils.scryRenderedDOMComponentsWithTag(renderer, 'input');
//     inputs.length.should.equal(40);
//     //simulate button click
//     TestUtils.Simulate.click(inputs[39]);
//     //get all buttons on the page after button press
//     let inputs2 = TestUtils.scryRenderedDOMComponentsWithTag(renderer, 'input');
//     //check that previous input is there plus two inputs from create-items
//     inputs2.length.should.equal(42);
//     inputs2[40].value = 'happy';
//     TestUtils.Simulate.change(inputs2[40]);
//     TestUtils.Simulate.click(inputs2[41]);
//   });
//   it('should simulate a click event on delete cardslist input', () => {
//     const store = mockStore({
//       boards: boards.boards,
//       cardsList: boards.cardsList,
//       cards: boards.cards
//     });
//     //create instance of render and pass store to it
//     let renderer = TestUtils.renderIntoDocument(
//       <Provider store={store}>
//         <Cardslist.Container params={params} />
//       </Provider>
//     );
//     //get the input for boards
//     let inputs = TestUtils.scryRenderedDOMComponentsWithTag(renderer, 'input');
//     inputs.length.should.equal(8);
//     //simulate button click
//     TestUtils.Simulate.click(inputs[5]);
//   });
//   it('should simulate a click event on edit cardslist input', () => {
//     const store = mockStore({
//       boards: boards.boards,
//       cardsList: boards.cardsList,
//       cards: boards.cards
//     });
//     //create instance of render and pass store to it
//     let renderer = TestUtils.renderIntoDocument(
//       <Provider store={store}>
//         <Cardslist.Container params={params} />
//       </Provider>
//     );
//     //get the input for boards
//     let inputs = TestUtils.scryRenderedDOMComponentsWithTag(renderer, 'input');
//     inputs.length.should.equal(8);
//     //simulate button click
//     TestUtils.Simulate.click(inputs[6]);
//     inputs[3].value = 'happy';
//     TestUtils.Simulate.change(inputs[0]);
//     TestUtils.Simulate.keyDown(inputs[0], {key: 'Enter', keyCode: 13, which: 13});
//   });
// });
