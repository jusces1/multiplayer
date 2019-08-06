import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const NewGameForm = ({onStart}) => {
  const [frequency, setFrequency] = useState('');
  const handleFrequencyChange = (event) => setFrequency(event.target.value);
  const handleStart = () => {
    setFrequency('');
    onStart({frequency: parseInt(frequency)});
  };

  return (
    <div className="newGameForm">
      <input type='number' value={frequency} onChange={handleFrequencyChange} placeholder="Desired frequency"/>
      <Link to={`ongoingGames`}><button onClick={handleStart}>START</button></Link>
    </div>
  );
};

NewGameForm.propTypes = {
  onStart: PropTypes.func.isRequired
};

export default NewGameForm;
