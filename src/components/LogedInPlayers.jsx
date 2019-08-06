import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const LogedInPlayers = ({logedInPlayers, player, disconnect}) => {
  return (
    <Fragment class="center">
       {logedInPlayers.map((rec, key) => (
        <b key={key} className="instructions">{rec.name} {player.playerId === rec.id && <span className="you">(you)</span> }</b>
       ))}
       <button onClick={disconnect}>Disconnect</button>
    </Fragment>
  );
};

LogedInPlayers.propTypes = {
    logedInPlayers: PropTypes.array.isRequired,
    player: PropTypes.object.isRequired,
    disconnect: PropTypes.func.isRequired
};

export default LogedInPlayers;
