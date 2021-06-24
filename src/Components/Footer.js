import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <div className="footer__img">
        <a
          href="/bebidas"
          className="drinks__btn"
          type="button"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          
        >
          <img
            alt="drink"
            src={ drinkIcon }
          
          />
        </a>
      </div>
      <div className="footer__img">
        <a
          href="/explorar"
          className="explore__btn"
          type="button"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
        >
          <img
            alt="explore"
            src={ exploreIcon }
          />
        </a>
      </div>
      <div className="footer__img">
        <a
          href="/comidas"
          className="food__btn"
          type="button"
          data-testid="food-bottom-btn"
          src={ mealIcon }
        >
          <img
            alt="food"
            src={ mealIcon }
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
