import React, {Fragment} from 'react';
import Instructions from '../components/Instructions';
import NewGameForm from '../components/NewGameForm';
import LogedInPlayers from '../components/LogedInPlayers.jsx';
import {connect} from 'react-redux';
import {createGameRequest} from '../actions/Actions';
import PropTypes from 'prop-types';
import {totalMiss, averageMissPercentage} from '../reducers/MetronomeRerducer';
import {webSocketConnection} from '../middlewares/apiMiddleware';

const Controls = (props) => {
  return (
    <Fragment>
      {props.location.pathname === '/players' && <LogedInPlayers
        logedInPlayers={props.logedInPlayers}
        player={props.player}
        disconnect={webSocketConnection.close}
      /> }
      {props.location.pathname !== '/players' && <div>
        <Instructions
          player={props.player}
          totalMiss={props.totalMiss}
          averageMissPercentage={props.averageMissPercentage}
          loading={props.loading}
          error={props.error}
        />
        <NewGameForm onStart={props.createGameRequest} />
      </div> }
    </Fragment>
  );
};

Controls.propTypes = {
  totalMiss: PropTypes.number.isRequired,
  averageMissPercentage: PropTypes.number.isRequired,
  player: PropTypes.object.isRequired,
  createGameRequest: PropTypes.func.isRequired,
  logedInPlayers: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = ({MetronomeRerducer}) => ({
  games: MetronomeRerducer.games,
  player: MetronomeRerducer.player,
  logedInPlayers: MetronomeRerducer.logedInPlayers,
  totalMiss: totalMiss(MetronomeRerducer.games),
  averageMissPercentage: averageMissPercentage(MetronomeRerducer.games),
  history: PropTypes.object.isRequired
});

const mapDispatchToProps = (dispatch) => ({
  createGameRequest: ({frequency}) => dispatch(createGameRequest(frequency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
