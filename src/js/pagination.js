'use strict';

import { fetchMovies, searchText } from './search-movies';
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

//
function statusCheck() {
  const home = document.querySelector('.navigation__list-link--active');
  if (home.textContent.toLowerCase().includes('home')) {
    return 'home';
  } else {
    const activeBtn = document.querySelector('.header__button--active');
    if (activeBtn.textContent.toLowerCase().includes('watched')) {
      return 'watched';
    } else {
      return 'queue';
    }
  } 
}

//
paginationContainer.addEventListener('click', e => {
  const pageNumber = e.target.textContent;

  function buttonAction(){
    if (pageNumber === Number) {
      return paginationBtns(total_pages, pageNumber);
    } else if (pageNumber === '&#8226;&#8226;&#8226;') { // 3 dots
      return;
    } else if (pageNumber === '&#129128;') { // previous arrow
      return (statusCheck(), paginationBtns(total_pages, pageNumber - 1));
    } else { // next arrow
      return (statusCheck(), paginationBtns(total_pages, pageNumber + 1));
    }
  };
    
  if (e.target.localName === 'li' || e.target.localName === 'span') { // for home
    clearPageContent();
    if (searchText === '') {
      const URLBuild = defaultMoviesURL + '&page=' + pageNumber;
      getDataFromAPI(URLBuild);
    } else {
      const URLBuild =
        MOVIES_API_URL +
        'api_key=' +
        APIKey +
        '&query=' +
        searchText +
        '&page=' +
        pageNumber;
      console.log(URLBuild);
      getDataFromAPI(URLBuild);
    }
  }
});



// sprawdzić czy to jest liczba, jeżeli to nie jest liczba to która strzałka  DONE
// jeżeli to jest liczba to włączyć stronę zgodnie z tą liczbą    DONE
// jeżeli to strzałka to pobrać aktywną stronę i -1 lub +1      DONE 
// jeżeli kropki to nic nie rób       DONE?
// statusCheck
// jeśli home -> to co jest w tej funkcji
// jeśli watched albo queue to pobrać z localstorage listę
// strona -1 *20
// do indeksu o 19 więcej (np. od 20 do 39) albo do length -1
// przeiterować po indeksie i wygenerować karty


//render pages amount from "Watched"
export function renderPagesFromWatched() {
  const watchedList = localStorage.getItem('watchedMovies');
  console.log(watchedList);
  const listLength = watchedList.split(',').length;
  console.log(listLength);

  const pageSize = 20;

  const totalPages = Math.ceil(listLength / pageSize);
  console.log(totalPages);

  paginationBtns(totalPages, 1);

  return totalPages;
}
renderPagesFromWatched();

//render pages amount from "Queue"  
export function renderPagesFromQueue() { 
  const queuedList = localStorage.getItem('queuedMovies');
  console.log(queuedList);
  const queuedListLength = queuedList.split(',').length;
  console.log(queuedListLength);

  const queuePageSize = 20;

  const queueTotalPages = Math.ceil(queuedListLength / queuePageSize);
  console.log(queueTotalPages);

  paginationBtns(total_pages = queueTotalPages, 1);
  return queueTotalPages;
}
renderPagesFromQueue();

