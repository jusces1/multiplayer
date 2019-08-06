import React from 'react';
import {shallow} from 'enzyme';

import MetronomeHit from '../../src/components/MetronomeHit';

describe('MetronomeHit', () => {
  it('renders bad hit', () => {
    const hit = shallow(<MetronomeHit index={0} missInMilliseconds={100} missInFractions={0.5} />);
    expect(hit.find('.bad-hit')).to.exist;
  });

  it('renders okay hit', () => {
    const hit = shallow(<MetronomeHit index={0} missInMilliseconds={100} missInFractions={0.15} />);
    expect(hit.find('.okay-hit')).to.exist;
  });

  it('renders good hit', () => {
    const hit = shallow(<MetronomeHit index={0} missInMilliseconds={100} missInFractions={0.05} />);
    expect(hit.find('.good-hit')).to.exist;
  });
});
