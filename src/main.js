import {createUserInfoTemplate} from "./components/user.js"
import {createSiteMenuTemplate} from "./components/menu.js"
import {createSortTemplate} from "./components/sort.js"
import {createFilmListTemplate} from "./components/film.js"
import {createExtraFilmListTemplate} from "./components/film.js"
import {createFilmCardTemplate} from "./components/card.js"
import {createLoadMoreButtonTemplate} from "./components/more-button.js"
import {generateFilms} from "./mock/films";
import {generateFilters} from "./mock/filters";

const FILMS = generateFilms(10);
const FILTERS = generateFilters();

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createUserInfoTemplate(), `beforeend`);


const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createSiteMenuTemplate(FILTERS), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmListTemplate(), `beforeend`);

const films = siteMainElement.querySelector(`.films`);
const filmsContainer = films.querySelector(`.films-list`);
render(filmsContainer, createLoadMoreButtonTemplate(), `beforeend`);

const filmsList = filmsContainer.querySelector(`.films-list__container`);
for (let i = 0; i < FILMS.length; i++) {
  render(filmsList, createFilmCardTemplate(FILMS[i]), `beforeend`)
}

render(films, createExtraFilmListTemplate('rated'), `beforeend`);
render(films, createExtraFilmListTemplate('commented'), `beforeend`);

[...films.querySelectorAll('.films-list--extra')].forEach((el) => {
  render(el.querySelector('.films-list__container'), createFilmCardTemplate(FILMS[0]), `beforeend`)
  render(el.querySelector('.films-list__container'), createFilmCardTemplate(FILMS[1]), `beforeend`)
})
