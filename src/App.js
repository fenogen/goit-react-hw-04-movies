import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import route from './routes'
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import AppBar from './components/AppBar/AppBar';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AppBar/>
        <Switch>
          <Route exact path={route.home} component={HomePage} />
          <Route exact path={route.movies} component={MoviesPage} />
          <Route path={route.moviesDetails} component={MovieDetailsPage}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
