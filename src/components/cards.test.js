'use strict';
import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow, mount} from 'enzyme';
import {Cards} from './cards';
import {seedCardslistInput, seedCardsInput} from '../testutils/seeddata';
import * as actions from '../actions/cards';
import renderer from 'react-test-renderer';

//mock actions
const mockDeleteCards = {
  type: 'DELETE_CARDS'
};
const mockUpdateCards = {
  type: 'UPDATE_CARDS'
};
//setup mock api
jest.mock('../actions/cards', () => Object.assign({},
require.requireActual('../actions/cards'),
{
  //needed for true comparison
  deleteCards: jest.fn().mockImplementation(() => {
    return mockDeleteCards;
  }),
  //needed for true comparison
  updateCards: jest.fn().mockImplementation(() => {
    return mockUpdateCards;
  })
}
));
//testing for cards component
describe('Cards component', function() {
  let cards = {};
  let cardslist = {};
  //setup before all tests
  beforeEach(() => {
    boardId = '46mdujckqs45tkdsh2jdxz';
    cardsListId = '2skdde39hzdo08aqcdgd';
    let ids = ['2skdde39hzdo08aqcdgd', '14w43d4opubteu021ato', 'kd5o3ve2858vpjxd7wjp'];
    let words = ['XML Health', 'Bedfordshire Illinois Liaison', 'Sports Analyst Cambridgeshire'];
    let ids2 = ['432e39hzdo08aqcdgd', '6532opubteu021ato', '5643e2858vpjxd7wjp'];
    let words2 = ['eat dinner', 'tea tree oil', 'masking tape'];
    cardslist = seedCardslistInput('46mdujckqs45tkdsh2jdxz', ids, words);
    cards = seedCardsInput('2skdde39hzdo08aqcdgd', ids2, words2);
  });
  //tear down after tests are complete
  afterEach(() => {
    cards = {};
    cardslist = {};
  });
  //ensure card is rendered without issues
  it('should render', () => {
    const dispatch = jest.fn();
    shallow(<Cards cards={cards} boardId={boardId}
    cardsList={cardsList} cardsListId={cardsListId}/>);
  });
  // it('Renders the Cards item', function() {
  //   //create instance of render
  //   var renderer = TestUtils.createRenderer();
  //   //render an image component
  //   renderer.render(<Cards.CardsContainer cards={cardItems.cards} boardId={cardItems.boardId}
  //     cardsList={cardItems.cardsList} cardsListId={cardItems.cardsListId}/>);
  //   //get the rendered react component to test against
  //   var result = renderer.getRenderOutput();
  //   //test props for various values
  //   result.type.should.equal('div');
  //   var resultListItem = result.props.children;
  //   resultListItem[0].type.should.equal('ul');
  //   var cards = resultListItem[0].props.children;
  //   // console.log(result);
  //   cards[0].props.children[0].props.value.should.equal(cardItems.cards[1].text);
  // });
  //test for performing click event on add cards
  // it('should simulate a click event on add Cards input', () => {
  //   //set up a mockstore
  //   const store = mockStore({
  //     cardsList: cardItems.cardsList,
  //     cards: cardItems.cards
  //   });
  //   //create instance of render and pass store to it
  //   let renderer = TestUtils.renderIntoDocument(
  //     <Provider store={store}>
  //       <Cards.Container boardId={cardItems.boardId} cardsListId={cardItems.cardsListId}/>
  //     </Provider>
  //   );
  //   //get the input for cards
  //   let inputs = TestUtils.scryRenderedDOMComponentsWithTag(renderer, 'input');
  //   inputs.length.should.equal(4);
  //   TestUtils.Simulate.click(inputs[3]);
  //   let inputs2 = TestUtils.scryRenderedDOMComponentsWithTag(renderer, 'input');
  //   // //check that previous input is there plus two inputs from create-items
  //   inputs2.length.should.equal(6);
  //   inputs2[4].value = 'happy';
  //   TestUtils.Simulate.change(inputs2[4]);
  //   //simulate button click
  //   TestUtils.Simulate.click(inputs2[5]);
  // });
  //test for deleting a card
  // it('should simulate a click event on delete cardslist input', () => {
  //   //set up a mockstore
  //   const store = mockStore({
  //     cardsList: cardItems.cardsList,
  //     cards: cardItems.cards
  //   });
  //   //create instance of render and pass store to it
  //   let renderer = TestUtils.renderIntoDocument(
  //     <Provider store={store}>
  //       <Cards.Container boardId={cardItems.boardId} cardsListId={cardItems.cardsListId}/>
  //     </Provider>
  //   );
  //   //get the input for boards
  //   let inputs = TestUtils.scryRenderedDOMComponentsWithTag(renderer, 'input');
  //   inputs.length.should.equal(4);
  //   //simulate button click
  //   TestUtils.Simulate.click(inputs[1]);
  // });
  // it('should simulate a click event on edit cards input', () => {
  //   //set up a mockstore
  //   const store = mockStore({
  //     cardsList: cardItems.cardsList,
  //     cards: cardItems.cards
  //   });
  //   //create instance of render and pass store to it
  //   let renderer = TestUtils.renderIntoDocument(
  //     <Provider store={store}>
  //       <Cards.Container boardId={cardItems.boardId} cardsListId={cardItems.cardsListId}/>
  //     </Provider>
  //   );
  //   //get the input for boards
  //   let inputs = TestUtils.scryRenderedDOMComponentsWithTag(renderer, 'input');
  //   inputs.length.should.equal(4);
  //   //simulate button click
  //   TestUtils.Simulate.click(inputs[2]);
  //   inputs[3].value = 'happy';
  //   TestUtils.Simulate.change(inputs[0]);
  //   //simulate button click
  //   TestUtils.Simulate.keyDown(inputs[0], {key: 'Enter', keyCode: 13, which: 13});
  // });
});
