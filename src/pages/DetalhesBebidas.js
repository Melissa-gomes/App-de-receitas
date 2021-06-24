import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import RecipesContext from '../context/recipesContext';
import { apiDrinks } from '../services/Services';
import {
  innitialLocalStorage,
  verifyIdDrinks, changeFavorites,
  handleClick,
  ingredientsListDrinks,
} from '../services/functions';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './DetalhesBebidas.css';

function DetalhesBebidas({ match: { params: { id } }, history }) {
  const [detailDrink, setDetailDrink] = useState([]);
  const [copyLink, setCopyLink] = useState(false);
  const [startRecipe, setStartRecipe] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const { fetchFoods, foods } = useContext(RecipesContext);

  useEffect(() => {
    const fetchDetailDrink = async () => {
      const detailDrinks = await apiDrinks(`lookup.php?i=${id}`);
      fetchFoods();
      setDetailDrink(detailDrinks);
    };
    innitialLocalStorage(id);
    fetchDetailDrink();
    setStartRecipe(verifyIdDrinks(id));
    setIsFavorite(changeFavorites(id));
  }, []);

  const zero = 0;
  const six = 6;
  if (detailDrink && detailDrink.length === zero) {
    return (<div className="loading"><h1>Carregando...</h1></div>);
  }

  const {
    strDrinkThumb,
    strDrink,
    strCategory,
    strInstructions,
    strAlcoholic,
  } = detailDrink[0];

  const detail = detailDrink[0];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    centerMode: false,
    slidesToScroll: 2,
  };

  const recomendedFood = foods && foods.slice(zero, six);

  function clickStartRecipes() {
    history.push(`/bebidas/${id}/in-progress`);

    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({}));
    }

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    const currentRecipe = {
      ...inProgressRecipes,
      cocktails: {
        ...inProgressRecipes.cocktails,
        [id]: [],
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(currentRecipe));
  }

  function continueRecipe() {
    history.push(`/comidas/${id}/in-progress`);
  }

  function favoriteRecipes() {
    const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setIsFavorite(!isFavorite);

    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }

    const currentFavoritesRecipes = {
      id,
      type: 'bebida',
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
    const favoriteRecipesNow = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const newFavorites = favoriteRecipesNow.filter((favorite) => favorite.id !== id);

    localStorage.setItem('favoriteRecipes',
      JSON.stringify(newFavorites));
  }

  return (
    <div className="details__drinks">
      <img
        className="details__drinks__img"
        src={ strDrinkThumb }
        data-testid="recipe-photo"
        alt={ strDrink }
        width="200px"
      />
      <h4 data-testid="recipe-title">{ strDrink }</h4>
      <h6 data-testid="recipe-category"><i>{ strAlcoholic }</i></h6>
      <div className="div-buttons">
        <button
          className="share-btn"
          onClick={ () => setCopyLink(handleClick(history)) }
          type="button"
          src={ shareIcon }
        >
          <img data-testid="share-btn" src={ shareIcon } alt="share" />
        </button>
        {copyLink && <p>Link copiado!</p>}
        <button
          className="heart-btn"
          type="button"
          onClick={ !isFavorite ? favoriteRecipes : allRecipesFavorite }
          src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
        >
          <img
            data-testid="favorite-btn"
            src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
            alt="share"
          />
        </button>
      </div>
      <h5><b>Ingredients</b></h5>
      <ul>
        {(ingredientsListDrinks(detail)).map((ingredient, index) => (
          <li key="drinks" data-testid={ `${index}-ingredient-name-and-measure` }>
            {ingredient}
          </li>
        ))}
      </ul>
      <h5><b>{ strCategory }</b></h5>
      <p className="instructions__detail" data-testid="instructions">{ strInstructions }</p>
      <h5><b>Recomendados</b></h5>
      <div className="caroussel__detail">
        <Slider { ...settings }>
          {recomendedFood
            && recomendedFood.map(({ strMealThumb, strMeal }, index) => (
              <div className="Recipe__Recomended" key={ index }>
                <img
                  data-testid={ `${index}-recomendation-card` }
                  className={ { visibility: 'hidden !important' } }
                  src={ strMealThumb }
                  alt={ index }
                  width="140px"
                />
                <p data-testid={ `${index}-recomendation-title` }>{ strMeal }</p>
              </div>
            ))}
        </Slider>
      </div>
      <button
        type="button"
        className="Recipes__Start__Btn"
        data-testid="start-recipe-btn"
        onClick={ startRecipe ? clickStartRecipes : continueRecipe }
      >
        { startRecipe ? 'Iniciar Receita' : 'Continuar Receita'}
      </button>
    </div>
  );
}

DetalhesBebidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.func.isRequired,
};

export default DetalhesBebidas;
