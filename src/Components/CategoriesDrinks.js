import React, { useContext, useEffect } from 'react';
import recipesContext from '../context/recipesContext';
import './Categories.css';

function CategoriesDrinks() {
  const {
    categoriesDrinks,
    fetchCategoriesDrinks,
    setFilterCategoryDrinks,
    fetchFilterCategoryDrinks,
    filterCategoryDrinks,
  } = useContext(recipesContext);

  useEffect(() => {
    fetchCategoriesDrinks();
  }, []);

  const changeCategory = (nameCategory) => {
    if (filterCategoryDrinks === nameCategory) {
      setFilterCategoryDrinks('All');
      fetchFilterCategoryDrinks('All');
    } else {
      setFilterCategoryDrinks(nameCategory);
      fetchFilterCategoryDrinks(nameCategory);
    }
  };

  return (
    <div className="Container__Category__Btns">
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => changeCategory('All') }
      >
        All
      </button>
      { categoriesDrinks.map(({ strCategory }) => (
        <button
          type="button"
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ () => changeCategory(strCategory) }
        >
          { strCategory }
        </button>
      ))}
    </div>
  );
}

export default CategoriesDrinks;
