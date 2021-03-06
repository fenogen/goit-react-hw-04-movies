import React from 'react';
import PropTypes from 'prop-types'

import style from './Button.module.css';

function Button({fnLoadMore}) {
  return (
    <div className={style.Button__container}>
          <button
              onClick={fnLoadMore}
              className={style.Button}
              type="button">
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  fnLoadMore: PropTypes.func,
};

export default Button;
