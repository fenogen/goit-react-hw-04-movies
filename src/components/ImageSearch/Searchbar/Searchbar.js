import React from 'react';
import PropTypes from 'prop-types'
import style from './Searchbar.module.css';

function Searchbar({fnSearch}) {

  const fnSubmit = (e) => {
    e.preventDefault()
    fnSearch(e.target.lastChild.value)
  }


  return (
    <header className={style.Searchbar}>
      <form
        className={style.SearchForm}
      onSubmit={fnSubmit}>
        <button
          type="submit"
          className={style.SearchForm__button}>
          <span className={style.SearchForm__button_label}>Search</span>
        </button>
        <input
          className={style.SearchForm__input}
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
          // value={}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  fnSearch: PropTypes.func,
}

export default Searchbar;




