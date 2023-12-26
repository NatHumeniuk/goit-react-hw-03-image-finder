import React, { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.handleCloseModal();
    }
  };

  handleKeyPress = e => {
    if (e.code === 'Escape') {
      this.props.handleCloseModal();
    }
  };

  componentDidMount() {
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';

    window.removeEventListener('keydown', this.handleKeyPress);
  }

  render() {
    return (
      <div className={css.overlay} onClick={this.handleOverlayClick}>
        <div className={css.modal}>
          <img
            className={css.modalImg}
            src={this.props.image.largeImageURL}
            alt={this.props.image.tags}
          />
        </div>
      </div>
    );
  }
}
