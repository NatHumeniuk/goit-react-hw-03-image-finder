import React from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, handleShowModal }) => {
  return (
    <div>
      {Array.isArray(images) && images.length === 0 && (
        <p>We don't have any images!</p>
      )}
      <ul className={css.gallery}>
        {Array.isArray(images) &&
          images.map(image => (
            <ImageGalleryItem
              image={image}
              key={image.id}
              handleShowModal={handleShowModal}
            />
          ))}
      </ul>
    </div>
  );
};
