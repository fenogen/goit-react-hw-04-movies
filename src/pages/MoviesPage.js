import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

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
    buttonActive: true,
  };

  componentDidMount() {
    // -----------------------> Записали значение LocalStorage в наш State при обновлении (условие для того что бы небыло ошибки при пустом массиве)
    // Удалили значение из LocalStorage непосредственно на странице HomePage
    const array = localStorage.getItem('search');
    const parsedArray = JSON.parse(array);
    if (parsedArray) {
      this.setState({
        collection: parsedArray,
      });
    }
  }

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

    // -----------------------> Сохранили сесию в LocalStorage (условие для сравнения с предыдущим массивом)
    if (this.state.collection !== prevState.collection) {
      localStorage.setItem('search', JSON.stringify(this.state.collection));
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
      buttonActive: true, //---> Сбросили для дозагрузки
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
          this.setState({
            buttonActive: false, //---> Сделали кнопку не активной
          });
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
          {/* ----------------------------Loader-1------------------------------- */}
          {this.state.loader && this.state.collection.length === 0 ? (
            <Loader
              type="BallTriangle"
              color="#00BFFF"
              height={150}
              width={150}
              style={{
                marginLeft: '50%',
                transform: 'translate(-50px)',
                marginTop: '15%',
              }}
              // timeout={3000} //3 secs
            />
          ) : null}
          {/* ----------------------------List------------------------------ */}
          {this.state.collection.length > 0 && (
            <ul className={style.filmList}>
              {this.state.collection.map(item => (
                <li key={item.id}>
                  <Link
                    to={{
                      pathname: `${this.props.match.url}/${item.id}`,
                      state: { from: this.props.location.pathname }, //----> Сохранили для возврата на страницу путь
                    }}
                  >
                    <CardItem srcImg={item.poster_path} title={item.title} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {/* ----------------------------Loader-2------------------------------- */}
          {this.state.loader && this.state.collection.length > 0 ? (
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={100}
              width={100}
              style={{
                marginLeft: '50%',
                transform: 'translate(-50px)',
                marginTop: '2%',
              }}
              timeout={2000} //3 secs
            />
          ) : null}
          {/* ----------------------------Button------------------------------ */}
          {this.state.collection.length > 0 && (
            <Button
              buttonActive={this.state.buttonActive}
              title="Load more"
              onClick={this.fnLoadMore}
            />
          )}
        </div>
      </div>
    );
  }
}

export default MoviesPage;
