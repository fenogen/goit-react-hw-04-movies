import React from 'react'
import PropTypes from 'prop-types'

import style from './ImageGallery.module.css';

function ImageGalleryItem({ src, srcLarge }) {
    return (
        <li className={style.ImageGalleryItem}>
            <img
                src={src}
                data-img={srcLarge}
                alt=" "
                className={style.ImageGalleryItem__image} />
        </li>
    )
}

ImageGalleryItem.propTypes = {
    src: PropTypes.string,
    srcLarge: PropTypes.string,
}

export default ImageGalleryItem

