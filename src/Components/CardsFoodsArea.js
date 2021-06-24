import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { apiFoods } from '../services/Services';
import './CardsFoodsArea.css';

function CardsFoodsArea({ selectedArea }) {
  const [foodsArea, setFoodsArea] = useState([]);

  async function fetchFoodsArea() {
    let areaFoods;
    if (selectedArea === 'All') areaFoods = await apiFoods('search.php?s=');
    else areaFoods = await apiFoods(`filter.php?a=${selectedArea}`);
    setFoodsArea(areaFoods);
  }

  useEffect(() => {
    fetchFoodsArea();
  }, [selectedArea]);

  return (
    <div className="Container__Cards">
      { foodsArea && foodsArea.map(({ strMeal, strMealThumb, idMeal }, index) => (
        <a 
          className="individual_card"
          key={ strMeal }
          href={ `/comidas/${idMeal}` }
          data-testid={ `${index}-recipe-card` }
        >
          <div>
            <img
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              width="200"
              alt="Meal"
            />
            <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
          </div>
        </a>
      ))}
    </div>
  );
}

CardsFoodsArea.propTypes = {
  selectedArea: PropTypes.node.isRequired,
};

export default CardsFoodsArea;
