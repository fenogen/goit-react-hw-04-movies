import React from 'react';
import PropTypes from 'prop-types';

import style from '../../FilmSearch/FilmSearch.module.css';
const Reviews = ({reviews}) => {
  return (
  <div className={style.reviews}>
    {/* Условие на ниличе контента описания */}
    <p>{reviews ?.content || 'Reviews did not find' }</p>
    </div>
    );
  }

Reviews.propTypes = {
  reviews: PropTypes.object
};

export default Reviews;
