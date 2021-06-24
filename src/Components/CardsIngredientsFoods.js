import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { apiFoods } from '../services/Services';
import recipesContext from '../context/recipesContext';
import './CardsIngredients.css';
function CardsIngredientsFoods() {
  const [ingredients, setIngredients] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const { fetchFoods } = useContext(recipesContext);

  async function fetchIngredients() {
    const responseIngredients = await apiFoods('list.php?i=list');
    setIngredients(responseIngredients);
   }

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchFoodsByIngredient = async (ingredient) => {
    await fetchFoods(`filter.php?i=${ingredient}`);
    setRedirect(true);
  };

  return (
    <div className="Container__Cards">
      {ingredients && ingredients.map(({ strIngredient }, index) => (
        <button
          className="individual_card"
          type="button"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => fetchFoodsByIngredient(strIngredient) }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            alt="ingredient"
            width="200px"
            height="200px"
          />
          <p data-testid={ `${index}-card-name` }>{ strIngredient }</p>
        </button>
      ))}
      { redirect && <Redirect to="/comidas" /> }
    </div>
  );
}

export default CardsIngredientsFoods;
