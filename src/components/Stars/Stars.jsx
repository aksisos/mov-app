import React from 'react';
import { Rate } from 'antd';
import PropTypes from 'prop-types';

export const Stars = ({ rateMovie, rating }) => {
  const onChangeStar = (value) => {
    rateMovie(value);
  };

  return <Rate allowHalf defaultValue={rating} count={10} className="card__stars" onChange={onChangeStar} />;
};

Stars.propTypes = {
  rateMovie: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired,
};
