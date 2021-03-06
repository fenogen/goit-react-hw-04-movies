import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

import * as api from '../../api/ApiSearchImage';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';


class ImageSearch extends Component {
  state = {
    collection: [],
    search: '',
    currentPage: 1,
    error: null,
    loader: false,
    showModal: false,
    srcLarge: '',
  };

  // --------------------------------------------> Ф-я запуска поиска после обновления search в State:
  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      console.log('Ф-я загрузки(№1)');
      this.fnGetCollection();
    }

    if (
      prevState.currentPage !== this.state.currentPage &&
      prevState.search === this.state.search
    ) {
      console.log('Ф-я Дозагрузки(№2)');
      this.fnGetCollection();
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  // --------------------------------------------> Ф-я запроса на бэкенд
  fnGetCollection = () => {
    console.log('Go to backend');
    this.setState({
      loader: true, //---> Включили Spiner
    });
    api
      .getImage(this.state.currentPage, this.state.search)
      .then(data => {
        this.setState({
          loader: false, //---> Выключили Spiner
          collection: [...this.state.collection, ...data], //---> Распыляем что бы на экране было больше 12 фото после дозагрузки
        });
        console.log(this.state.collection);
      })
      .catch(() => console.warn('Server communication error'));
  };

  // --------------------------------------------> Ф-я извлечения значения инпута и запись его в State
  fnSearch = inputValue => {
    console.log(`I am ready for search "${inputValue}"`);
    this.setState({
      search: inputValue,
      currentPage: 1, //---> Сбросили для дозагрузки
      error: null, //---> Сбросили для дозагрузки
      collection: [], //---> Сбросили для дозагрузки
    });
  };

  // --------------------------------------------> Ф-я дозагрузки фотографий
  fnLoadMore = () => {
    console.log(`Load More "${this.state.search}"`);
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

    // --------------------------------------------> Ф-я открытия модального окна
  fnModalOpen = imgLarge => {
    console.log('Modal Open');
    this.setState({
      srcLarge: imgLarge,
      showModal: true,
    });
  };

  // --------------------------------------------> Ф-я закрытия модального окна

  fnTogleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    return (
      <div>
        {/* ----------------------------Searchbar------------------------------- */}
        <Searchbar fnSearch={this.fnSearch} />
        {/* ----------------------------ImageGallery---------------------------- */}
        {this.state.collection.length > 0 && (
          <ImageGallery
            collection={this.state.collection}
            fnModalOpen={this.fnModalOpen}
          />
        )}
        {/* ----------------------------Loader-1------------------------------- */}
        {this.state.loader && this.state.collection.length === 0 ? (
          <Loader
            type="BallTriangle"
            color="#00BFFF"
            height={150}
            width={150}
            style={{
              marginLeft: '50%',
              transform: 'translate(-50px)',
              marginTop: '15%',
            }}
            // timeout={3000} //3 secs
          />
        ) : null}
        {/* ----------------------------Loader-2------------------------------- */}
        {this.state.loader && this.state.collection.length > 0 ? (
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={100}
            width={100}
            style={{
              marginLeft: '50%',
              transform: 'translate(-50px)',
              marginTop: '2%',
            }}
            // timeout={3000} //3 secs
          />
        ) : null}
        {/* ----------------------------Button------------------------------ */}
        {this.state.collection.length > 0 && (
          <Button fnLoadMore={this.fnLoadMore} />
        )}
        {/* ----------------------------Modal------------------------------- */}
        {this.state.showModal && (
          <Modal fnTogleModal={this.fnTogleModal}>
            <Loader
              type="BallTriangle"
              color="#00BFFF"
              height={150}
              width={150}
              timeout={1500} //2 secs
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-75px, -75px)',
              }}
            />
              <img
                src={this.state.srcLarge}
                alt=" "
            />
          </Modal>
        )}
      </div>
    );
  }
}

export default ImageSearch;
