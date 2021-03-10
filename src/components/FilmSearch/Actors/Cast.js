import React from 'react';
import PropTypes from 'prop-types';

import style from '../../FilmSearch/FilmSearch.module.css'

import CastItem from './CastItem'

function Cast({ actors }) {
  return (
    <ul className={style.filmList}>
      {actors.map(item => (
        <li key={item.id}>
          <CastItem
            srcImg={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
            name={item.name}
            role={item.character}
          />
        </li>
      ))}
    </ul>
  );
}

// Cast.defaultProps = {
//   avatar: 'https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg',
// };

Cast.propTypes = {
  actors: PropTypes.array,
}


export default Cast;
