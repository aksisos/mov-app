import { Alert } from 'antd';
import React from 'react';

import { GenreListProvider } from '../../utils/genres-list-context';
import MoviesList from '../MoviesList';
import Navigation from '../Navigation';
import PaginationComponent from '../PaginationComponent';
import SearchForm from '../SearchForm';

export const Main = ({
  movies,
  page,
  totalResults,
  isLoading,
  selectedTab,
  ratedList,
  searchValue,
  genresList,
  error,
  guestId,
  totalRated,
  ratedPage,
  nothingFound,
  getMoviesSearch,
  clearCards,
  searchChange,
  moveToPage,
  updateRatedList,
  switchTab,
}) => {
  const emptyMessage = () => {
    if (!searchValue && !error) {
      return <div className="message">Results shall show up here</div>;
    }
  };

  const nothingFoundMessage = () => {
    if (!isLoading && nothingFound && !error && searchValue) {
      return <div className="message">Nothing found, try again</div>;
    }
  };

  const search = () => {
    return (
      <SearchForm
        getMoviesSearch={getMoviesSearch}
        clearCards={clearCards}
        searchValue={searchValue}
        searchChange={searchChange}
      />
    );
  };

  const searchTabPagination = () => {
    if (!isLoading && movies.length > 0) {
      return (
        <div className="pagination-layout">
          <PaginationComponent
            totalResults={totalResults}
            page={page}
            moveToPage={moveToPage}
            searchValue={searchValue}
          />
        </div>
      );
    }
  };

  const ratedTabPagination = () => {
    if (!isLoading && totalRated > 0) {
      return (
        <div className="pagination-layout">
          <PaginationComponent totalResults={totalRated} page={ratedPage} moveToPage={moveToPage} />
        </div>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return (
        <div className="alert">
          <Alert message="Error" description="No internet available." type="error" showIcon />
        </div>
      );
    }
  };

  const searchTabContent = () => {
    if (selectedTab === 'search') {
      return (
        <>
          {search()}

          {error ? (
            errorMessage()
          ) : (
            <>
              {emptyMessage()}
              {nothingFoundMessage()}
              <MoviesList
                movies={movies}
                isLoading={isLoading}
                guestId={guestId}
                updateRatedList={updateRatedList}
                ratedList={ratedList}
                searchValue={searchValue}
              />
              {searchTabPagination()}
            </>
          )}
        </>
      );
    }
  };

  const ratedTabContent = () => {
    if (selectedTab === 'rated') {
      return (
        <>
          <MoviesList
            movies={ratedList}
            isLoading={isLoading}
            guestId={guestId}
            ratedList={ratedList}
            updateRatedList={updateRatedList}
          />
          {ratedTabPagination()}
        </>
      );
    }
  };

  return (
    <section className="section">
      <GenreListProvider value={genresList}>
        <Navigation switchTab={switchTab} updateRatedList={updateRatedList} />
        {searchTabContent()}
        {ratedTabContent()}
      </GenreListProvider>
    </section>
  );
};
