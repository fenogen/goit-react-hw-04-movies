import React from 'react';
import PropTypes from 'prop-types';

import style from './Button.module.css';

function Button({ onClick, buttonStatus, title }) {
  return (
    <div className={style.Button__container}>
      <button onClick={onClick} className={style.Button} type="button">{title}
      </button>
    </div>
  );
}

Button.propTypes = {
  fnLoadMore: PropTypes.func,
};

export default Button;
