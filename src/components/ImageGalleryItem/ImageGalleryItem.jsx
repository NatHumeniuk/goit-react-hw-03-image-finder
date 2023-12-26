import React from 'react';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, handleShowModal }) => {
  return (
    <>
      <li className={css.galleryItem}>
        <img
          onClick={() => handleShowModal(image.id)}
          className={css.galleryImg}
          src={image.webformatURL}
          alt={image.tags}
        />
      </li>
    </>
  );
};
