import React from 'react';
import PropTypes from 'prop-types';

function CastItem({ srcImg, name, role }) {
  return (
    <div>
      <img src={srcImg} width="100"
      alt='' ></img>
      <h4>{name}</h4>
      <p>Character: {role}</p>
    </div>
  );
}

CastItem.propTypes = {
  srcImg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string,
};

export default CastItem;
