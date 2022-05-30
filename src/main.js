import {createFilmCardTemplate} from "./components/card.js"
import {generateFilms} from "./mock/films";
import {generateFilters} from "./mock/filters";
import {compareBy, render, render2} from "./utils/utils";
import UserInfo from "./components/user";
import SiteMenu from "./components/menu";
import Sort from "./components/sort";
import FilmList from "./components/film.js"
import LoadMoreButton from "./components/more-button";
import FilmListExtra from "./components/filmExtra";

const FILMS_COUNT = 19;
const FILMS_PACK = 5;

const FILMS = generateFilms(FILMS_COUNT);
const FILTERS = generateFilters();

let filmsRemaining = [...FILMS];

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

render2(siteHeaderElement, new UserInfo().getElement(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);
render2(siteMainElement, new SiteMenu(FILTERS).getElement(), `beforeend`);

render2(siteMainElement, new Sort().getElement(), `beforeend`);

render2(siteMainElement, new FilmList().getElement(), `beforeend`);

const films = siteMainElement.querySelector(`.films`);
const filmsContainer = films.querySelector(`.films-list`);

render2(filmsContainer, new LoadMoreButton(FILMS_PACK).getElement(), `beforeend`);

const filmsList = filmsContainer.querySelector(`.films-list__container`);

addFilms(filmsRemaining.slice(0), FILMS_PACK);

render2(films, new FilmListExtra('rated').getElement(), `beforeend`);
render2(films, new FilmListExtra('commented').getElement(), `beforeend`);


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

