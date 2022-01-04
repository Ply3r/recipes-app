import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import { myContext } from '../context/Provider';

function Header({ title, buttonDisable, type }) {
  const [foodName, setFoodName] = useState('');
  const [inputDisable, setInputDisable] = useState(true);
  const { searchEnable } = useContext(myContext);

  const onSearchIconClick = () => {
    setInputDisable(!inputDisable);
  };

  const onInputTextChange = ({ target }) => {
    const { value } = target;
    setFoodName(value);
  };

  return (
    <>
      <div className="header">
        <Link to="/perfil" data-testid="profile-top-btn" src={ profileIcon }>
          <button
            className="round-button"
            type="button"
          >
            <img src={ profileIcon } alt="profile icon" />
          </button>
        </Link>

        <h1 data-testid="page-title">{ title }</h1>

        <div>
          {
            !buttonDisable && (
              <button
                className="round-button"
                type="button"
                data-testid="search-top-btn"
                onClick={ onSearchIconClick }
                src={ searchIcon }
              >
                <img src={ searchIcon } alt="search icon" />
              </button>
            )
          }
        </div>
      </div>
      { !inputDisable && (
        <div className="input-container">
          <div className="input-text">
            <input
              type="text"
              value={ foodName }
              onChange={ onInputTextChange }
              placeholder={ `Procure sua ${type === 'food' ? 'comida' : 'bebida'}...` }
              name="text"
              data-testid="search-input"
            />
          </div>

          { searchEnable && (
            <SearchBar
              type={ type }
              foodName={ foodName }
            />) }
        </div>
      ) }
    </>
  );
}

Header.propTypes = {
  buttonDisable: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Header;
