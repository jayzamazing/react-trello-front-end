'use strict';
import React from 'react';
import Input from './input';
import {shallow} from 'enzyme';

describe('checkbox', () => {
  let meta, input, label;
  it('renders without problems', () => {
    input = {
      name: 'acceptTerms'
    }
    label = 'I accept the Terms of Service';
    meta = {touched: false}
    shallow(<Input meta={meta} input={input} label={label}/>);
  });
});
