import React from 'react';
import PropTypes from 'prop-types';

function CastItem({ srcImg, name, role }) {
  return (
    <div>
      <img src={srcImg} width="100"></img>
      <h4>{name}</h4>
      <p>Character: {role}</p>
    </div>
  );
}

CastItem.defaultProps = {
  srcImg: 'https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg',
};

CastItem.propTypes = {
    srcImg:PropTypes.string.isRequired
};

export default CastItem;
