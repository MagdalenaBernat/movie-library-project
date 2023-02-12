'use strict';

const moviesContainer = document.querySelector('.covers-container');

const getmoviesArray = async url => {
  const response = await fetch(url);
  const jsonResponse = await response.json();
  const moviesArray = await jsonResponse.results;
  console.log(moviesArray); //to remove after development stage
  return moviesArray;
};

const getGenresArray = async url => {
  const response = await fetch(url);
  const jsonResponse = await response.json();
  const genresArray = await jsonResponse.genres;
  // console.log(genresArray); //to remove after development stage
  return genresArray;
};

//Getting genres (to complete)
// getGenresArray(
//   'https://api.themoviedb.org/3/genre/movie/list?api_key=ac2189c49864b4ab99e8ac3560f99981&language=en-US'
// );

// const genreDecoding = movieGenres => {
//   movieGenres.forEach(genreId => {
//     for (const genre of genresArray) {
//       if (genre.id === genreId) {
//         console.log(genre.name);
//       }
//     }
//   });
// };

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
    const movieTitle = document.createElement('h2');
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
    movieData.innerHTML = elem;

    // genreDecoding(elem['genre_ids']);

    coverFigcaption.append(movieTitle);
    coverFigcaption.append(movieData);
    movieCoverFigure.append(coverImg);
    movieCoverFigure.append(coverFigcaption);
    moviesContainer.append(movieCoverFigure);
  });
};

getmoviesArray(
  'https://api.themoviedb.org/3/trending/all/week?api_key=ac2189c49864b4ab99e8ac3560f99981'
).then(response => {
  listBuilder(response);
});

export { listBuilder, getmoviesArray, getGenresArray };
