import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ imageUrl, onClick }) => {
  return (
    <li className="ImageGalleryItem" onClick={onClick}>
      <img className="ImageGalleryItem-image" src={imageUrl} alt="" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string,
  onClick: PropTypes.func,
};
export default ImageGalleryItem;
