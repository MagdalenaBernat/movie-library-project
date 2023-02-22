'use strict';

import axios from 'axios';
import noImage from '../images/no-image.png';
import { paginationBtns } from './pagination';
import { addSpinner, removeSpinner } from './spinner';

const moviesContainer = document.querySelector('.covers-container');

export const genresList = {};

const getGenres = async url => {
  const genresResponse = await axios.get(url);
  const genresArray = genresResponse.data.genres;

  genresArray.map(genre => {
    genresList[`${genre['id']}`] = genre.name;
  });

  return genresList;
};

const getMovies = async url => {
  const moviesResponse = await axios.get(url);
  const moviesArray = moviesResponse.data.results;

  return moviesArray;
};

export const defaultMoviesURL =
  'https://api.themoviedb.org/3/trending/movie/week?api_key=ac2189c49864b4ab99e8ac3560f99981';
const TVGenresLink =
  'https://api.themoviedb.org/3/genre/tv/list?api_key=ac2189c49864b4ab99e8ac3560f99981&language=en-US';
const movieGenresLink =
  'https://api.themoviedb.org/3/genre/movie/list?api_key=ac2189c49864b4ab99e8ac3560f99981&language=en-US';
export const APIKey = 'ac2189c49864b4ab99e8ac3560f99981';

const getDataFromAPI = async (searchURL = defaultMoviesURL) => {
  moviesContainer.innerHTML = '';
  addSpinner();
  const movieGenres = await getGenres(movieGenresLink);
  const TVGenres = await getGenres(TVGenresLink);
  const moviesList = getMovies(searchURL).then(response => {
    listBuilder(response);
  });
  removeSpinner();
};

const listBuilder = moviesArray => {
  moviesArray.forEach(elem => {
    //Creating container and class for general movie info (cover, title, genres etc.)
    const movieCoverFigure = document.createElement('figure');
    movieCoverFigure.classList.add('cover__container');

    //Creating more details label
    const moreDetailsLabel = document.createElement('span');
    moreDetailsLabel.classList.add('cover__label');
    moreDetailsLabel.innerHTML = `Click for more details`;

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

    if (elem['genre_ids']) {
      for (const id of elem['genre_ids']) {
        movieGenresArray.push(genresList[`${id}`]);
      }
    } else {
      elem['genres'].forEach(e => {
        movieGenresArray.push(genresList[`${e['id']}`]);
      });
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
    movieCoverFigure.append(moreDetailsLabel);
    movieCoverFigure.append(coverFigcaption);
    moviesContainer.append(movieCoverFigure);

    const movieIDInjection = document.querySelectorAll('[class^=cover_]');

    for (const tag of movieIDInjection) {
      if (tag.id === '') {
        tag.setAttribute('id', elem['id']);
      }
    }
  });
};

getDataFromAPI();

export { moviesContainer, listBuilder, getMovies, getGenres, getDataFromAPI };
