import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import RecipesContext from '../context/recipesContext';
import './cards.css';

function CardsFood() {
  const { foods, fetchFoods } = useContext(RecipesContext);
  const [redirect, setRedirect] = useState(false);

  const zero = 0;
  useEffect(() => {
    if (foods !== undefined && foods.length === zero) fetchFoods();
  }, []);

  useEffect(() => {
    if (foods === undefined) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (foods && foods.length === 1 && !('redirect' in foods[0])) setRedirect(true);
  }, [foods]);

  if (redirect) return <Redirect to={ `/comidas/${foods[0].idMeal}` } />;
  return (
    <div className="Container__Cards">
      { foods && foods.map(({ strMeal, strMealThumb, idMeal }, index) => (
        <div className="individual_card">
          <a
            className="cards__results"
            key={ strMeal }
            href={ `/comidas/${idMeal}` }
            data-testid={ `${index}-recipe-card` }
          >
            <div>
              <img
                data-testid={ `${index}-card-img` }
                src={ strMealThumb }
                width="150"
                alt="Meal"
              />
              <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default CardsFood;
