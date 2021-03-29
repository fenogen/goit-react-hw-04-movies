import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import style from './Navigation.module.css';
import route from '../../../routes';

// export default function Navigation() {
//   return (
//     <nav className={style.flexbox}>
//       <NavLink
//         exact
//         to={route.home}
//         className={style.navLink}
//         activeClassName={style.navLink__active}
//       >
//         Home
//       </NavLink>
//       <NavLink
//         // to={route.movies}
//         to={{
//           pathname: route.movies,
//           state: { from: this.props.location.pathname }, //----> Сохранили для возврата на страницу путь
//           // state: { from: this.props.location.state?.form }, //----> Сохранили для возврата на страницу путь
//         }}
//         className={style.navLink}
//         activeClassName={style.navLink__active}
//       >
//         Movies
//       </NavLink>
//     </nav>
//   );
// }

export default class Navigation extends Component {
  render() {
    console.log(this.props.location)
    return (
      <nav className={style.flexbox}>
        <NavLink
          exact
          to={route.home}
          className={style.navLink}
          activeClassName={style.navLink__active}
        >
          Home
      </NavLink>
        <NavLink
          to={route.movies}
          // to={{
          //   pathname: route.movies,
          //   state: { from: route.movies}, //----> Сохранили для возврата на страницу путь
          //   // state: { from: this.props.location.state?.form }, //----> Сохранили для возврата на страницу путь
          // }}
          className={style.navLink}
          activeClassName={style.navLink__active}
        >
          Movies
      </NavLink>
      </nav>
    );
  }
}
