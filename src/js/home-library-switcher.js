'use strict';

import { getDataFromAPI, listBuilder, moviesContainer } from './movies-list';
import { watchedMoviesArray } from './load-watched';
import { addSpinner, removeSpinner } from './spinner';

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
  getDataFromAPI();
});

library.addEventListener('click', e => {
  e.preventDefault();

  buttonWatched.classList.add('header__button--active');
  watchedQueueBntList.classList.remove('hidden');
  searchInput.classList.add('hidden');
  header.classList.add('header--library');
  library.classList.add('navigation__list-link--active');
  home.classList.remove('navigation__list-link--active');
  moviesContainer.innerHTML = '';
  listBuilder(watchedMoviesArray);
});

buttonQueue.addEventListener('click', e => {
  e.preventDefault();
  buttonQueue.classList.add('header__button--active');
  buttonWatched.classList.remove('header__button--active');
});
buttonWatched.addEventListener('click', e => {
  e.preventDefault();
  buttonWatched.classList.add('header__button--active');
  buttonQueue.classList.remove('header__button--active');
});

export { library };
