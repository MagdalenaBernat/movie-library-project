'use strict';
import { fetchDetails, watchedStorage } from './movie-modal';
import { addSpinner, removeSpinner } from './spinner';

function collectMovieDetailsToArray() {
  const watchedMoviesPromises = watchedStorage.map(async el => {
    return await createMovieArrayFromSingleID(el);
  });
  return Promise.all(watchedMoviesPromises);
}

const createMovieArrayFromSingleID = async movieID => {
  addSpinner();
  const movieDetails = await fetchDetails(movieID);
  removeSpinner();
  return movieDetails;
};

collectMovieDetailsToArray();
export { collectMovieDetailsToArray };
