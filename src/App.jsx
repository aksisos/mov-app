import React, { Component } from 'react';

import MdbAPI from './services/mdb-api';
import Main from './components/Main';

export class App extends Component {
  mdbAPI = new MdbAPI();

  state = {
    isLoading: true,
    movies: [],
    genresList: null,
    searchValue: '',
    page: 1,
    totalResults: null,
    query: null,
    selectedTab: 'search',
    guestId: null,
    ratedList: [],
    totalRated: 0,
  };

  componentDidMount() {
    this.mdbAPI
      .getGenres()
      .then((result) => {
        this.setState({
          genresList: result.genres,
        });
      })
      .catch(this.onError);
    this.mdbAPI.getGuestSessinon().then((result) => {
      this.setState({
        guestId: result.guest_session_id,
      });
    });
  }

  onError = () => {
    this.setState({
      error: true,
      isLoading: false,
    });
  };

  searchChange = (str) => {
    this.setState({
      searchValue: str,
    });
  };

  getMoviesSearch = (page, query) => {
    this.setState({
      isLoading: true,
    });
    this.mdbAPI
      .getMovies(page, query)
      .then((movies) => {
        this.setState({
          page,
          movies: movies.results,
          totalResults: movies.total_results,
          isLoading: false,
          query,
          nothingFound: false,
        });

        if (movies.results.length === 0) {
          this.setState({
            nothingFound: true,
          });
        }
      })
      .catch(this.onError);
  };

  moveToPage = (page) => {
    const { selectedTab } = this.state;

    if (selectedTab === 'rated') {
      this.updateRatedList(page);
      return;
    }
    const { query } = this.state;
    this.setState({
      isLoading: true,
    });
    this.mdbAPI
      .getMovies(page, query)
      .then((movies) => {
        this.setState({
          movies: movies.results,
          page,
          totalResults: movies.total_results,
          isLoading: false,
        });
        window.scrollTo(0, 0);
      })
      .catch(this.onError);
  };

  clearCards = () => {
    this.setState({
      searchValue: '',
      movies: [],
    });
  };

  switchTab = (key) => {
    this.setState(() => ({
      selectedTab: key,
    }));
  };

  updateRatedList = (page = 1) => {
    const { guestId } = this.state;

    this.mdbAPI.getRatedMovies(guestId, page).then((result) => {
      this.setState({
        ratedList: result.results,
        totalRated: result.total_results,
        ratedPage: page,
        isLoading: false,
      });
    });
  };

  render() {
    return (
      <Main
        {...this.state}
        searchChange={this.searchChange}
        getMoviesSearch={this.getMoviesSearch}
        moveToPage={this.moveToPage}
        clearCards={this.clearCards}
        switchTab={this.switchTab}
        updateRatedList={this.updateRatedList}
      />
    );
  }
}
