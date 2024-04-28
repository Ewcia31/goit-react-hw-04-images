import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import './styles.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (searchTerm) {
      setPage(1);
      setImages([]);
      fetchImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(() => {
    if (page > 1) {
      fetchImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${searchTerm}&page=${page}&key=42575635-c3b2777499453bcdfe65fd99f&image_type=photo&orientation=horizontal&per_page=12`
      );
      if (page === 1) {
        setImages(response.data.hits);
      } else {
        setImages(prevImages => [...prevImages, ...response.data.hits]);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreImages = () => {
    setPage(page + 1);
  };

  const handleImageClick = imageUrl => {
    setModalImageUrl(imageUrl);
  };

  const handleCloseModal = () => {
    setModalImageUrl('');
  };

  return (
    <div className="App">
      <Searchbar onSubmit={setSearchTerm} />
      {loading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {images.length > 0 && <Button onClick={loadMoreImages} />}
      {modalImageUrl && (
        <Modal imageUrl={modalImageUrl} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
