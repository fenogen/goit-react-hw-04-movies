import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import route from './routes'
// import HomePage from './pages/HomePage';
// import MoviesPage from './pages/MoviesPage';
// import MovieDetailsPage from './pages/MovieDetailsPage';
import AppBar from './components/AppBar/AppBar';

const HomePage = lazy(() => import('./pages/HomePage.js' /*webpackChunkName: "HomePage"*/));
const MoviesPage = lazy(() => import('./pages/MoviesPage' /*webpackChunkName: "MoviesPage"*/));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage' /*webpackChunkName: "MovieDetailsPage"*/));

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Suspense fallback={<h1>Loading...</h1>}>
        <AppBar/>
        <Switch>
          <Route exact path={route.home} component={HomePage} />
          <Route exact path={route.movies} component={MoviesPage} />
          <Route path={route.moviesDetails} component={MovieDetailsPage}></Route>
        </Switch>
        </Suspense>
      </div>
    );
  }
}

export default App;
