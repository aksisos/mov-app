import React from 'react';
import './MoviesList.css';
import { Spin } from 'antd';

import MovieCard from '../MovieCard';
import { GenreListConsumer } from '../../utils/genres-list-context';

export const MoviesList = ({ movies, isLoading, guestId, updateRatedList, ratedList, searchValue }) => {
  if (!movies) {
    return null;
  }

  const cards = movies.map((item) => (
    <GenreListConsumer key={item.id}>
      {(genresList) => (
        <MovieCard
          {...item}
          genresList={genresList}
          guestId={guestId}
          updateRatedList={updateRatedList}
          ratedList={ratedList}
        />
      )}
    </GenreListConsumer>
  ));

  const renderCards = <ul className="movies-list">{cards}</ul>;

  const spin = (
    <div className="spin-box">
      <Spin tip="Loading..." />
    </div>
  );

  const result = isLoading && searchValue ? spin : renderCards;

  return result;
};
