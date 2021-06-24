import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './Perfil.css';

function Perfil() {
  const [redirect, setRedirect] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setEmail(user.email);
  }, []);

  const logout = () => {
    localStorage.clear();
    setRedirect('logout');
  };

  return (
    <div>
      <Header text="Perfil" search={ false } />
      <div className="buttons__profile background__image">
        <h3 data-testid="profile-email">{ email }</h3>
        <div className="container__profile__btn">
          <button
            className="receitas_feitas"
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => setRedirect('done') }
          >
            Receitas Feitas
          </button>
          <button
            className="receitas_favoritas"
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => setRedirect('fav') }
          >
            Receitas Favoritas
          </button>
          <button
            className="sair"
            type="button"
            data-testid="profile-logout-btn"
            onClick={ logout }
          >
            Sair
          </button>
        </div>
      </div>
      <Footer />
      { redirect === 'done' && <Redirect to="/receitas-feitas" /> }
      { redirect === 'fav' && <Redirect to="/receitas-favoritas" /> }
      { redirect === 'logout' && <Redirect to="/" /> }
    </div>
  );
}

export default Perfil;
