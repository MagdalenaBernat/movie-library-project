'use strict';

import axios from 'axios';
import { Notify } from 'notiflix';
import { genresList, APIKey } from './movies-list';
import noImage from '../images/no-image.png';
import { addSpinner, removeSpinner } from './spinner';

export async function fetchMovies(title, page) {
  return await axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&query=${title}&page=${page}`
    )
    .then(response => response.data)
    .catch(error => console.log(error.response.data));
}
let pageNumber = 1;
let foundMovies = 0;
let searchText = '';

const searchForm = document.querySelector('.header__search-form');
const moviesList = document.querySelector('.covers-container');
const errorMessage = document.querySelector('.header__error-message');
searchForm.addEventListener('submit', searchMovies);

export async function searchMovies(e) {
  e.preventDefault();
  addSpinner();
  searchText = e.currentTarget.search.value;
  if (searchText === '') {
    removeSpinner();
    return;
  }
  pageNumber = 1;
  const response = await fetchMovies(searchText, pageNumber);
  foundMovies = response.total_results;

  if (response.total_results > 0) {
    Notify.success(`We found ${response.total_results} movies.`);
    moviesList.innerHTML = '';
    createSearchList(response.results);
    errorMessage.classList.add('hidden');
    removeSpinner();
    return;
  }
  if (response.total_results === 0) {
    errorMessage.classList.remove('hidden');
    removeSpinner();
  }
}

export const createSearchList = moviesArray => {
  moviesArray.forEach(elem => {
    //Creating container and class for general movie info (cover, title, genres etc.)
    const movieCoverFigure = document.createElement('figure');
    movieCoverFigure.classList.add('cover__container');

    //Creating img tag for movie cover
    const coverImg = document.createElement('img');
    coverImg.classList.add('cover__image');
    coverImg.setAttribute(
      'src',
      `https://image.tmdb.org/t/p/w500${elem['poster_path']}`
    );
    coverImg.setAttribute('alt', elem['original_title']);
    coverImg.setAttribute('loading', 'lazy');

    const imgAtrribute = coverImg.getAttribute('src');
    if (imgAtrribute === 'https://image.tmdb.org/t/p/w500null') {
      coverImg.setAttribute('src', `${noImage}`);
      coverImg.setAttribute('alt', `no poster found`);
    }
    //Creating figcaption (container for title, genres etc.)
    const coverFigcaption = document.createElement('figcaption');
    coverFigcaption.classList.add('cover__figcaption');

    //Header for movie title
    const movieTitle = document.createElement('h3');
    movieTitle.classList.add('cover__figcaption-title');

    movieTitle.innerHTML =
      elem['name'] || elem['original_name'] || elem['original_title'];

    //Tag for movie data (genres, release date)
    const movieData = document.createElement('p');
    movieData.classList.add('cover__figcaption-movie-data');

    const movieGenresArray = [];

    for (const id of elem['genre_ids']) {
      movieGenresArray.push(genresList[`${id}`]);
    }

    const releaseDate = new Date(
      `${elem['release_date'] || elem['first_air_date']}`
    );

    movieData.innerHTML = `${movieGenresArray.join(
      ', '
    )} | ${releaseDate.getFullYear()}`;

    coverFigcaption.append(movieTitle);
    coverFigcaption.append(movieData);
    movieCoverFigure.append(coverImg);
    movieCoverFigure.append(coverFigcaption);
    moviesList.append(movieCoverFigure);

    const movieIDInjection = document.querySelectorAll('[class^=cover_]');

    for (const tag of movieIDInjection) {
      if (tag.id === '') {
        tag.setAttribute('id', elem['id']);
      }
    }
  });
};
