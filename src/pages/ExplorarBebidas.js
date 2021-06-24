import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { apiDrinks } from '../services/Services';
import './explorarButtons.css';

function ExplorarBebidad() {
  const [exploreRecipes, setExploreRecipes] = useState('');
  const [idRandom, setIdRadom] = useState();

  const exploreSurprise = async () => {
    const randomDrink = await apiDrinks('random.php');
    setIdRadom(randomDrink[0].idDrink);
    setExploreRecipes('surprise');
  };

  const isFalse = false;
  return (
    <div className="background__image">
      <Header text="Explorar Bebidas" search={ isFalse } />
      <div className="container__explore__btn">
        <button
          className="button-explore"
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => setExploreRecipes('ingredient') }
        >
          Por Ingredientes
        </button>
        <button
          className="button-explore"
          type="button"
          data-testid="explore-surprise"
          onClick={ exploreSurprise }
        >
          Me Surpreenda!
        </button>
      </div>
      { exploreRecipes === 'ingredient'
        && <Redirect to="/explorar/bebidas/ingredientes" />}
      { exploreRecipes === 'surprise' && <Redirect to={ `/bebidas/${idRandom}` } />}
      <Footer />
    </div>
  );
}

export default ExplorarBebidad;
