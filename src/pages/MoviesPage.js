import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import style from '../components/FilmSearch/FilmSearch.module.css';

import * as api from '../api/ApiSearchFilm';

import Button from '../components/FilmSearch/Button/Button';
import CardItem from '../components/FilmSearch/CardItem/CardItem';

class MoviesPage extends Component {
  state = {
    collection: [],
    search: '',
    currentPage: 1,
    error: null,
    loader: false,
    buttonStatus: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      console.log('Ф-я загрузки(№1)');
      this.fnGetCollection();
    }

    if (
      prevState.currentPage !== this.state.currentPage &&
      prevState.search === this.state.search
    ) {
      console.log('Ф-я Дозагрузки(№2)');
      this.fnGetCollection();
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  // --------------------------------------------> Ф-я извлечения значения инпута и запись его в State

  fnSearch = e => {
    e.preventDefault();
    console.log(`I am ready for search "${e.target.firstChild.value}"`);
    this.setState({
      search: e.target.firstChild.value,
      currentPage: 1, //---> Сбросили для дозагрузки
      error: null, //---> Сбросили для дозагрузки
      collection: [], //---> Сбросили для дозагрузки
    });
    e.target.firstChild.value = '';
  };

  fnGetCollection = () => {
    console.log('Go to backend - search');
    this.setState({
      loader: true, //---> Включили Spiner
    });
    api
      .getListSearch(this.state.currentPage, this.state.search)
      .then(data => {
        if (data.length > 0) {
          console.log(data);
          this.setState({
            loader: false, //---> Выключили Spiner
            collection: [...this.state.collection, ...data], //---> Распыляем что бы на экране было больше 12 фото после дозагрузки
          });
        } else {
          alert('On your request nothing has been found');
        }
      })
      .catch(() => console.warn('Server communication error'));
  };

  // --------------------------------------------> Ф-я дозагрузки фильмов:
  fnLoadMore = () => {
    console.log(`Load More "${this.state.search}"`);
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    return (
      <div className={style.container}>
        <div>
          {/* ----------------------------Form------------------------------ */}
          <div className={style.Searchbar}>
            <form className={style.SearchForm} onSubmit={this.fnSearch}>
              <input
                className={style.SearchForm__input}
                type="text"
                // autocomplete="off"
                // autofocus
                placeholder="Search film"
              />
              <button type="submit" className={style.SearchForm__button}>
                <span className={style.SearchForm__button_label}>Search</span>
              </button>
            </form>
          </div>
          {/* ----------------------------List------------------------------ */}
          {this.state.collection.length > 0 && (
            <ul className={style.filmList}>
              {this.state.collection.map(item => (
                <li key={item.id}>
                  <Link to={`${this.props.match.url}/${item.id}`}>
                    <CardItem srcImg={item.poster_path} title={item.title} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {/* ----------------------------Button------------------------------ */}
          {this.state.collection.length > 0 && (
            <Button fnLoadMore={this.fnLoadMore} />
          )}
        </div>
        <div></div>
      </div>
    );
  }
}

export default MoviesPage;
