'use strict';
import React from 'react';
import Textarea from './textarea';
import {shallow} from 'enzyme';

describe('checkbox', () => {
  let meta, input, label;
  it('renders without problems', () => {
    input = {
      name: 'acceptTerms'
    }
    meta = {touched: false}
    shallow(<Textarea meta={meta} input={input}/>);
  });
});
