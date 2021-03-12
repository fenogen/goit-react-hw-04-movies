import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Loader from 'react-loader-spinner';

import route from './routes';
import AppBar from './components/AppBar/AppBar';
// --------------------Статический импорт----------------
// import HomePage from './pages/HomePage';
// import MoviesPage from './pages/MoviesPage';
// import MovieDetailsPage from './pages/MovieDetailsPage';

const HomePage = lazy(() =>
  import('./pages/HomePage.js' /*webpackChunkName: "HomePage"*/),
);
const MoviesPage = lazy(() =>
  import('./pages/MoviesPage' /*webpackChunkName: "MoviesPage"*/),
);
const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage' /*webpackChunkName: "MovieDetailsPage"*/),
);

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Suspense
          fallback={
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
          }
        >
          <AppBar />
          <Switch>
            <Route exact path={route.home} component={HomePage} />
            <Route exact path={route.movies} component={MoviesPage} />
            <Route
              path={route.moviesDetails}
              component={MovieDetailsPage}
            ></Route>
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default App;
