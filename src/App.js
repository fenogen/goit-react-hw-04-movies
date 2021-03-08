import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navigation/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/movies" component={MoviesPage} />
          <Route path="/movies/:filmId" component={MovieDetailsPage}></Route>
          {/* <Route path="/movies/:filmId/cast" component={Cast}></Route> */}
        </Switch>
      </div>
    );
  }
}

export default App;
