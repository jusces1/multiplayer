import React from 'react';
import {shallow} from 'enzyme';

import NewGameForm from '../../src/components/NewGameForm';

describe('NewGameForm', () => {
  it('renders successfully', () => {
    expect(shallow(<NewGameForm onStart={sinon.stub()} />)).to.exist;
  });

  it('calls start with provided frequency', () => {
    const onStart = sinon.stub();
    const form = shallow(<NewGameForm onStart={onStart} />);
    const frequency = '100';

    form.find('input').simulate('change', {target: {value: frequency}});
    form.find('button').simulate('click');

    expect(onStart).to.have.been.calledWith({frequency: 100});
  });
});
