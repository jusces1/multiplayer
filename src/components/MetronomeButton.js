import React from 'react';
import PropTypes from 'prop-types';

const MetronomeButton = ({onHit}) => {
  return <button className="metronomeButton" onClick={onHit}>NOW</button>;
};

MetronomeButton.propTypes = {
  onHit: PropTypes.func.isRequired
};

export default MetronomeButton;
