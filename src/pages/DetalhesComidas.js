import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import RecipesContext from '../context/recipesContext';
import { apiFoods } from '../services/Services';
import {
  innitialLocalStorage,
  verifyIdMeals,
  changeFavorites,
  handleClick,
  ingredientsListMeals,
} from '../services/functions';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './DetalhesComidas.css';

function DetalhesComidas({ match: { params: { id } }, history }) {
  const [detailMeal, setDetailMeal] = useState([]);
  const [copyLink, setCopyLink] = useState(false);
  const [startRecipe, setStartRecipe] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const { fetchDrinks, drinks } = useContext(RecipesContext);

  useEffect(() => {
    const fetchDetailMeal = async () => {
      const detailMealResponse = await apiFoods(`lookup.php?i=${id}`);
      fetchDrinks();
      setDetailMeal(detailMealResponse);
    };
    innitialLocalStorage(id);
    setStartRecipe(verifyIdMeals(id));
    fetchDetailMeal();
    setIsFavorite(changeFavorites(id));
  }, []);

  const zero = 0;
  const six = 6;
  if (detailMeal && detailMeal.length === zero) {
    return (<div className="loading"><h1>Carregando...</h1></div>);
  }

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
    strArea,
  } = detailMeal[0];

  const detail = detailMeal[0];

  const recomendedDrinks = drinks && drinks.slice(zero, six);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    centerMode: false,
    slidesToScroll: 2,
  };

  const stringSplit = strYoutube.split('v=');

  function clickStartRecipes() {
    history.push(`/comidas/${id}/in-progress`);

    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({}));
    }

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    const currentRecipe = {
      ...inProgressRecipes,
      meals: {
        ...inProgressRecipes.meals,
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
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
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
    <div className="details__foods">
      <img
        className="details__foods__img"
        src={ strMealThumb }
        alt={ strMeal }
        data-testid="recipe-photo"
        
      />
      <h4 data-testid="recipe-title">{ strMeal }</h4>
      <h6 data-testid="recipe-category"><i>{ strCategory }</i></h6>
      <div className="div-buttons">
        <button
          className="share-btn"
          data-testid="share-btn"
          type="button"
          src={ shareIcon }
          onClick={ () => setCopyLink(handleClick(history)) }
        >
          <img
            src={ shareIcon }
            alt="share"
            width="30px"
          />
        </button>
        {copyLink && <p>Link copiado!</p>}
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
        {(ingredientsListMeals(detail))
          .map(
            (ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredient}
              </li>
            ),
          )}

      </ul>
      <h5><b>Instructions</b></h5>
      <p
        data-testid="instructions"
        className="instructions__detail"
      >
        { strInstructions }
      </p>
      <div className="iframe__detail">
        <iframe
          title="Video"
          width="320"
          height="240"
          src={ `http://www.youtube.com/embed/${stringSplit[1]}?autoplay=1` }
        />
      </div>
      <h5><b>Recomendados</b></h5>
      <div className="caroussel__detail">
        <Slider { ...settings }>
          { recomendedDrinks
            && recomendedDrinks.map(({ strDrinkThumb, strDrink }, index) => (
              <div key={ index }>
                <img
                  className="Recipe__Recomended"
                  data-testid={ `${index}-recomendation-card` }
                  src={ strDrinkThumb }
                  alt={ index }
                  width="140px"
                />
                <p data-testid={ `${index}-recomendation-title` }>{ strDrink }</p>
              </div>
            )) }
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
DetalhesComidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.func.isRequired,
};

export default DetalhesComidas;
