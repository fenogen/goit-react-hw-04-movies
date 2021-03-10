import React from 'react';
import PropTypes from 'prop-types';

import style from '../../FilmSearch/FilmSearch.module.css'


function Reviews({ reviews }) {
  console.log(reviews);
  return (
    <div className={style.reviews}>
      <p>{reviews.content}</p>
    </div>
  );
}

Reviews.propTypes = {
  reviews: PropTypes.string,
};

export default Reviews;
