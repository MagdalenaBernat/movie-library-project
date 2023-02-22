'use strict';

import { addSpinner, removeSpinner } from './spinner';
import { APIKey, moviesContainer } from './movies-list';
import axios from 'axios';
import { Notify } from 'notiflix';

let watchedStorage = [];
let queuedStorage = [];

const stringToNumber = arrayOfStrings => {
  const arrayOfNumbers = arrayOfStrings.map(Number);
  return arrayOfNumbers;
};

const checkingLocalStorageForWatched = (type = 'watched') => {
  if (localStorage.getItem(`${type}Movies`)) {
    const localData = localStorage.getItem(`${type}Movies`).split(',');
    watchedStorage = stringToNumber(localData);
  }
};

const checkingLocalStorageForQueued = (type = 'queued') => {
  if (localStorage.getItem(`${type}Movies`)) {
    const localData = localStorage.getItem(`${type}Movies`).split(',');
    queuedStorage = stringToNumber(localData);
  }
};

checkingLocalStorageForWatched();
checkingLocalStorageForQueued();

import noImage from '../images/no-image.png';

export function renderModal(movie) {
  const movieModal = document.querySelector('.movie-modal');
  const body = document.querySelector('body');
  const popularity = Math.round(movie.popularity * 10) / 10;
  const vote_average = Math.round(movie.vote_average * 100) / 100;

  movieModal.innerHTML = '';
  movieModal.classList.remove('is-hidden');
  const parsedGenres = movie.genres.map(genre => genre.name).join(', ');

  const markup = `<div class="movie-modal__content modal-center"><button type="button" class="movie-modal__close-btn">
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 8L22 22" stroke="black" stroke-width="2"/>
<path d="M8 22L22 8" stroke="black" stroke-width="2"/>
</svg>
</button>
<div class="movie-modal__image-container">
  <img
    class="movie-modal__image"
    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
    alt="${movie.original_title}"
    loading="lazy"
  />
</div>
<div class="movie-modal__info-container">
  <div class="movie-modal__movie-info">
    <h2 class="movie-modal__movie-title">${movie.title}</h2>
    <div class="movie-modal__params">
    <div>
      <span class="movie-modal__movie-rating">Vote / Votes</span>
      <span class="movie-modal__rating-value">${vote_average}</span>
      /
      <span class="movie-modal__rating-amount">${movie.vote_count}</span>
    </div>

    <div>
      <span class="movie-modal__movie-popularity">Popularity</span>
      <span clas="movie-modal__popularity-value">${popularity}</span>
    </div>

    <div>
      <span class="movie-modal__movie-original-title"
        >Original Title</span
      >
      <span class="movie-modal__original-title-value"
        >${movie.original_title}</span
      >
    </div>

    <div>
      <span class="movie-modal__movie-genre">Genre</span>
      <span class="movie-modal__genre-value">${parsedGenres}</span>
    </div>
    </div>
    <div class="movie-modal__about-section">
      <h4>ABOUT</h4>
      <span class="movie-modal__movie-description">
        ${movie.overview}
      </span>
    </div>
  </div>
  <div class="movie-modal__buttons">
    <button type="button" class="watched-btn button">
      Add to watched
    </button>
    <button type="button" class="queue-btn button">Add to queue</button>
  </div>
</div>
  </div>`;

  movieModal.innerHTML = markup;
  const posterSrc = document.querySelector('.movie-modal__image');
  if (posterSrc.getAttribute('src') === 'https://image.tmdb.org/t/p/w500null') {
    posterSrc.setAttribute('src', `${noImage}`);
    posterSrc.setAttribute('alt', `no poster found`);
  }
  const closeBtn = document.querySelector('.movie-modal__close-btn');

  closeBtn.addEventListener('click', () => {
    movieModal.classList.add('is-hidden');
  });

  body.addEventListener('click', function closeModal(event) {
    if (!event.target.closest('.movie-modal__content')) {
      movieModal.classList.add('is-hidden');
      body.removeEventListener('click', closeModal);
    }
  });

  document.addEventListener('keydown', function escapeKey(event) {
    if (event.key === 'Escape') {
      movieModal.classList.add('is-hidden');
      document.removeEventListener('keydown', escapeKey);
    }
  });
}

function getMovieDetails(id) {
  fetchDetails(id)
    .then(movieData => {
      renderModal(movieData);
      return movieData.id;
    })
    .then(id => {
      const watchedBtn = document.querySelector('.watched-btn');
      const queueBtn = document.querySelector('.queue-btn');

      watchedBtn.setAttribute('id', id);
      queueBtn.setAttribute('id', id);

      if (watchedStorage.includes(id)) {
        watchedBtn.innerHTML = 'Remove from watched';
      }
      if (queuedStorage.includes(id)) {
        queueBtn.innerHTML = 'Remove from queue';
      }

      watchedBtn.addEventListener('click', e => {
        e.preventDefault();
        if (watchedStorage.includes(id) !== true) {
          watchedStorage.push(id);
          watchedBtn.innerHTML = 'Remove from watched';
          Notify.success('Movie added to watched library');
        } else if (watchedStorage.includes(id)) {
          const indexOfID = watchedStorage.indexOf(id);
          localStorage.setItem(
            'watchedMovies',
            watchedStorage.splice(indexOfID, 1).join()
          );
          watchedBtn.innerHTML = 'Add to watched';
          Notify.success('Movie removed from watched library');
        }
        localStorage.setItem('watchedMovies', watchedStorage);
        localStorage.setItem('queuedMovies', queuedStorage);
      });

      queueBtn.addEventListener('click', e => {
        e.preventDefault();
        if (queuedStorage.includes(id) !== true) {
          queuedStorage.push(id);
          queueBtn.innerHTML = 'Remove from queue';
          Notify.success('Movie added to queued library');
        } else if (queuedStorage.includes(id)) {
          const indexOfID = queuedStorage.indexOf(id);
          localStorage.setItem(
            'queuedMovies',
            queuedStorage.splice(indexOfID, 1).join()
          );
          queueBtn.innerHTML = 'Add to queue';
          Notify.success('Movie removed from queued library');
        }
        localStorage.setItem('watchedMovies', watchedStorage);
        localStorage.setItem('queuedMovies', queuedStorage);
      });
    });
}
const fetchDetails = async movieId => {
  addSpinner();
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${APIKey}`
  );

  const videoDetails = await response.data;
  removeSpinner();
  return videoDetails;
};

moviesContainer.addEventListener('click', e => {
  if (e.target.className.includes('cover_')) {
    getMovieDetails(e.target.id);
  }
});

export {
  getMovieDetails,
  fetchDetails,
  watchedStorage,
  checkingLocalStorageForWatched,
  queuedStorage,
  checkingLocalStorageForQueued,
};

