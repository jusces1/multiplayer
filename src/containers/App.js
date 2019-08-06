import React from 'react';
import LoginForm from '../components/LoginForm';
import '../../css/index.css';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';

import {LOGIN_REQUEST} from '../actions/Actions';
import PropTypes from 'prop-types';
import Game from './Games';
import GameList from './GamesList';
import ToolBar from '../components/ToolBar';

import Controls from './Controls';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.loginForm = React.createRef();
  }

  componentDidMount() {
    // this.loginForm.current.focus();
  }
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div className="app">
          {this.props.loggedIn && <ToolBar/>}
          {this.props.loading && <div className="instructions loader">Loading..</div>}
          {this.props.error.status && <div className="instructions error">{`${this.props.error.message}`}</div>}

          <Route exact path="/" render={() => !this.props.loggedIn ?
            <LoginForm ref={this.loginForm}
              onEnter={this.props.login}
              status={this.props.status}
              history={this.props.history}
              disconectReason={this.props.disconectReason} /> :
            <Route path="/" component={Controls} />} />
          <Route path="/createGame" component={Controls} />
          <Route path="/game/:id" component={Game} />
          <Route path="/players" component={Controls} />
          <Route path="/ongoingGames" component={GameList} />
          <Route path="/closedGames" component={GameList} />
          {this.props.loggedIn && <button className="Back" onClick={this.props.history.goBack}>Back</button> }
        </div>
      </ConnectedRouter>
    );
  }
}

App.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  disconectReason: PropTypes.string.isRequired
};

const mapStateToProps = ({MetronomeRerducer, WebSocketReducer}) => ({
  loggedIn: MetronomeRerducer.loggedIn,
  disconectReason: MetronomeRerducer.disconectReason,
  status: WebSocketReducer.status,
  loading: MetronomeRerducer.loading,
  error: MetronomeRerducer.error,
});

const mapDispatchToProps = (dispatch) => ({
  login: ({name}) => dispatch({type: LOGIN_REQUEST, payload: name})
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
