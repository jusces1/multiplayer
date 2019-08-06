import React from 'react';
import {shallow} from 'enzyme';

import MetronomeHitHistory from '../../src/components/MetronomeHitHistory';
import MetronomeHit from '../../src/components/MetronomeHit';

describe('MetronomeHitHistory', () => {
  it('renders empty hit list', () => {
    expect(shallow(<MetronomeHitHistory hits={[]} frequency={100} />)).to.exist;
  });

  it('renders hits with fractions in reverse order', () => {
    const frequency = 1000;
    const hits = [{miss: 100}, {miss: 200}];
    const hitList = shallow(<MetronomeHitHistory hits={hits} frequency={frequency}/>);
    expect(hitList).to.contain([
      <MetronomeHit key={1} index={1} missInMilliseconds={200} missInFractions={0.2} />,
      <MetronomeHit key={0} index={0} missInMilliseconds={100} missInFractions={0.1} />
    ]);
  });
});
