'use strict';

import { fetchMovies, searchText, total_pages } from './search-movies';
import { APIKey, defaultMoviesURL, getDataFromAPI } from './movies-list';

const paginationContainer = document.querySelector('.pagination');
const moviesContainer = document.querySelector('.covers-container');
// total_pages = 1;
const MOVIES_API_URL = 'https://api.themoviedb.org/3/search/movie?';
// let total_pages = 20;

// console.log(total_pages);
// fetchMovies(searchText, 1).then(response => {
//   console.log(response);
// });

// creating pagination buttons' container
const ulTag = document.querySelector('.pagination ul');

export function paginationBtns(total_pages, page) {
  let liTag = '';
  let activeLi;
  let beforePages = page - 1;
  let afterPages = page + 1;

  if (page > 1) {
    liTag += `<li class="btn prev" onclick="paginationClick(${total_pages}, ${
      page - 1
    })"><span class="arrow prev-arrow">&#129128;</span></li>`;
  }

  if (page > 2) {
    liTag += `<li class="pageNumber" onclick="paginationClick(${total_pages}, 1)"><span>1</span></li>`;
    if (page > 3) {
      liTag += `<li class="dots"><span>&#8226;&#8226;&#8226;</span></li>`;
    }
  }

  //how many pages show before the current page
  if (page === total_pages) {
    beforePages = beforePages - 2;
  } else if (page === total_pages - 1) {
    beforePages = beforePages - 1;
  }

  //how many pages show after the current page
  if (page === 1) {
    afterPages = afterPages + 2;
  } else if (page === 2) {
    afterPages = afterPages + 1;
  }

  for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
    if (pageLength > total_pages) {
      continue;
    }
    if (pageLength === 0) {
      pageLength = pageLength + 1;
    }
    if (page === pageLength) {
      activeLi = 'active';
    } else {
      activeLi = '';
    }
    liTag += `<li class="pageNumber ${activeLi}" onclick="paginationClick(${total_pages}, ${pageLength})"><span>${pageLength}</span></li>`;
  }

  if (page < total_pages - 1) {
    if (page < total_pages - 2) {
      liTag += `<li class="dots"><span>&#8226;&#8226;&#8226;</span></li>`;
    }
    liTag += `<li class="pageNumber" onclick="paginationClick(${total_pages}, ${total_pages})"><span>${total_pages}</span></li>`;
  }

  if (page < total_pages) {
    liTag += `<li class="btn next" onclick="paginationClick(${total_pages}, ${
      page + 1
    })"><span class="arrow next-arrow">&#129130;</span></li>`;
  }
  ulTag.innerHTML = liTag;
}
// paginationBtns(total_pages, 1);

window.paginationClick = function (total_pages, page) {
  paginationBtns(total_pages, page);
};

//render all pages amount from API
export const clearPageContent = () => {
  moviesContainer.innerHTML = '';
};

// export function renderPages(page) {
//   const paginationParams = new URLSearchParams({
//     _api_key: APIKey,
//     _limit: MOVIES_PER_PAGE,
//     _page: page,
//   });
//   clearPageContent();
//   fetch(MOVIES_API_URL + paginationParams)
//     .then(response => response.data)
//     .then(getDataFromAPI());
// }
// renderPages(1);

//render pages amount from API after searching
// total_pages = response.total_results;

// function pagesAmount(
//   // moviesAmount = total_pages,
//   selectPage = 1,
//   pageSize = MOVIES_PER_PAGE
// ) {
//   const pages = Math.ceil(moviesAmount / pageSize);
// }

// export function renderPagesAfterSearching(page) {
//   clearPageContent();
//   fetch(MOVIES_API_URL + '?' + paginationParams)
//     .then(response => response.data)
//     .then(getDataFromAPI());
//   pagesAmount();
//   paginationBtns();
// }
// renderPagesAfterSearching(1);

// selected btn listener
// const selectPageBtn = document.querySelector('.pagination');
// const selectPage = paginationContainer;

// selectPageBtn.addEventListener('click', event => {
//   const pageNumber = event.target.innerText;
//   console.log(pageNumber);
//   renderPagesAfterSearching(pageNumber);
// });

// selectPage.addEventListener('click', event => {
//   const pageNumber = event.target.innerText;
//   console.log(pageNumber);
//   renderPagesAfterSearching(pageNumber);
// });

paginationContainer.addEventListener('click', e => {
  if (e.target.localName === 'li' || e.target.localName === 'span') {
    clearPageContent();
    if (searchText === '') {
      const URLBuild = defaultMoviesURL + '&page=' + e.target.textContent;
      getDataFromAPI(URLBuild);
    } else {
      const URLBuild =
        MOVIES_API_URL +
        'api_key=' +
        APIKey +
        '&query=' +
        searchText +
        '&page=' +
        e.target.textContent;
      console.log(URLBuild);
      getDataFromAPI(URLBuild);
    }
  }
});

//render pages amount from "Watched"
export function renderPagesFromWatched() {}

//render pages amount from "Queue"
export function renderPagesFromQueue() {}
