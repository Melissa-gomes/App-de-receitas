import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { apiDrinks } from '../services/Services';
import recipesContext from '../context/recipesContext';
import './CardsIngredients.css';

function CardsIngredientsDrinks() {
  const [ingredients, setIngredients] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const { fetchDrinks } = useContext(recipesContext);

  async function fetchIngredients() {
    const responseIngredients = await apiDrinks('list.php?i=list');
    setIngredients(responseIngredients);
  }

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchFoodsByIngredient = async (ingredient) => {
    await fetchDrinks(`filter.php?i=${ingredient}`);
    setRedirect(true);
  };
  console.log(ingredients);
  return (
    <div className="Container__Cards">
      {ingredients && ingredients.map(({ strIngredient1 }, index) => (
        <button
          className="individual_card"
          type="button"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => fetchFoodsByIngredient(strIngredient1) }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
            alt="ingredient"
            width="200px"
            height="200px"
          />
          <p data-testid={ `${index}-card-name` }>{ strIngredient1 }</p>
        </button>
      ))}
      { redirect && <Redirect to="/bebidas" /> }
    </div>
  );
}
// https://www.thecocktaildb.com/images/ingredients/${strIngredient}.png (100x100 pixels)
export default CardsIngredientsDrinks;
