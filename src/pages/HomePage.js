import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import style from '../components/FilmSearch/FilmSearch.module.css';
import CardItem from '../components/FilmSearch/CardItem/CardItem'

import * as api from '../api/ApiSearchFilm';

export default class HomePage extends Component {
  state = {
    collection: [],
    loader: false,
    currentPage: 1,
    search: null,
  };

  componentDidMount() {
    this.fnGetCollection();
  }

  fnGetCollection = () => {
    console.log('Go to backend - trends');
    // this.setState({
    //   loader: true, //---> Включили Spiner
    // });
    api
      .getListTrends()
      .then(data => {
        console.log(data);
        this.setState({
          loader: false, //---> Выключили Spiner
          collection: [...this.state.collection, ...data], //---> Распыляем что бы на экране было больше 12 фото после дозагрузки
        });
      })
      .catch(() => console.warn('Server communication error'));
  };

  render() {
    return (
      <div className={style.container}>
        <h3 className={style.trendTitle}>Trending today</h3>
        <ul className={style.filmList}>
          {this.state.collection.map(item => (
            <li key={item.id}>
              <Link to={`movies/${item.id}`}>
                <CardItem srcImg={item.poster_path} title={item.title} />
              </Link>
            </li>
          ))}
        </ul>
        {/* <button
                    type="button"
                    onClick={this.fnGetCollection}>Get Collection</button> */}
      </div>
    );
  }
}
