import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './FavoriteCards.css';

const copy = require('clipboard-copy');

function FavoriteCard({ favorites }) {
  const [copyLink, setCopyLink] = useState(false);
  const [favoritesRender, setFavoritesRender] = useState();

  useEffect(() => {
    setFavoritesRender(favorites);
  }, [favorites]);

  const twentySeconds = 20000;

  const shareRecipe = (id, type) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopyLink(true);
    setTimeout(() => setCopyLink(false), twentySeconds);
  };

  const disfavorRecipe = (id) => {
    const favoriteRecipess = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = favoriteRecipess.filter((favorite) => favorite.id !== id);
    localStorage.setItem('favoriteRecipes',
      JSON.stringify(newFavorites));
    const newFavoritesRender = favoritesRender.filter((favorite) => favorite.id !== id);
    setFavoritesRender(newFavoritesRender);
  };

  return (
    <div className="container__favoriteCards">
      { copyLink && <p><i>Link copiado!</i></p> }
      {favoritesRender && favoritesRender.map(({
        name,
        image,
        category,
        alcoholicOrNot,
        type,
        id,
        area,
      }, index) => (
        <div key={ id }>
          <a
            key={ id }
            href={ `/${type}s/${id}` }
          >
            <img
              className="image-recipe"
              data-testid={ `${index}-horizontal-image` }
              alt={ name }
              src={ image }
            />
          </a>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            { type === 'comida' ? `${area} - ${category}` : alcoholicOrNot }
          </p>
          <a
            key={ id }
            href={ `/${type}s/${id}` }
          >
            <h4
              className="Favorite___card__name"
              data-testid={ `${index}-horizontal-name` }
            >
              { name }
            </h4>
          </a>
          <div className="buttons">
            <button
              className="share-btn"
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => shareRecipe(id, type) }
              src={ shareIcon }
            >
              <img
                alt="share"
                src={ shareIcon }
                width="20px"
              />
            </button>
            <button
              className="heart-btn"
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => disfavorRecipe(id) }
              src={ blackHeartIcon }
            >
              <img
                alt="favorite"
                src={ blackHeartIcon }
                width="20px"
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

FavoriteCard.propTypes = {
  favorites: PropTypes.node.isRequired,
};

export default FavoriteCard;

// data-testid="0-horizontal-image"
// data-testid="0-horizontal-top-text"
// data-testid="0-horizontal-name"
// data-testid="0-horizontal-share-btn"
// data-testid="0-horizontal-favorite-btn"

// alcoholicOrNot: "Optional alcohol"
// area: ""
// category: "Ordinary Drink"
// id: "15997"
// image: "https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg"
// name: "GG"
// type: "bebida"

// alcoholicOrNot: ""
// area: "Turkish"
// category: "Side"
// id: "52978"
// image: "https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg"
// name: "Kumpir"
// type: "comida"
