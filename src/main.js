import {generateFilms} from "./mock/films";
import {generateFilters} from "./mock/filters";
import {compareBy} from "./utils/utils";
import {render} from "./utils/render";
import {remove} from "./utils/remove";
import {renderFilmCard, renderFilms} from "./utils/renderFilms";
import UserInfo from "./components/user";
import SiteMenu from "./components/menu";
import Sort from "./components/sort";
import FilmList from "./components/film.js"
import LoadMoreButton from "./components/more-button";
import FilmListExtra from "./components/filmExtra";

const FILMS_COUNT = 19;

const SHOWING_FILMS_COUNT_ON_START = 5;
const FILMS_PACK = 5;

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

const FILMS = generateFilms(FILMS_COUNT);
const FILTERS = generateFilters();

const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, new UserInfo(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new SiteMenu(FILTERS), `beforeend`);

render(siteMainElement, new Sort(), `beforeend`);

render(siteMainElement, new FilmList(), `beforeend`);

const films = siteMainElement.querySelector(`.films`);
const filmsContainer = films.querySelector(`.films-list`);

const filmsList = filmsContainer.querySelector(`.films-list__container`);

renderFilms(filmsList, FILMS.slice(0, SHOWING_FILMS_COUNT_ON_START));

render(films, new FilmListExtra('rated'), `beforeend`);
render(films, new FilmListExtra('commented'), `beforeend`);

[...films.querySelectorAll('.films-list--extra')].forEach((el) => {
  if (el.classList.contains('films-list--extra-most-rated')) {
    const mostRatedFilms = compareBy(FILMS, 'rating');
    renderFilmCard(el.querySelector('.films-list__container'), mostRatedFilms[mostRatedFilms.length - 1]);
    renderFilmCard(el.querySelector('.films-list__container'), mostRatedFilms[mostRatedFilms.length - 2]);
  } else if (el.classList.contains('films-list--extra-most-commented')) {
    const mostCommentedFilms = compareBy(FILMS, 'comments');
    renderFilmCard(el.querySelector('.films-list__container'), mostCommentedFilms[mostCommentedFilms.length - 1]);
    renderFilmCard(el.querySelector('.films-list__container'), mostCommentedFilms[mostCommentedFilms.length - 2]);
  }
})

const moreButton = new LoadMoreButton(FILMS_PACK);
render(filmsContainer, moreButton, `beforeend`);

moreButton.setClickHandler((evt) => {
  evt.preventDefault();
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + FILMS_PACK;

  renderFilms(filmsList, FILMS.slice(prevFilmsCount, showingFilmsCount));

  if (showingFilmsCount >= FILMS.length) {
    remove(moreButton)
  }
});

