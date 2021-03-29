import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import style from '../components/FilmSearch/FilmSearch.module.css';

import Cast from '../components/FilmSearch/Actors/Cast';
import Reviews from '../components/FilmSearch/Reviews/Reviews';
import Button from '../components/FilmSearch/Button/Button';

import * as api from '../api/ApiSearchFilm';
import route from '../routes';
import { defImg } from '../defaultProps';

export default class MovieDetailsPage extends Component {
  state = {
    subject: {},
    error: null,
    loader: false,
    toggle: false,
    actors: [],
    reviews: {},
    buttonActive: true,
  };

  componentDidMount() {
    this.fnGetCollection();
  }

  fnGetCollection = () => {
    console.log('Go to backend - for details');
    const itemId = Number(this.props.match.params.filmId);
    this.setState({
      loader: true, //---> Включили Spiner
    });
    api
      .getItemInfo(itemId)
      .then(data => {
        // console.log(data);
        this.setState({
          subject: data,
          loader: false, //---> Выключили Spiner
          toggle: true, //---> Включили наш рендер по условию
        });
      })
      .catch(() => console.warn('Server communication error'));
    api
      .getItemActors(itemId)
      .then(data => {
        // console.log(data);
        this.setState({
          actors: [...data],
          toggle: true, //---> Включили наш рендер по условию
        });
      })
      .catch(() => console.warn('Server communication error'));
    api
      .getItemReviews(itemId)
      .then(data => {
        // console.log(data);
        this.setState({
          reviews: data,
        });
      })
      .catch(() => console.warn('Server communication error'));
  };

  fnReturnOnPage = () => {
    this.props.history.push(this.props.location?.state?.from || '/');
    // this.props.history.push(this.props.location?.state?.from || '/movies');
    // console.log(this.props.location.state.from)
    // console.log(this.props.history.state.from)
    // if (this.props.location?.state?.from) {
    //   this.props.history.push(this.props.location?.state?.from)
    // }
    // if ()
  };

  render() {
    const {
      poster_path,
      title,
      vote_average,
      overview,
      genres = [], //----> Указали что это непосредственно массив так как выдавало при "map" ошибку
    } = this.state.subject;
    return (
      <div className={style.container}>
        {/* -----------------------------------------Button------------------------------------ */}
        <Button
          title="<-- Return"
          onClick={this.fnReturnOnPage}
          buttonActive={this.state.buttonActive}
        />
        {/* -----------------------------------------Card------------------------------------ */}
        {this.state.toggle && (
          <div className={style.itemDetails}>
            <img
              className={style.itemDetails__photo}
              src={
                poster_path !== null
                  ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                  : defImg
              }
              width="300"
              alt=""
            ></img>
            <ul className={style.itemDetails__list}>
              <li>
                <h3>{title}</h3>
                <p>User score: {vote_average * 10}%</p>
              </li>
              <li>
                <h3>Overview:</h3>
                <p>{overview}</p>
              </li>
              <li>
                <h3>Genres:</h3>
                <ul>
                  {genres.map(item => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        )}
        <div className={style.itemDetails__info}>
          <h3>Additional information</h3>
          <ul>
            <li>
              <Link
                to={{
                  pathname: `${this.props.match.url}/cast`,
                  // state: { from: this.props.location.pathname }, //----> Сохранили для возврата на пред.страницу
                  state: { from: this.props.location.pathname },
                }}
              >
                Cast
              </Link>
            </li>
            <li>
              <Link
                to={{
                  pathname: `${this.props.match.url}/reviews`,
                  state: { from: this.props.location.pathname }, //----> Сохранили для возврата на пред.страницу
                }}
              >
                Reviews
              </Link>
            </li>
          </ul>
        </div>
        <Route
          path={route.cast}
          render={props => <Cast {...props} actors={this.state.actors} />}
        />
        <Route
          path={route.reviews}
          render={props => <Reviews {...props} reviews={this.state.reviews} />}
        />
      </div>
    );
  }
}
