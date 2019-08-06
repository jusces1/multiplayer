import React from 'react';
import {shallow} from 'enzyme';

import MetronomeButton from '../../src/components/MetronomeButton';

describe('MetronomeButton', () => {
  it('renders successfully', () => {
    expect(shallow(<MetronomeButton onHit={sinon.stub()} />)).to.exist;
  });

  it('calls onHit when button clicked', () => {
    const onHit = sinon.stub();
    const metronomeButton = shallow(<MetronomeButton onHit={onHit} />);
    metronomeButton.find('button').simulate('click');
    expect(onHit).to.have.been.called;
  });
});
