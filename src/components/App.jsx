import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { requestImagesByQuery } from 'services/api';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    images: null,
    page: 1,
    status: 'idle',
    searchQuery: '',
    error: null,
    isOpenModal: false,
    modalData: null,
  };

  fetchImagesByQuery = async (searchQuery, page = 1) => {
    try {
      // this.setState({ status: 'pending' });
      const data = await requestImagesByQuery(searchQuery, page);
      const { hits, totalHits } = data;
      this.setState(prevState => ({
        images: page > 1 ? [...prevState.images, ...hits] : hits,
        status: 'success',
        loadMore: prevState.currentPage < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: error.message, status: 'error' });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.status === 'success') {
      window.scroll({
        top: (0, document.documentElement.scrollHeight),
        behavior: 'smooth',
      });
    }

    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.fetchImagesByQuery(this.state.searchQuery, this.state.page);
    }
  }

  handleSubmit = searchValue => {
    this.setState({ searchQuery: searchValue, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: 'pending',
    }));
  };

  handleShowModal = imageId => {
    const selectedImage = this.state.images.find(image => image.id === imageId);
    this.setState({
      isOpenModal: true,
      modalData: selectedImage,
    });
  };

  handleCloseModal = () => {
    this.setState({ isOpenModal: false });
  };

  render() {
    const { images, status, error } = this.state;

    const showImages = status === 'success' && Array.isArray(images);

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />

        {status === 'pending' && <Loader />}
        {status === 'error' && <p>Whoops, something went wrong: {error}</p>}
        {showImages && (
          <ImageGallery
            images={images}
            handleShowModal={this.handleShowModal}
          />
        )}
        {showImages && <Button onClick={this.handleLoadMore} />}
        {this.state.isOpenModal && (
          <Modal
            handleCloseModal={this.handleCloseModal}
            image={this.state.modalData}
          />
        )}
      </div>
    );
  }
}
