import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import './SearchForm.css';
import { debounce } from '../../utils/utils-functions';

export class SearchForm extends Component {
  state = {
    label: '',
  };

  // eslint-disable-next-line react/destructuring-assignment
  debouncedMovieSearch = debounce(this.props.getMoviesSearch, 400);

  onLabelChange = (event) => {
    const { searchChange, clearCards } = this.props;
    searchChange(event.target.value);

    if (event.target.value.length > 0) {
      this.debouncedMovieSearch(1, event.target.value);
    }
    this.setState({
      label: event.target.value,
    });
    if (event.target.value.length === 0) {
      clearTimeout(this.timer);
      clearCards();
    }
  };

  onSubmit = (event) => {
    const { label } = this.state;
    const { getMoviesSearch } = this.props;
    event.preventDefault();
    getMoviesSearch(1, label);
  };

  render() {
    const { searchValue } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <Input className="search" placeholder="Type to seach..." value={searchValue} onChange={this.onLabelChange} />
      </form>
    );
  }
}

SearchForm.propTypes = {
  getMoviesSearch: PropTypes.func,
  searchChange: PropTypes.func,
  clearCards: PropTypes.func,
  searchValue: PropTypes.string,
};

SearchForm.defaultProps = {
  getMoviesSearch: () => {},
  searchChange: () => {},
  clearCards: () => {},
  searchValue: '',
};
