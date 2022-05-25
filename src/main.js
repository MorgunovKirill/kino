import {createUserInfoTemplate} from "./components/user.js"
import {createSiteMenuTemplate} from "./components/menu.js"
import {createSortTemplate} from "./components/sort.js"
import {createFilmListTemplate} from "./components/film.js"
import {createExtraFilmListTemplate} from "./components/film.js"
import {createFilmCardTemplate} from "./components/card.js"
import {createLoadMoreButtonTemplate} from "./components/more-button.js"
import {generateFilms} from "./mock/films";
import {generateFilters} from "./mock/filters";

const FILMS_PACK = 5;
const FILMS = generateFilms(10);
const FILTERS = generateFilters();

let filmsRemaining = [...FILMS];

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const compareBy = (array, type) => {
  return [...array].sort(function (a, b) {

    if (Array.isArray(a[type])) {
        if (a[type].length > b[type].length) {
          return 1;
        }
        if (a[type].length < b[type].length) {
          return -1;
        }
        // a должно быть равным b
        return 0;
    } else {
      if (a[type] > b[type]) {
        return 1;
      }
      if (a[type] < b[type]) {
        return -1;
      }
      // a должно быть равным b
      return 0;
    }
  })
}

export const addFilms = (filmsArray, count) => {
  for (let i = 0; i < count; i++) {
    if (!filmsArray[i]) {
      filmsRemaining = [];
      filmsContainer.removeChild(filmsContainer.querySelector('.films-list__show-more'))
      return
    }
    render(filmsList, createFilmCardTemplate(filmsArray[i]), `beforeend`);
  }

  filmsRemaining = filmsArray.slice(count)

  if (filmsRemaining.length < 1) filmsContainer.removeChild(filmsContainer.querySelector('.films-list__show-more'))
}

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createUserInfoTemplate(), `beforeend`);


const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createSiteMenuTemplate(FILTERS), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmListTemplate(), `beforeend`);

const films = siteMainElement.querySelector(`.films`);
const filmsContainer = films.querySelector(`.films-list`);
render(filmsContainer, createLoadMoreButtonTemplate(FILMS_PACK), `beforeend`);

const filmsList = filmsContainer.querySelector(`.films-list__container`);


// for (let i = 0; i < FILMS.length; i++) {
//   render(filmsList, createFilmCardTemplate(FILMS[i]), `beforeend`)
// }
addFilms(filmsRemaining.slice(0), FILMS_PACK);

render(films, createExtraFilmListTemplate('rated'), `beforeend`);
render(films, createExtraFilmListTemplate('commented'), `beforeend`);

[...films.querySelectorAll('.films-list--extra')].forEach((el) => {
  if (el.classList.contains('films-list--extra-most-rated')) {
    const mostRatedFilms = compareBy(FILMS, 'rating');
    render(el.querySelector('.films-list__container'), createFilmCardTemplate(mostRatedFilms[mostRatedFilms.length - 1]), `beforeend`)
    render(el.querySelector('.films-list__container'), createFilmCardTemplate(mostRatedFilms[mostRatedFilms.length - 2]), `beforeend`)
  } else if (el.classList.contains('films-list--extra-most-commented')) {
    const mostCommentedFilms = compareBy(FILMS, 'comments');
    render(el.querySelector('.films-list__container'), createFilmCardTemplate(mostCommentedFilms[mostCommentedFilms.length - 1]), `beforeend`)
    render(el.querySelector('.films-list__container'), createFilmCardTemplate(mostCommentedFilms[mostCommentedFilms.length - 2]), `beforeend`)
  }
})

filmsContainer.querySelector('.films-list__show-more').addEventListener('click', (evt) => {
  evt.preventDefault();
  addFilms(filmsRemaining, FILMS_PACK);
})

