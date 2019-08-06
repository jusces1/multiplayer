import React from 'react';
import {shallow} from 'enzyme';

import Instructions from '../../src/components/Instructions';

describe('Instructions', () => {
  it('renders successfully', () => {
    expect(shallow(<Instructions name='foo' totalMiss={5} averageMissPercentage={50} player={{playerName: 'TESTAs'}}
      loading={false}
      error={{status: false, message: ''}}/>))
      .to.exist;
  });
});
