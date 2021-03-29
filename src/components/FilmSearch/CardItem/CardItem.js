import React from 'react';
import PropTypes from 'prop-types';

import style from '../../FilmSearch/FilmSearch.module.css';

import { defImg  } from '../../../defaultProps'

function CardItem({srcImg, title}) {
  return (
    <div>
      <img src={srcImg !== null ? `https://image.tmdb.org/t/p/w500/${srcImg}` : defImg}
        alt=' '
      ></img>
      <h4 className={style.card__title}>{title}</h4>
    </div>
  );
}

CardItem.propTypes = {
    srcImg: PropTypes.string,
    title: PropTypes.string,
};

export default CardItem;
