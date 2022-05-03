import { format, parse } from 'date-fns';

export const dateFormat = (dateString) => {
  const date = parse(dateString, 'yyyy-mm-dd', new Date());
  return format(date, 'MMMM d, yyyy');
};

export const debounce = (func, interval) => {
  let timer = null;

  return (...args) => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(func(...args)), interval);
    });
  };
};

export const truncate = (str, number, useWordBoundary) => {
  if (str.length <= number) {
    return str;
  }
  const subString = str.substr(0, number - 1);
  return `${useWordBoundary ? subString.substr(0, subString.lastIndexOf(' ')) : subString}...`;
};

export const renderImage = (path) => {
  if (!path) {
    return false;
  }
  const url = `https://image.tmdb.org/t/p/w200${path}`;

  return url;
};

export const rateColor = (votes) => {
  let className;
  if (votes <= 3) {
    className = 'card__average-vote vote-color-red';
  }
  if (votes > 3 && votes <= 5) {
    className = 'card__average-vote vote-color-orange';
  }
  if (votes > 5 && votes <= 7) {
    className = 'card__average-vote vote-color-yellow';
  }
  if (votes > 7) {
    className = 'card__average-vote vote-color-green';
  }

  return className;
};
