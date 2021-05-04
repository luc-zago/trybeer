import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions';
// import * as api from '../services/api';
// import { setStorage } from '../services/localSorage';

function Login({ history, sendClientInfoToStore }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const MIN_LENGTH = 6;
    if (password.length >= MIN_LENGTH && regex.test(email)) {
      setDisabled(false);
    } else { setDisabled(true);
    }
  }, [email, password]);


  const handleButton = () => {
    // setStorage('token', xxx)
    sendClientInfoToStore({ email });
    history.push('/products');
    // history.push('/admin/profile');
  };

  return (
    <div>
      <label
        htmlFor="email"
      >
        <h6>Email</h6>
        <input
          placeholder="E-mail"
          type="email"
          data-testid="email-input"
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label
        htmlFor="password"
      >
        <h6>Senha</h6>
        <input
          placeholder="Senha"
          type="password"
          data-testid="password-input"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="signin-btn"
        disabled={ disabled }
        onClick={ handleButton }
      >
        Entrar
      </button>
      <button
        type="button"
        data-testid="no-account-btn"
        onClick={ () => history.push('/register') }
      >
        Ainda não tenho conta
      </button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  sendClientInfoToStore: (clientInfo) => dispatch(login(clientInfo)) });

export default connect(null, mapDispatchToProps)(Login);