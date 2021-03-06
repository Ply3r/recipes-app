/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { myContext } from '../context/Provider';
import { getItemById } from '../services/funcs';
import FavoriteAndShareButtons from '../components/FavoriteAndShareButtons';
import IngredientsWithCheckbox from '../components/IngredientsWithCheckbox';
import { doneRecipe } from '../services/funcs2';
import Header from '../components/Header';
import Video from '../components/Video';
import { GiCookingGlove, GiCookingPot } from 'react-icons/gi';

export default function ComidaInProgress({ match: { params: { id } } }) {
  const [numberChecked, setNumberChecked] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [info, setInfo] = useState([]);
  const { currentRecipe } = useContext(myContext);

  const getInfo = async () => {
    const item = await getItemById('food', id);
    setInfo(item);
  };

  const buttonChange = () => {
    // Lógica para habilitar o botão
    const entries = Object.entries(info[0]);
    const ingredients = entries
      .filter((arr) => /strIngredient/.test(arr[0]) && arr[1]);
    const checkboxesLength = ingredients.length;
    if (checkboxesLength === numberChecked && checkboxesLength !== 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  useEffect(() => {
    getInfo();
  }, [currentRecipe]);

  useEffect(() => {
    if (info.length) {
      buttonChange();
    }
  }, [numberChecked]);

  const renderItem = () => {
    const {
      idMeal,
      strMeal,
      strMealThumb,
      strYoutube,
      strInstructions,
    } = info[0];

    return (
      <>
        <Header title="In Progress" singleRecipe />
        <div style={ { 'backgroundImage': `url(${strMealThumb})` } } className="details-title">
          <div>
            <h1 data-testid="recipe-title">{ strMeal }</h1>
            <FavoriteAndShareButtons type="comidas" id={ idMeal } />
          </div>
          <img data-testid="recipe-photo" src={ strMealThumb } alt={ strMeal } />
        </div>

        <div className="container"> 
          <Link to="/receitas-feitas">
            <button
              className="start-recipe-button"
              data-testid="finish-recipe-btn"
              type="button"
              disabled={ disabled }
              onClick={ () => {
                doneRecipe(info[0], 'food');
              } }
            >
              Finalizar receita
            </button>
          </Link>
          <div className="information-container">
            <div className="info">
              <h2><GiCookingGlove /> Ingredients</h2>
              <IngredientsWithCheckbox
                id={ id }
                type="food"
                item={ info[0] }
                numberChecked={ numberChecked }
                setNumberChecked={ setNumberChecked }
              />
            </div>
            <div className="info">
              <h2><GiCookingPot /> Instructions</h2>
              <p data-testid="instructions">{ strInstructions }</p>
            </div>
            { !!strYoutube && (
              <div className="info">
                <h2>Video</h2>
                <Video item={ info[0] } /> 
              </div>
            ) }
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      { !!info.length && renderItem() }
    </div>
  );
}

ComidaInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};
