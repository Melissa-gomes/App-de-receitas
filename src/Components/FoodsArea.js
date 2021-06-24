import React, { useEffect, useState } from 'react';
import './FoodsArea.css';
import CardsFoodsArea from './CardsFoodsArea';

function FoodsArea() {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('All');

  async function apiFoodsArea() {
    const urlFoods = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const { meals } = await fetch(urlFoods)
      .then((response) => response.json())
      .catch((error) => console.log(`deu erro ${error}`));
    return meals;
  }

  async function fetchArea() {
    const responseArea = await apiFoodsArea();
    setAreas(responseArea);
  }

  useEffect(() => {
    fetchArea();
  }, []);

  return (
    <div className="select__area">
      <select
        name="area"
        data-testid="explore-by-area-dropdown"
        onChange={ ({ target }) => setSelectedArea(target.value) }
      >
        <option
          value="All"
          data-testid="All-option"
        >
          All
        </option>
        { areas.map(({ strArea }) => (
          <option
            key={ strArea }
            value={ strArea }
            data-testid={ `${strArea}-option` }
          >
            { strArea }
          </option>
        ))}
      </select>
      <CardsFoodsArea selectedArea={ selectedArea } />
    </div>
  );
}

export default FoodsArea;
