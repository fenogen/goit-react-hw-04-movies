import React from 'react';
import PropTypes from 'prop-types';

import CastItem from './CastItem'

function Cast({ actors }) {
  return (
    <ul>
      {actors.map(item => (
        <li key={item.id}>
          <CastItem
            srcImg={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
            name={item.name}
            role={item.character}
          />
        </li>
      ))}

      {/* {actors.map(item => (
        <li key={item.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
            width="100"
          ></img>
          <h4>{item.name}</h4>
          <p>Character: {item.character}</p>
        </li>
      ))} */}
    </ul>
  );
}

// Profile.defaultProps = {
//   avatar: 'https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg',
// };

export default Cast;

// import React, { Component } from 'react'

// export default class Cast extends Component {
//     render() {
//         console.log(this.props)
//         return (
//             <div>

//             </div>
//         )
//     }
// }
