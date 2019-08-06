import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {openGames} from '../reducers/MetronomeRerducer';
import {Link} from 'react-router-dom';


const GamesList = (props) => {
  const games = props.games.map((game, index) => <Link key={index} to={`game/${game.id}`}>
    <li>Game with: {game.frequency} ms frequency</li> </Link>);
  const closedGames = props.closed.map((game, index) =>
    <li key={index}>Closed game with: {game.frequency} ms frequency</li>);
  return (
    <div>
      {props.match.path === '/ongoingGames' ? games : closedGames}
    </div>
  );
};

GamesList.propTypes = {
  games: PropTypes.array.isRequired,
  closed: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = ({MetronomeRerducer}) => ({
  games: openGames(MetronomeRerducer.games),
  closed: MetronomeRerducer.closedGames,
});

export default connect(mapStateToProps, {})(GamesList);
