import React from 'react';
import {Link} from 'react-router-dom';

const ToolBar = () => {
  return (
    <div className="newGameForm toolbar">
      <Link to={`players`}><div>players</div></Link>
      <Link to={`ongoingGames`}><div>Ongoing games</div></Link>
      <Link to={`closedGames`}><div>Closed games</div></Link>
      <Link to={`createGame`}><div>Create game</div></Link>
    </div>
  );
};

export default ToolBar;
