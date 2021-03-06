
import React, { Component } from 'react'

import * as api from '../api/ApiSearchFilm';

export default class HomePage extends Component {

    state = {
        collection: [],
        loader: false,
        currentPage: 1,
        search: null,
    }

  fnGetCollection = () => {
    // console.log('Go to backend');
    // this.setState({
    //   loader: true, //---> Включили Spiner
    // });
    api
      .getImage()
        .then(data => {
            console.log(data)
            this.setState({
                loader: false, //---> Выключили Spiner
                collection: [...this.state.collection, ...data], //---> Распыляем что бы на экране было больше 12 фото после дозагрузки
            });
        })
      .catch(() => console.warn('Server communication error'));
  };


    render() {
        return (
            <div>
                <h3></h3>
                <button
                    type="button"
                    onClick={this.fnGetCollection}>Get Collection</button>
            </div>
        )
    }
}
