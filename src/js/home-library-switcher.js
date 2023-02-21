'use strict';

import { getDataFromAPI, listBuilder, moviesContainer } from './movies-list';
import {
  collectMovieDetailsToWatchedArray,
  collectMovieDetailsToQueuedArray,
} from './load-watched';
import {
  checkingLocalStorageForQueued,
  checkingLocalStorageForWatched,
} from './movie-modal';

const header = document.querySelector('.header');

const home = document
  .querySelector('.navigation__links-list')
  .childNodes[1].querySelector('a');

const library = document
  .querySelector('.navigation__links-list')
  .childNodes[3].querySelector('a');

const watchedQueueBntList = document.querySelector('.header__buttons-list');
const buttonWatched = document.querySelector('.header__list-button-watched');
const buttonQueue = document.querySelector('.header__list-button-queue');
const searchInput = document.querySelector('.header__search-form');

home.addEventListener('click', e => {
  e.preventDefault();
  moviesContainer.innerHTML = '';

  watchedQueueBntList.classList.add('hidden');
  searchInput.classList.remove('hidden');
  header.classList.remove('header--library');
  home.classList.add('navigation__list-link--active');
  library.classList.remove('navigation__list-link--active');
  buttonQueue.classList.remove('header__button--active');

  getDataFromAPI();
});

library.addEventListener('click', e => {
  e.preventDefault();
  moviesContainer.innerHTML = '';
  checkingLocalStorageForWatched();

  buttonWatched.classList.add('header__button--active');
  watchedQueueBntList.classList.remove('hidden');
  searchInput.classList.add('hidden');
  header.classList.add('header--library');
  library.classList.add('navigation__list-link--active');
  home.classList.remove('navigation__list-link--active');

  const watchedMoviesPromises = collectMovieDetailsToWatchedArray();
  watchedMoviesPromises.then(resolve => {
    resolve = resolve.slice(0, 20);
    listBuilder(resolve)
  });
});

buttonQueue.addEventListener('click', e => {
  e.preventDefault();
  moviesContainer.innerHTML = '';
  checkingLocalStorageForQueued();

  buttonQueue.classList.add('header__button--active');
  buttonWatched.classList.remove('header__button--active');

  const queuedMoviesPromises = collectMovieDetailsToQueuedArray();
  queuedMoviesPromises.then(resolve =>  {
    resolve = resolve.slice(0, 20);
    listBuilder(resolve)
  });
});

buttonWatched.addEventListener('click', e => {
  e.preventDefault();
  moviesContainer.innerHTML = '';
  checkingLocalStorageForWatched();

  buttonWatched.classList.add('header__button--active');
  buttonQueue.classList.remove('header__button--active');

  const watchedMoviesPromises = collectMovieDetailsToWatchedArray();
  watchedMoviesPromises.then(resolve =>  {
    resolve = resolve.slice(0, 20);
    listBuilder(resolve)
  });
});

export { library };
