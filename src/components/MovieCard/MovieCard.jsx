import React from 'react';
import './MovieCard.css';
import PropTypes from 'prop-types';

import Stars from '../Stars';
import MdbAPI from '../../services/mdb-api';
import { dateFormat, rateColor, renderImage, truncate } from '../../utils/utils-functions';

import noImage from './no-image.00981342.jpg';

export const MovieCard = ({
  vote_average: voteAverage,
  poster_path: posterPath,
  genre_ids: genreIds,
  original_title: originalTitle,
  release_date: releaseDate,
  overview,
  id,
  genresList,
  guestId,
  rating,
  ratedList,
}) => {
  const mdbAPI = new MdbAPI();

  const description = overview || 'No description provided';

  let genresCollection;
  if (genreIds) {
    const genres = [];
    genresList.forEach((item) => {
      if (genreIds.includes(item.id)) {
        genres.push(item);
      }
    });

    genresCollection = genres.map((item) => <div key={item.id}>{item.name}</div>);
  }

  let date = releaseDate;

  if (releaseDate && releaseDate.length === 10) {
    date = dateFormat(releaseDate);
  }

  const rateMovie = (value) => {
    if (value === 0) {
      mdbAPI.deleteRate(id, guestId);
      return;
    }
    mdbAPI.postRate(id, guestId, value);
  };

  ratedList.forEach((item) => {
    if (item.id === id) {
      // eslint-disable-next-line no-param-reassign
      rating = item.rating;
    }
  });

  return (
    <li className="card">
      <div className="card-flex">
        <img src={renderImage(posterPath) || noImage} alt="poster" />
        <div className="text-layout">
          <div className="card__header">
            <h2 className="card__title"> {originalTitle} </h2>
            <div className={rateColor(voteAverage)}>{voteAverage}</div>
          </div>
          <div className="card__release-date">{date}</div>
          <div className="card__genres">{genresCollection}</div>
          <span className="card__description">{truncate(description, 120, true)}</span>
          <div className="card__stars-block">
            <Stars rateMovie={rateMovie} rating={rating || 0} />
          </div>
        </div>
      </div>
    </li>
  );
};

MovieCard.propTypes = {
  vote_average: PropTypes.number,
  poster_path: PropTypes.string,
  genre_ids: PropTypes.arrayOf(PropTypes.number),
  original_title: PropTypes.string,
  release_date: PropTypes.string,
  overview: PropTypes.string,
  id: PropTypes.number.isRequired,
  genresList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  guestId: PropTypes.string,
  rating: PropTypes.number,
  ratedList: PropTypes.arrayOf(
    PropTypes.shape({
      vote_average: PropTypes.number,
      genre_ids: PropTypes.arrayOf(PropTypes.number),
      original_title: PropTypes.string,
      release_date: PropTypes.string,
      overview: PropTypes.string,
      id: PropTypes.number.isRequired,
    })
  ),
};

MovieCard.defaultProps = {
  vote_average: 0,
  poster_path: '',
  original_title: '',
  release_date: '',
  overview: '',
  genre_ids: [],
  genresList: [],
  guestId: '',
  rating: 0,
  ratedList: [],
};
