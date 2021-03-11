import React from 'react';
import PropTypes from 'prop-types';

function CardItem({srcImg, title}) {
  return (
    <div>
      <img src={srcImg !== null ? `https://image.tmdb.org/t/p/w500/${srcImg}` : 'https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg'}
        alt=' '
      ></img>
      <h4>{title}</h4>
    </div>
  );
}

CardItem.propTypes = {
    srcImg: PropTypes.string,
    title: PropTypes.string.isRequired
};

export default CardItem;
