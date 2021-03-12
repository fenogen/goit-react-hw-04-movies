import React from 'react';
import PropTypes from 'prop-types';

import style from './Button.module.css';

function Button({ onClick, title, buttonActive }) {
  return (
    <div className={style.Button__container}>
      <button
        onClick={onClick}
        disabled={!buttonActive}
        className={buttonActive ? style.Button : style.Button__disabled}
        type="button">{title}
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  buttonActive: PropTypes.bool,
};

export default Button;
