'use strict';
import { fetchDetails, watchedStorage, queuedStorage } from './movie-modal';
import { addSpinner, removeSpinner } from './spinner';

function collectMovieDetailsToWatchedArray() {
  const watchedMoviesPromises = watchedStorage.map(async el => {
    return await createMovieArrayFromSingleID(el);
  });
  return Promise.all(watchedMoviesPromises);
}

function collectMovieDetailsToQueuedArray() {
  const queuedMoviesPromises = queuedStorage.map(async el => {
    return await createMovieArrayFromSingleID(el);
  });
  return Promise.all(queuedMoviesPromises);
}

const createMovieArrayFromSingleID = async movieID => {
  addSpinner();
  const movieDetails = await fetchDetails(movieID);
  removeSpinner();
  return movieDetails;
};

collectMovieDetailsToWatchedArray();
collectMovieDetailsToQueuedArray();
export { collectMovieDetailsToWatchedArray, collectMovieDetailsToQueuedArray };
