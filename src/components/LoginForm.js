import React, {forwardRef, useRef, useImperativeHandle, useState} from 'react';
import PropTypes from 'prop-types';

const LoginForm = forwardRef((props, ref) => {
  const [name, setName] = useState('');
  const handleNameChange = (event) => setName(event.target.value);
  const handleStart = () => {
    props.onEnter({name: name});
  };
  const nameInput = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      nameInput.current.focus();
    }
  }));

  return (
    <div className="loginForm">
      <input ref={nameInput} type='text' value={name} onChange={handleNameChange} placeholder="Your name"/>
      <button onClick={handleStart}>Log in</button>
      {props.status === 'connecting' && <div className="conneting" >Connecting...</div>}
      {(props.disconectReason !== ''
        && props.status !== 'connecting'
        && props.status !== 'connected') && <div className="err" >{props.disconectReason}</div>}
    </div>
  );
});

LoginForm.propTypes = {
  onEnter: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  disconectReason: PropTypes.string.isRequired
};

export default LoginForm;
