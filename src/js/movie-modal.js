'use strict';

export function renderModal(movie) {
  const movieModal = document.querySelector('.movie-modal');

  movieModal.innerHTML = '';
  movieModal.classList.remove('is-hidden');
  const parsedGenres = movie.genres.map(genre => genre.name).join(', ');

  movieModal.innerHTML = `<div class="movie-modal__content"><button type="button" class="movie-modal__close-btn">x</button>
<div class="movie-modal__image-container">
  <img
    class="movie-modal__image"
    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
    alt="example image"
    loading="lazy"
  />
</div>
<div class="movie-modal__info-container">
  <div class="movie-modal__movie-info">
    <h2 class="movie-modal__movie-title">${movie.title}</h2>
    <div>
      <span class="movie-modal__movie-rating">Vote / Votes</span>
      <span class="movie-modal__rating-value">${movie.vote_average}</span>
      /
      <span class="movie-modal__rating-amount">${movie.vote_count}</span>
    </div>

    <div>
      <span class="movie-modal__movie-popularity">Popularity</span>
      <span clas="movie-modal__popularity-value">${movie.popularity}</span>
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

  const closeBtn = document.querySelector('.movie-modal__close-btn');

  closeBtn.addEventListener('click', () => {
    movieModal.classList.add('is-hidden');
  });

  document.addEventListener('keydown', function escapeKey(event) {
    if (event.key === 'Escape') {
      movieModal.classList.add('is-hidden');
      document.removeEventListener('keydown', escapeKey);
    }
  });

  // close modal by clicking on a background to be done
  // add to watched, add to queue function to be done

  const watchedBtn = document.querySelector('.watched-btn');
  const queueBtn = document.querySelector('.queue-btn');
}

function getMovieDetails(id) {
  fetchDetails(id).then(movieData => renderModal(movieData));
}

const fetchDetails = async movieId => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=ac2189c49864b4ab99e8ac3560f99981`
  );

  const videoDetails = await response.json();

  return videoDetails;
};

getMovieDetails(505642); // example of generating modal for a movie by id
