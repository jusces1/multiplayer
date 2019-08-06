import React from 'react';
import {shallow} from 'enzyme';

import MetronomeGame from '../../src/components/MetronomeGame';
import MetronomeButton from '../../src/components/MetronomeButton';

describe('MetronomeGame', () => {
  it('renders successfully', () => {
    expect(shallow(
      <MetronomeGame
        frequencyMs={100}
        hits={[]}
        onHit={sinon.stub()}
        onClose={sinon.stub()}
        preliminar={5}
      />
    )).to.exist;
  });

  it('calls onHit when button hit', () => {
    const onHit = sinon.stub();
    const game = shallow(
      <MetronomeGame
        frequencyMs={100}
        hits={[]}
        onHit={onHit}
        onClose={sinon.stub()}
        preliminar={5}
      />
    );
    game.find(MetronomeButton).props().onHit();
    expect(onHit).to.have.been.called;
  });

  it('calls onClose when game close button clicked', () => {
    const onClose = sinon.stub();
    const game = shallow(
      <MetronomeGame
        frequencyMs={100}
        hits={[]}
        onHit={sinon.stub()}
        onClose={onClose}
        preliminar={5}
      />
    );
    game.find('.metronomeButton').simulate('click');
    expect(onClose).to.have.been.called;
  });
});
