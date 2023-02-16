"use strict";

import { fetchMovies } from "./search-movies";
import { APIKey, listBuilder, getDataFromAPI } from './movies-list';

const paginationContainer = document.querySelector('#pagination-container');
const moviesContainer = document.querySelector('.covers-container');

const MOVIES_API_URL = "https://api.themoviedb.org/3/search/movie?api_key=${APIKey}";
const MOVIES_PER_PAGE = 20;

// creating pagination buttons' container
let pages = 20;

document.getElementById('pagination').innerHTML = createPagination(pages, 12);

export function createPagination(pages, page) {
  let str = '<ul>';
  let active;
  let pageCutLow = page - 1;
  let pageCutHigh = page + 1;
  // Show the Previous button only if you are on a page other than the first
  if (page > 1) {
    str += '<li class="page-item previous no"><a onclick="createPagination(pages, '+(page-1)+')">\uD83E\uDC60</a></li>';
  }
  // Show all the pagination elements if there are less than 6 pages total
  if (pages < 6) {
    for (let p = 1; p <= pages; p++) {
      active = page == p ? "active" : "no";
      str += '<li class="'+active+'"><a onclick="createPagination(pages, '+p+')">'+ p +'</a></li>';
    }
  }
  // Use "..." to collapse pages outside of a certain range
  else {
    // Show the very first page followed by a "..." at the beginning of the
    // pagination section (after the Previous button)
    if (page > 2) {
      str += '<li class="no page-item"><a onclick="createPagination(pages, 1)">1</a></li>';
      if (page > 3) {
          str += '<li class="out-of-range"><a onclick="createPagination(pages,'+(page-2)+')">...</a></li>';
      }
    }
    // Determine how many pages to show after the current page index
    if (page === 1) {
      pageCutHigh += 2;
    } else if (page === 2) {
      pageCutHigh += 1;
    }
    // Determine how many pages to show before the current page index
    if (page === pages) {
      pageCutLow -= 2;
    } else if (page === pages-1) {
      pageCutLow -= 1;
    }
    // Output the indexes for pages that fall inside the range of pageCutLow
    // and pageCutHigh
    for (let p = pageCutLow; p <= pageCutHigh; p++) {
      if (p === 0) {
        p += 1;
      }
      if (p > pages) {
          continue;
      }
      active = page == p ? "active" : "no";
      str += '<li class="page-item '+active+'"><a onclick="createPagination(pages, '+p+')">'+ p +'</a></li>';
    }
    // Show the very last page preceded by a "..." at the end of the pagination
    // section (before the Next button)
    if (page < pages-1) {
      if (page < pages-2) {
        str += '<li class="out-of-range"><a onclick="createPagination(pages,'+(page+2)+')">...</a></li>';
      }
      str += '<li class="page-item no"><a onclick="createPagination(pages, pages)">'+pages+'</a></li>';
    }
  }
  // Show the Next button only if you are on a page other than the last
  if (page < pages) {
    str += '<li class="page-item next no"><a onclick="createPagination(pages, '+(page+1)+')">\uD83E\uDC62</a></li>';
  }
  str += '</ul>';
  // Return the pagination string to be outputted in the pug templates
  document.getElementById('pagination').innerHTML = str;
  return str;
}

//
// const selectPageBtns = document.querySelectorAll('.pageItem');
// selectPageBtns.forEach((pageItem) => {
//     pageItem.addEventListener("click", (event) => {
//         const pageNumber = event.target.innerText;
//         console.log(pageItem)
//         // getMovies(pageNumber);
//     })
// });

// const selectPage = paginationContainer;
// selectPage.addEventListener('click', event => {
//     const pageNumber = event.target.innerText;
//         console.log(pageNumber);
// });


//////////////////

//     const previousBtn = document.createElement('a');
//         previousBtn.innerHTML = `${"\uD83E\uDC60"}`;
//         previousBtn.classList.add("pageBtn");
//         previousBtn.classList.add("previousBtn");
//     const nextBtn = document.createElement('a');
//         nextBtn.innerHTML = `${"\uD83E\uDC62"}`;
//         nextBtn.classList.add("pageBtn");
//         nextBtn.classList.add("nextBtn");
//     const leftMorePagesBtn = document.createElement('a');
//         leftMorePagesBtn.innerHTML = `...`;
//         leftMorePagesBtn.classList.add("leftMorePagesBtn");
//         leftMorePagesBtn.classList.add("hidden");
//     const rightMorePagesBtn = document.createElement('a');
//         rightMorePagesBtn.innerHTML = `...`;
//         rightMorePagesBtn.classList.add("rightMorePagesBtn");
//         // rightMorePagesBtn.classList.add("hidden");
    
// const setPaginationBtns = () => {
//     paginationContainer.append(previousBtn);
//     paginationContainer.append(leftMorePagesBtn);
//     for (let i = 1; i <= 10; i++) {
//         const btn = document.createElement('a');
//         btn.classList.add("pageBtn");
//         btn.innerText = i;
//         btn.value = i;
//         paginationContainer.append(btn);
//     };
//     paginationContainer.append(rightMorePagesBtn);
//     paginationContainer.append(nextBtn);
// };

// const selectPageBtns = document.querySelectorAll('.pageBtn');
// selectPageBtns.forEach((pageBtn) => {
//     pageBtn.addEventListener("click", (event) => {
//         const pageNumber = event.target.innerText;
//         console.log(pageNumber)
//         // getMovies(pageNumber);
//     })
// });

// const selectPage = paginationContainer;
// selectPage.addEventListener('click', event => {
//     const pageNumber = event.target.innerText;
//         console.log(pageNumber);
// });




// TO DO: combine "moviesAmount" with a function that returns amount of searched movies
function btnsAmount(moviesAmount = 100, selectPage = 1, pageSize = 20) {
    const pages = Math.ceil(moviesAmount / pageSize);
    const paginationContainer = document.querySelector('#pagination-container');
    // add 
};


// implementing pagination
const clearPageContent = () => {
    moviesContainer.innerHTML = "";
};

window.onload = () => {
    const pagination = (page) => {
        clearPageContent();
        const params = new URLSearchParams({
            api_key: APIKey,
            limit: MOVIES_PER_PAGE,
            page: page,
        });
        fetch(`MOVIES_API_URL + "?" + params`)
            .then((response) => response.data)
            .then(getDataFromAPI())
    }
};

// pagination(1);
// setPaginationBtns();

export { pagination, setPaginationBtns, clearPageContent };
