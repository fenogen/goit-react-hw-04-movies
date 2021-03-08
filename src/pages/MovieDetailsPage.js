import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import style from '../components/FilmSearch/FilmSearch.module.css';

import Cast from '../components/FilmSearch/Actors/Cast';
import Reviews from '../components/FilmSearch/Reviews'

import * as api from '../api/ApiSearchFilm';

export default class MovieDetailsPage extends Component {
  state = {
    subject: {},
    error: null,
    loader: false,
    toggle: false,
    actors: [],
    reviews: {},
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
        console.log(data);
        this.setState({
          reviews: data,
        });
      })
      .catch(() => console.warn('Server communication error'));
  };

  render() {
    const {
      poster_path,
      title,
      vote_average,
      overview,
      genres,
    } = this.state.subject;
    return (
      <div>
        {this.state.toggle && (
          <div>
            <ul>
              <li>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                  width="300"
                  alt=""
                ></img>
              </li>
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
        <div>
          <h3>Additional information</h3>
          <ul>
            <li>
              <Link to={`${this.props.match.url}/cast`}>Cast</Link>
            </li>
            <li>
              <Link to={`${this.props.match.url}/reviews`}>Reviews</Link>
            </li>
          </ul>
        </div>
        <Route
          path="/movies/:filmId/cast"
          render={props => <Cast {...props} actors={this.state.actors} />}
        />
        <Route
          path="/movies/:filmId/reviews"
          render={props => <Reviews {...props} reviews={this.state.reviews} />}
        />
        <button type="button" onClick={this.fnGetCollection}>
          Info
        </button>
      </div>
    );
  }
}
