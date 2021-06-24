import React, { useContext, useEffect } from 'react';
import recipesContext from '../context/recipesContext';
import './Categories.css';

function CategoriesFoods() {
  const {
    categoriesFoods,
    filterCategoryFoods,
    fetchCategoriesFoods,
    setFilterCategoryFoods,
    fetchFilterCategoryFoods,
  } = useContext(recipesContext);

  useEffect(() => {
    fetchCategoriesFoods();
  }, []);

  const changeCategory = (category) => {
    if (filterCategoryFoods === category) {
      setFilterCategoryFoods('All');
      fetchFilterCategoryFoods('All');
    } else {
      setFilterCategoryFoods(category);
      fetchFilterCategoryFoods(category);
    }
  };

  return (
    <div className="Container__Category__Btns">
      <button
        type="button"
        onClick={ () => changeCategory('All') }
        data-testid="All-category-filter"
      >
        All
      </button>
      {categoriesFoods.map(({ strCategory }) => (
        <button
          key="button"
          type="button"
          onClick={ () => changeCategory(strCategory) }
          data-testid={ `${strCategory}-category-filter` }
        >
          { strCategory }
        </button>
      ))}
    </div>
  );
}

export default CategoriesFoods;
