import React from 'react';
import PropTypes from 'prop-types';
import MetronomeHitHistory from './MetronomeHitHistory';
import MetronomeButton from './MetronomeButton';
import {Link} from 'react-router-dom';

const MetronomeGame = ({frequencyMs, hits, onHit, onClose, preliminar}) => {
  return (
    <div className="metronomeGame">
      <div>Click the button exactly every {frequencyMs} milliseconds</div>
      {preliminar !== 0 && <div className="preliminar" >Preliminar miss calculated in browser is {preliminar}</div> }
      <Link to={`/ongoingGames`}><button className="metronomeButton close" onClick={onClose}>Close game</button></Link>
      <MetronomeButton onHit={onHit} />
      <MetronomeHitHistory hits={hits} frequency={frequencyMs} />
    </div>
  );
};

MetronomeGame.propTypes = {
  frequencyMs: PropTypes.number.isRequired,
  hits: PropTypes.array.isRequired,
  onHit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  preliminar: PropTypes.number.isRequired
};

export default MetronomeGame;
