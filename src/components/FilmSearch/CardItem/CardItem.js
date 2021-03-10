import React from 'react';
import PropTypes from 'prop-types';

function CardItem({srcImg, title}) {
  return (
    <div>
      <img src={`https://image.tmdb.org/t/p/w500/${srcImg}`}
        alt=' '
      ></img>
      <h4>{title}</h4>
    </div>
  );
}

CardItem.propTypes = {
    srcImg: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default CardItem;
