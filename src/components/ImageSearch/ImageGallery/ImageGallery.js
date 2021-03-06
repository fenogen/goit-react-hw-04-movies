import React, { Component } from 'react';
import style from './ImageGallery.module.css';

import ImageGalleryItem from './ImageGalleryItem';

class ImageGallery extends Component {

  fnCatchSrc = (event) => {
    this.props.fnModalOpen(event.target.dataset.img);
  }
  render() {
    return (
      <>
        <ul className={style.ImageGallery}
          onClick={this.fnCatchSrc}>
          {this.props.collection.map(item => (
            <ImageGalleryItem
              key={item.id}
              src={item.webformatURL}
              srcLarge={item.largeImageURL}
            />
          ))}
        </ul>
      </>
    );
  }
}

export default ImageGallery;
