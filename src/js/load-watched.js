'use strict';
import { fetchDetails, watchedStorage } from './movie-modal';
import { addSpinner, removeSpinner } from './spinner';

let watchedMoviesArray = [];

const createMovieArrayFromSingleID = async movieID => {
  addSpinner();
  const movieDetails = await fetchDetails(movieID);
  watchedMoviesArray.push(movieDetails);
  removeSpinner();
};

watchedStorage.forEach(el => {
  createMovieArrayFromSingleID(el);
});

export { watchedMoviesArray };
