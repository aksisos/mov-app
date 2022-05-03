/* eslint-disable react/prop-types */
import { Alert } from 'antd';
import React, { useMemo } from 'react';

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
  const emptyMessage = useMemo(
    () => !searchValue && !error && <div className="message">Results shall show up here</div>,
    [error, searchValue]
  );
  const nothingFoundMessage = useMemo(
    () =>
      !isLoading && nothingFound && !error && searchValue && <div className="message">Nothing found, try again</div>,
    [error, isLoading, nothingFound, searchValue]
  );

  const search = useMemo(
    () =>
      selectedTab === 'search' && (
        <SearchForm
          getMoviesSearch={getMoviesSearch}
          clearCards={clearCards}
          searchValue={searchValue}
          searchChange={searchChange}
        />
      ),
    [clearCards, getMoviesSearch, searchChange, searchValue, selectedTab]
  );

  const searchTabPagination = useMemo(
    () =>
      !isLoading &&
      movies.length > 0 && (
        <div className="pagination-layout">
          <PaginationComponent
            totalResults={totalResults}
            page={page}
            moveToPage={moveToPage}
            searchValue={searchValue}
          />
        </div>
      ),
    [isLoading, moveToPage, movies.length, page, searchValue, totalResults]
  );

  const ratedTabPagination = useMemo(
    () =>
      !isLoading &&
      totalRated > 0 && (
        <div className="pagination-layout">
          <PaginationComponent totalResults={totalRated} page={ratedPage} moveToPage={moveToPage} />
        </div>
      ),
    [isLoading, moveToPage, ratedPage, totalRated]
  );

  const errorMessage = useMemo(
    () =>
      error && (
        <div className="alert">
          <Alert message="Error" description="No internet available." type="error" showIcon />
        </div>
      ),
    [error]
  );

  const searchTabContent = useMemo(
    () =>
      selectedTab === 'search' && (
        <>
          {search}

          {error ? (
            errorMessage
          ) : (
            <>
              {emptyMessage}
              {nothingFoundMessage}
              <MoviesList
                movies={movies}
                isLoading={isLoading}
                guestId={guestId}
                updateRatedList={updateRatedList}
                ratedList={ratedList}
                searchValue={searchValue}
              />
              {searchTabPagination}
            </>
          )}
        </>
      ),
    [
      emptyMessage,
      error,
      errorMessage,
      guestId,
      isLoading,
      movies,
      nothingFoundMessage,
      ratedList,
      search,
      searchTabPagination,
      searchValue,
      selectedTab,
      updateRatedList,
    ]
  );

  const ratedTabContent = useMemo(
    () =>
      selectedTab === 'rated' && (
        <>
          <MoviesList
            movies={ratedList}
            isLoading={isLoading}
            guestId={guestId}
            ratedList={ratedList}
            updateRatedList={updateRatedList}
          />
          {ratedTabPagination}
        </>
      ),
    [guestId, isLoading, ratedList, ratedTabPagination, selectedTab, updateRatedList]
  );

  return (
    <section className="section">
      <GenreListProvider value={genresList}>
        {useMemo(
          () => (
            <Navigation switchTab={switchTab} updateRatedList={updateRatedList} />
          ),
          [switchTab, updateRatedList]
        )}
        {searchTabContent}
        {ratedTabContent}
      </GenreListProvider>
    </section>
  );
};
