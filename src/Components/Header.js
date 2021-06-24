import React, { useState } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import InputSearch from './InputSearch';
import './Header.css';

function Header({ text, search }) {
  const [renderComponent, setRenderComponent] = useState(false);

  return (
    <header className="header">
      <a
        href="/perfil"
        type="button"
        data-testid="profile-top-btn"
        src={ profileIcon }
      >
        <img
          alt="profile"
          src={ profileIcon }
        />
      </a>
      <p data-testid="page-title">{text}</p>
      { search
        && (
          <button
            className="btn__search"
            type="button"
            onClick={ () => setRenderComponent(!renderComponent) }
            data-testid="search-top-btn"
            src={ searchIcon }
          >
            <img
              alt="search"
              src={ searchIcon }
            />
          </button>)}
      { renderComponent && <InputSearch /> }
    </header>
  );
}

Header.propTypes = {
  text: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
