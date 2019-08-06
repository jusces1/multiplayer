import React from 'react';
import PropTypes from 'prop-types';

const classNameForHit = (missInFractions) => {
  if (missInFractions > 0.2) {
    return 'bad-hit';
  } else if (missInFractions < 0.1) {
    return 'good-hit';
  } else {
    return 'okay-hit';
  }
};

const MetronomeHit = ({index, missInMilliseconds, missInFractions}) => {
  const className = classNameForHit(missInFractions);
  return (
    <div className={className}>
      Try {index}: Missed by {missInMilliseconds} milliseconds
    </div>
  );
};

MetronomeHit.propTypes = {
  index: PropTypes.number.isRequired,
  missInFractions: PropTypes.number.isRequired,
  missInMilliseconds: PropTypes.number.isRequired
};

export default MetronomeHit;
