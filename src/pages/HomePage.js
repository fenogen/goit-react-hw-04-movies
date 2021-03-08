
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import * as api from '../api/ApiSearchFilm';

export default class HomePage extends Component {

    state = {
        collection: [],
        loader: false,
        currentPage: 1,
        search: null,
    }

    componentDidMount() {
        this.fnGetCollection();
    }

  fnGetCollection = () => {
    console.log('Go to backend - trends');
    // this.setState({
    //   loader: true, //---> Включили Spiner
    // });
    api
      .getListTrends()
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
                <h3>Trending today</h3>
                <ul>
                    {this.state.collection.map(item => 
                        <li key={item.id}>
                            <Link  to={`movies/${item.id}`}>{item.title}</Link>
                        </li>)}
                    </ul>
                {/* <button
                    type="button"
                    onClick={this.fnGetCollection}>Get Collection</button> */}
            </div>
        )
    }
}
