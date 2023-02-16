'use strict';
import { fetchDetails, watchedStorage } from './movie-modal';
import { addSpinner, removeSpinner } from './spinner';

let watchedMoviesArray = [];

function collectMovieDetailsToArray() {
  watchedStorage.forEach(el => {
    createMovieArrayFromSingleID(el);
  });
}

const createMovieArrayFromSingleID = async movieID => {
  addSpinner();
  const movieDetails = await fetchDetails(movieID);
  watchedMoviesArray.push(movieDetails);
  removeSpinner();
};

collectMovieDetailsToArray();
export { watchedMoviesArray, collectMovieDetailsToArray };
