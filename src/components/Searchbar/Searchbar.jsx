import React, { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const searchValue = e.currentTarget.elements.searchInput.value;
    if (!searchValue) {
      alert('Please enter a search query');
      return;
    }
    this.setState({ query: searchValue });
    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchInput"
          />
        </form>
      </header>
    );
  }
}
