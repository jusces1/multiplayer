import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const Instructions = ({player, totalMiss, averageMissPercentage}) => {
  return (
    <Fragment>
      <div className="instructions">{`Hi ${player.playerName}, let's play Human Metronome!`}</div>
      <div className="instructions">{`Your total miss thus far is ${totalMiss} ms 
        (${parseFloat(averageMissPercentage).toFixed(2)}%)`}</div>
    </Fragment>
  );
};

Instructions.propTypes = {
  player: PropTypes.object.isRequired,
  totalMiss: PropTypes.number.isRequired,
  averageMissPercentage: PropTypes.number.isRequired,
};

export default Instructions;
