import React from 'react'
import {NavLink} from "react-router-dom"
import style from './Navigation.module.css';

export default function Navigation() {
    return (
            <ul className="App">
          <li>
            <NavLink
              exact
              to="/"
              className={style.navLink}
              activeClassName={style.navLink__active}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className={style.navLink}
              activeClassName={style.navLink__active}
            >
              Movies
            </NavLink>
          </li>
        </ul>
    )
}
