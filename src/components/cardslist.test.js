'use strict';
import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow, mount} from 'enzyme';
import component, {Cardslist} from './cardslist';
import {seedCardslistInput, seedBoardsInput, seedCardsInput} from '../testutils/seeddata';
import * as actions from '../actions/cardslist';

describe('Cardslist component', () => {
  let boards = {}, cardslist = {}, cards = {}, match = {}, boardKeys, cardslistKeys, cardsKeys;
beforeEach(() => {
  let ids = ['46mdujckqs45tkdsh2jdxz', '346rfdghsdhteu021ato', 'kd5o3ve2858qggfqw4rtfda'];
  let words = ['XML Health', 'Bedfordshire Illinois Liaison', 'Sports Analyst Cambridgeshire'];
  let ids2 = ['2skdde39hzdo08aqcdgd', '14w43d4opubteu021ato', 'kd5o3ve2858vpjxd7wjp'];
  let words2 = ['XML Health', 'Bedfordshire Illinois Liaison', 'Sports Analyst Cambridgeshire'];
  let ids3 = ['432e39hzdo08aqcdgd', '6532opubteu021ato', '5643e2858vpjxd7wjp'];
  let words3 = ['eat dinner', 'tea tree oil', 'masking tape'];
  boards = seedBoardsInput(ids, words, ids2);
  cardslist = seedCardslistInput(ids, words2, ids2);
  cards = seedCardsInput(ids2, words3, ids3);
  boardKeys = Object.keys(boards);
  cardslistKeys = Object.keys(cardslist);
  cardsKeys = Object.keys(cards);
  match = {
    params: {
      board: ':' + boards[boardKeys[0]].title,
      boardId: ':' + boardKeys[0]
    }
  };
});
  afterEach(() => {
    boards = {}, cardslist = {}, cards = {}, match = {};
  });
  //ensure cardslist renders without any issues
  it('should render', () => {
    const dispatch = jest.fn();
    shallow(<Cardslist match={match} boards={boards} cardslist={cardslist} cards={cards} dispatch={dispatch}/>)
  });
  //render and check against previous snapshot
  it('cardslist snapshot', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<Cardslist match={match} boards={boards} cardslist={cardslist} cards={cards} dispatch={dispatch}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  //click on add button and check before and after snapshots
  it('add cardslist click snaphot', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<Cardslist match={match} boards={boards} cardslist={cardslist} cards={cards} dispatch={dispatch}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('[name="createCardslist"]').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  //check dispatch is fired off when delete button is clicked
  it('dispatches delete cardslist', () => {
    const deleteCardslist = jest.fn();
    const wrapper = shallow(<Cardslist match={match} boards={boards} cardslist={cardslist} cards={cards} deleteCardslist={deleteCardslist}/>);
    wrapper.find('[name="deleteCardslist"]').at(0).simulate('click');
    expect(deleteCardslist).toHaveBeenCalledWith(cardslistKeys[0], match.params.boardId.replace(':', ''), boards[boardKeys[0]]);
  });
});
