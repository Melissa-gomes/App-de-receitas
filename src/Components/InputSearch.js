import React, { useState, useContext, useEffect } from 'react';
import RecipesContext from '../context/recipesContext';
import './inputSearch.css';

function InputSearch() {
  const [textInput, setTextInput] = useState('');
  const [radioSelected, setRadioSelected] = useState('');
  const {
    filterSearchBar,
    setFilterSearchBar,
    fecthFilterBySearchBarMeals,
    fecthFilterBySearchBarDrinks,
  } = useContext(RecipesContext);

  const clickSearch = () => {
    if (textInput.length !== 1 && radioSelected === 'first-letter') {
      return window.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    setFilterSearchBar({ text: textInput, typeSearch: radioSelected });
  };

  useEffect(() => {
    fecthFilterBySearchBarDrinks();
    fecthFilterBySearchBarMeals();
  }, [filterSearchBar]);

  return (
      <div className="Container">
        <input
          className="input__Text"
          type="text"
          placeholder="busque aqui uma receita"
          data-testid="search-input"
          value={ textInput }
          onChange={ ({ target }) => setTextInput(target.value) }
        />
        <div className="Container__Input">
          <label htmlFor="ingredient">
            <input
              className="radio__button"
              id="ingredient"
              type="radio"
              name="radio-button"
              data-testid="ingredient-search-radio"
              onClick={ ({ target }) => setRadioSelected(target.id) }
            />
            Ingrediente
          </label>

          <label htmlFor="name">
            <input
              className="radio__button"
              id="name"
              name="radio-button"
              data-testid="name-search-radio"
              type="radio"
              onClick={ ({ target }) => setRadioSelected(target.id) }
            />
            Nome
          </label>

          <label htmlFor="first-letter">
            <input
              className="radio__button"
              id="first-letter"
              name="radio-button"
              data-testid="first-letter-search-radio"
              type="radio"
              onClick={ ({ target }) => setRadioSelected(target.id) }
            />
            Primeira letra
          </label>
        </div>

        <button
          className="button__search"
          type="button"
          data-testid="exec-search-btn"
          onClick={ clickSearch }
        >
          Buscar
        </button>
      </div>
  );
}

export default InputSearch;
