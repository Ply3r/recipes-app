import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../css/IngredientsWithCheckbox.css';
import Checkbox from './Checkbox';
import { getInProgressRecipes } from '../services/funcs';

const IngredientsWithCheckBox = ({ item, numberChecked, setNumberChecked, type, id }) => {
  const [localItens, setLocalItens] = useState('');

  const findLocalItem = async () => {
    const local = getInProgressRecipes();
    let localItem;
    if (type === 'food') {
      const { meals } = local;
      const localEntries = Object.entries(meals);
      const recipe = localEntries.find((arr) => arr[0] === id);
      localItem = recipe[1];
    } else {
      const { cocktails } = local;
      const localEntries = Object.entries(cocktails);
      const recipe = localEntries.find((arr) => arr[0] === id);
      localItem = recipe[1];
    }
    const entries = Object.entries(item);
    const ingredients = entries
    .filter((arr) => /strIngredient/.test(arr[0]) && arr[1]);
    const numberChecked = ingredients.filter((arr) => !localItem.includes(arr[1])).length
    setLocalItens(localItem);
    setNumberChecked(numberChecked)
  };

  const renderChecks = () => {
    const entries = Object.entries(item);

    const ingredients = entries
      .filter((arr) => /strIngredient/.test(arr[0]) && arr[1]);
    const measures = entries
      .filter((arr) => /strMeasure/.test(arr[0]) && arr[1]);

    const checkboxes = ingredients.map((arr, index) => (
      <Checkbox
        key={ `${arr[0]}, ${index}` }
        isChecked={ !localItens.includes(arr[1]) }
        testid={ `${index}-ingredient-step` }
        inputValue={ index }
        numberChecked={ numberChecked }
        setNumberChecked={ setNumberChecked }
        type={ type }
        id={ id }
        name={ arr[1] }
        content={ `${arr[1]} ${measures[index] ? measures[index][1] : ''}` }
      />
    ));
    return checkboxes
  }

  useEffect(() => {
    findLocalItem();
  }, []);

  return (
    <div className="checkboxes-ingredients-container">
      { !!localItens && renderChecks() }
    </div>
  );
};

IngredientsWithCheckBox.propTypes = {
  item: PropTypes.objectOf(PropTypes.string).isRequired,
  numberChecked: PropTypes.number.isRequired,
  setNumberChecked: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default IngredientsWithCheckBox;
