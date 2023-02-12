'use strict';

import axios from 'axios';

const moviesContainer = document.querySelector('.covers-container');

const genresList = {};

const getGenres = async url => {
  const genresResponse = await axios.get(url);
  const genresArray = await genresResponse.data.genres;

  await genresArray.map(genre => {
    genresList[`${genre['id']}`] = genre.name;
  });

  return genresList;
};

const getMovies = async url => {
  const moviesResponse = await axios.get(url);
  const moviesArray = await moviesResponse.data.results;

  return moviesArray;
};

const defaultMoviesURL =
  'https://api.themoviedb.org/3/trending/all/week?api_key=ac2189c49864b4ab99e8ac3560f99981';
const TVGenresLink =
  'https://api.themoviedb.org/3/genre/tv/list?api_key=ac2189c49864b4ab99e8ac3560f99981&language=en-US';
const movieGenresLink =
  'https://api.themoviedb.org/3/genre/movie/list?api_key=ac2189c49864b4ab99e8ac3560f99981&language=en-US';
const APIKey = '?api_key=ac2189c49864b4ab99e8ac3560f99981';

const getDataFromAPI = async (searchURL = defaultMoviesURL) => {
  const movieGenres = await getGenres(movieGenresLink);
  const TVGenres = await getGenres(TVGenresLink);
  const moviesList = await getMovies(searchURL).then(response => {
    listBuilder(response);
  });
};

const listBuilder = moviesArray => {
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

    //Creating figcaption (container for title, genres etc.)
    const coverFigcaption = document.createElement('figcaption');
    coverFigcaption.classList.add('cover__figcaption');

    //Header for movie title
    const movieTitle = document.createElement('h3');
    movieTitle.classList.add('cover__figcaption-title');

    if (elem['name']) {
      movieTitle.innerHTML = elem['name'];
    } else if (elem['original_name']) {
      movieTitle.innerHTML = elem['original_name'];
    } else {
      movieTitle.innerHTML = elem['original_title'];
    }

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
    moviesContainer.append(movieCoverFigure);
  });
};

getDataFromAPI();

export { listBuilder, getMovies, getGenres, getDataFromAPI };
