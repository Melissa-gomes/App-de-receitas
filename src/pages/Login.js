import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import logoRocketFood from '../images/logoRocketFood.png';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const verifyData = () => {
    const six = 6;
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email) && password.length > six) setIsDisable(false);
    else setIsDisable(true);
  };

  useEffect(() => {
    verifyData();
  }, [email, password]);

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    setRedirect(true);
  };

  return (
    <div className="login__container">
      <div className="wrapper__Login">
        <img
          className="logoRocketFood"
          alt="imagem do logo"
          src={ logoRocketFood }
        />
        <form>
          <input
            type="email"
            name="email"
            autocomplete="off"
            className="inputLogin"
            value={ email }
            placeholder="Digite seu Email"
            data-testid="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
            autocorrect="off"
          />
          <input
            type="password"
            className="inputLogin"
            name="password"
            value={ password }
            placeholder="Digite sua Senha"
            data-testid="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
          />
          <button
            type="button"
            data-testid="login-submit-btn"
            className="button"
            disabled={ isDisable }
            onClick={ handleClick }
          >
            Entrar
          </button>
          { redirect && <Redirect to="/comidas" />}
        </form>
      </div>
    </div>
  );
}

export default Login;
