import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ingredientsListDrinks } from '../services/functions';
import { apiDrinks } from '../services/Services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './ProcessoBebidas.css';

const copy = require('clipboard-copy');

function ProcessoBebidas({ match: { params: { id } }, history }) {
  const [drinkInProgress, setDrinkInProgress] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copyLink, setCopyLink] = useState(false);

  const fetchDrink = async () => {
    const getDrink = await apiDrinks(`lookup.php?i=${id}`);
    setDrinkInProgress(getDrink);
  };

  useEffect(() => {
    fetchDrink();
  }, []);

  const zero = 0;
  const fiveTeen = 15;
  const handleClick = () => {
    const url = history.location.pathname;
    const newUrl = url.slice(zero, fiveTeen);
    copy(`http://localhost:3000${newUrl}`);
    return true;
  };

  if (drinkInProgress && drinkInProgress.length === zero){
    return (<div className="loading"><h1>Carregando...</h1></div>);
  }    

  const {
    strDrinkThumb,
    strDrink,
    strCategory,
    strInstructions,
    strAlcoholic,
  } = drinkInProgress[0];

  const detail = drinkInProgress[0];

  function favoriteRecipes() {
    const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setIsFavorite(!isFavorite);

    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }

    const currentFavoritesRecipes = {
      id,
      type: 'bebidas',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };

    localStorage.setItem('favoriteRecipes',
      JSON.stringify([...favoritesRecipes, currentFavoritesRecipes]));
  }

  function allRecipesFavorite() {
    setIsFavorite(!isFavorite);
    const favoriteRecipess = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const newFavorites = favoriteRecipess.filter((favorite) => favorite.id !== id);

    localStorage.setItem('favoriteRecipes',
      JSON.stringify(newFavorites));
  }

  return (
    <div className="details__drinks">
      <img
        className="details__drinks__img"
        src={ strDrinkThumb }
        alt={ strDrink }
        data-testid="recipe-photo"
        width="200px"
      />
      <h4 data-testid="recipe-title">{ strDrink }</h4>
      <h6 data-testid="recipe-category"><i>{ strCategory }</i></h6>
      {copyLink && <p><i>Link copiado!</i></p>}
      <div className="div-buttons">
        <button
          className="share-btn"
          data-testid="share-btn"
          type="button"
          onClick={ () => setCopyLink(handleClick()) }
          src={ shareIcon }
        >
          <img
            src={ shareIcon }
            alt="share"
            width="30px"
          />
        </button>
        <button
          className="heart-btn"
          data-testid="favorite-btn"
          type="button"
          src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
          onClick={ !isFavorite ? favoriteRecipes : allRecipesFavorite }
        >
          <img
            src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
            alt="whiteHeart"
            width="30px"
          />
        </button>
      </div>
      <h5><b>Ingredients</b></h5>
      <ul>
        {(ingredientsListDrinks(detail))
          .map(
            (ingredient, index) => (
              <div
                key="button"
                data-testid="ingredient-step"
              >
                <input
                  className="checkbox"
                  id={ ingredient }
                  type="checkbox"
                  key={ index }
                />
                <label
                  htmlFor={ ingredient }
                >
                  { ingredient }
                </label>
              </div>
            ),
          )}
      </ul>
      <h5><b>Instructions</b></h5>
      <p className="instructions__detail" data-testid="instructions">{ strInstructions }</p>
      <button
        className="Recipes__Done__Btn"
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </div>
  );
}

ProcessoBebidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.func.isRequired,
};

export default ProcessoBebidas;
