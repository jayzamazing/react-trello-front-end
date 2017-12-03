'use strict';
import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow, mount} from 'enzyme';
import component, {Cards} from './cards';
import {seedCardslistInput, seedCardsInput} from '../testutils/seeddata';
import * as actions from '../actions/cards';

describe('Cards component', () => {
  let boards = {}, cardslist = {}, cards = {}, params = {}, boardKeys, cardslistKeys, cardsKeys;
beforeEach(() => {
  let ids = ['46mdujckqs45tkdsh2jdxz', '346rfdghsdhteu021ato', 'kd5o3ve2858qggfqw4rtfda'];
  let ids2 = ['2skdde39hzdo08aqcdgd', '14w43d4opubteu021ato', 'kd5o3ve2858vpjxd7wjp'];
  let words2 = ['XML Health', 'Bedfordshire Illinois Liaison', 'Sports Analyst Cambridgeshire'];
  let ids3 = ['432e39hzdo08aqcdgd', '6532opubteu021ato', '5643e2858vpjxd7wjp'];
  let words3 = ['eat dinner', 'tea tree oil', 'masking tape'];
  cardslist = seedCardslistInput(ids, words2, ids2, ids3);
  cards = seedCardsInput(ids2, words3, ids3);
  cardslistKeys = Object.keys(cardslist);
  cardsKeys = Object.keys(cards);
});
  afterEach(() => {
    cardslist = {}, cards = {};
  });
  //ensure cards renders without any issues
  it('should render', () => {
    const dispatch = jest.fn();
    shallow(<Cards cardslistId={cardslistKeys[0]} cardslist={cardslist} cards={cards} dispatch={dispatch}/>)
  });
  //render and check against previous snapshot
  it('cards snapshot', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<Cards cardslistId={cardslistKeys[0]} cardslist={cardslist} cards={cards} dispatch={dispatch}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  //click on add button and check before and after snapshots
  it('add cards click snaphot', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<Cards cardslistId={cardslistKeys[0]} cardslist={cardslist} cards={cards} dispatch={dispatch}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('[name="createcards"]').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
