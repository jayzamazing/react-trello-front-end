'use strict';
import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import component, {Cards} from './cards';
import {seedCardslistInput, seedCardsInput} from '../testutils/seeddata';
import UpdateCards from './update-cards';

describe('update-cards', () => {
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
    cardslist = {}, cards = {}, cardslistKeys = {}, cardsKeys = {}, boards = {}, params = {}, boardKeys = {};
  });
  it('should render', () => {
    shallow(<UpdateCards _id={cardsKeys[0]} cardslist={cardslist}/>);
  });
  //render and check against previous snapshot
  it('cards snapshot', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<UpdateCards _id={cardsKeys[0]} cardslist={cardslist}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  //click on spans to see how they modify state
  it('update cards click', () => {
    const wrapper = shallow(<UpdateCards _id={cardsKeys[0]} cardslist={cardslist}/>);
    expect(wrapper.state()).toEqual({ editCardsModalIsOpen: false, modaloredit: true });
    wrapper.find('span').at(0).simulate('click');
    expect(wrapper.state()).toEqual({ editCardsModalIsOpen: true, modaloredit: true });
    wrapper.find('span').at(1).simulate('click');
    expect(wrapper.state()).toEqual({ editCardsModalIsOpen: true, modaloredit: false });
  });
});
