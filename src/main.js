import {generateFilms} from "./mock/films";
import {generateFilters} from "./mock/filters";
import {compareBy, render} from "./utils/utils";
import UserInfo from "./components/user";
import SiteMenu from "./components/menu";
import Sort from "./components/sort";
import FilmList from "./components/film.js"
import LoadMoreButton from "./components/more-button";
import FilmListExtra from "./components/filmExtra";
import FilmCard from "./components/card";
import FilmPopup from "./components/popup";

const FILMS_COUNT = 19;
const FILMS_PACK = 5;

const FILMS = generateFilms(FILMS_COUNT);
const FILTERS = generateFilters();

let filmsRemaining = [...FILMS];

const renderFilmCard = (filmsListElement, film) => {
  const filmCardComponent = new FilmCard(film);
  const filmPopupComponent = new FilmPopup(film);

  const openPopup = () => {
    render(filmsListElement, filmPopupComponent.getElement(), `beforeend`);
  }

  const closePopup = () => {
    filmPopupComponent.getElement().parentElement.removeChild(filmPopupComponent.getElement())
    filmPopupComponent.removeElement()
  }

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

    if (isEscKey) {
      closePopup();
      document.removeEventListener('keydown', onEscKeyDown)
    }
  }

  const openPopupButton = filmCardComponent.getElement().querySelector('.film-card__comments');
  const openPopupButton2 = filmCardComponent.getElement().querySelector('.film-card__poster');
  const openPopupButton3 = filmCardComponent.getElement().querySelector('.film-card__title');

  openPopupButton.addEventListener('click', () => {
    openPopup()
    document.addEventListener('keydown', onEscKeyDown)
  })
  openPopupButton2.addEventListener('click', () => {
    openPopup()
    document.addEventListener('keydown', onEscKeyDown)
  })
  openPopupButton3.addEventListener('click', () => {
    openPopup()
    document.addEventListener('keydown', onEscKeyDown)
  })

  const closePopupButton = filmPopupComponent.getElement().querySelector('.film-details__close-btn');
  closePopupButton.addEventListener('click', () => {
    closePopup()
  })

  render(filmsListElement, filmCardComponent.getElement(), `beforeend`);
}

export const addFilms = (filmsArray, count) => {
  for (let i = 0; i < count; i++) {
    if (!filmsArray[i]) {
      filmsRemaining = [];
      filmsContainer.removeChild(filmsContainer.querySelector('.films-list__show-more'))
      return
    }

    renderFilmCard(filmsList, filmsArray[i])
  }

  filmsRemaining = filmsArray.slice(count)

  if (filmsRemaining.length < 1) filmsContainer.removeChild(filmsContainer.querySelector('.films-list__show-more'))
}

const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, new UserInfo().getElement(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new SiteMenu(FILTERS).getElement(), `beforeend`);

render(siteMainElement, new Sort().getElement(), `beforeend`);

render(siteMainElement, new FilmList().getElement(), `beforeend`);

const films = siteMainElement.querySelector(`.films`);
const filmsContainer = films.querySelector(`.films-list`);

render(filmsContainer, new LoadMoreButton(FILMS_PACK).getElement(), `beforeend`);

const filmsList = filmsContainer.querySelector(`.films-list__container`);

addFilms(filmsRemaining.slice(0), FILMS_PACK);

render(films, new FilmListExtra('rated').getElement(), `beforeend`);
render(films, new FilmListExtra('commented').getElement(), `beforeend`);

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

filmsContainer.querySelector('.films-list__show-more').addEventListener('click', (evt) => {
  evt.preventDefault();
  addFilms(filmsRemaining, FILMS_PACK);
})

