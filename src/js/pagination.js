"use strict";

import { fetchMovies } from "./search-movies";
import { APIKey, getDataFromAPI } from './movies-list';

const paginationContainer = document.querySelector('.pagination');
const moviesContainer = document.querySelector('.covers-container');

const MOVIES_API_URL = "https://api.themoviedb.org/3/search/movie?";
const MOVIES_PER_PAGE = 20;
let totalPages = 20;

// creating pagination buttons' container
const ulTag = document.querySelector(".pagination ul");

export function paginationBtns(totalPages, page) {
  let liTag = '';
  let activeLi;
  let beforePages = page - 1;
  let afterPages = page + 1;

  if(page > 1){
    liTag += `<li class="btn prev" onclick="paginationBtns(totalPages, ${page - 1})"><span class="arrow prev-arrow">&#129128;</span></li>`;
  }

  if (page > 2) {
    liTag += `<li class="pageNumber" onclick="paginationBtns(totalPages, 1)"><span>1</span></li>`
    if (page > 3) {
      liTag += `<li class="dots"><span>&#8226;&#8226;&#8226;</span></li>`
    }
  }

      //how many pages show before the current page
  if (page === totalPages) {
    beforePages = beforePages - 2;
  } else if (page === totalPages - 1) {
    beforePages = beforePages - 1; 
  }

      //how many pages show after the current page
  if (page === 1) {
    afterPages = afterPages + 2;
  } else if (page === 2) {
    afterPages = afterPages + 1; 
  }

  for (let pageLength = beforePages; pageLength <= afterPages; pageLength++){
    if (pageLength > totalPages) {
      continue;
    }
    if (pageLength === 0) {
      pageLength = pageLength + 1;
    }
    if (page === pageLength) {
      activeLi = "active";
    } else {
      activeLi = "";
    }
    liTag += `<li class="pageNumber ${activeLi}" onclick="paginationBtns(totalPages, ${pageLength})"><span>${pageLength}</span></li>`;
  }

  if (page < totalPages - 1) {
    if (page < totalPages - 2) {
      liTag += `<li class="dots"><span>&#8226;&#8226;&#8226;</span></li>`
    }
    liTag += `<li class="pageNumber" onclick="paginationBtns(totalPages, ${totalPages})"><span>${totalPages}</span></li>`
  }

  if(page < totalPages){
    liTag += `<li class="btn next" onclick="paginationBtns(totalPages, ${page + 1})"><span class="arrow next-arrow">&#129130;</span></li>`;
  }
  ulTag.innerHTML = liTag;
};
paginationBtns(totalPages, 5);


//render all pages amount from API
export const clearPageContent = () => {
    moviesContainer.innerHTML = "";
};

const paginationParams = new URLSearchParams({
    _api_key: APIKey,
    _limit: MOVIES_PER_PAGE,
    _page: page,
});

export function renderPages(page) {
    clearPageContent();
    fetch(MOVIES_API_URL + "?" + paginationParams)
        .then((response) => response.data)
        .then(getDataFromAPI())
};
renderPages();

//render pages amount from API after searching
totalPages = response.total_results;

function pagesAmount(moviesAmount = totalPages, selectPage = 1, pageSize = MOVIES_PER_PAGE) {
    const pages = Math.ceil(moviesAmount / pageSize);
};

export function renderPagesAfterSearching(page) {
  clearPageContent();
  fetch(MOVIES_API_URL + "?" + paginationParams)
    .then((response) => response.data)
    .then(getDataFromAPI())
  pagesAmount();
  paginationBtns();
};
renderPagesAfterSearching(1);

    // selected btn listener
const selectPageBtn = document.querySelector('.pagination');
const selectPage = paginationContainer;

selectPageBtn.addEventListener("click", (event) => {
  const pageNumber = event.target.innerText;
  console.log(pageNumber);
  renderPagesAfterSearching(pageNumber);
});

selectPage.addEventListener('click', event => {
  const pageNumber = event.target.innerText;
  console.log(pageNumber);
  renderPagesAfterSearching(pageNumber);
});


//render pages amount from "Watched"
export function renderPagesFromWatched() {
  
};

//render pages amount from "Queue"
export function renderPagesFromQueue() {
  
};