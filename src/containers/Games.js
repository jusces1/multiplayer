import React from 'react';
import MetronomeGame from '../components/MetronomeGame';
import {connect} from 'react-redux';
import {CLOSE_GAME, createHitRequest} from '../actions/Actions';
import PropTypes from 'prop-types';
import {openGames} from '../reducers/MetronomeRerducer';

const Games = (props) => {
  const game = props.games.find( (x) => x.id === props.match.params.id);
  return (
    <div className="games">
      {game ? <MetronomeGame
        frequencyMs={game.frequency}
        hits={game.hits}
        preliminar={game.preliminar}
        onHit={() => props.createHitRequest({gameId: game.id})}
        onClose={() => props.closeGame({gameId: game.id})}
      /> : <div>No game found</div>}
    </div>
  );
};

Games.propTypes = {
  games: PropTypes.array.isRequired,
  closeGame: PropTypes.func.isRequired,
  createHitRequest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = ({MetronomeRerducer}) => ({
  games: openGames(MetronomeRerducer.games),
});

const mapDispatchToProps = (dispatch) => ({
  closeGame: ({gameId}) => dispatch({type: CLOSE_GAME, payload: gameId}),
  createHitRequest: (gameId) => dispatch(createHitRequest(gameId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Games);
