import {createUserInfoTemplate} from "./components/user.js"
import {createSiteMenuTemplate} from "./components/menu.js"
import {createSortTemplate} from "./components/sort.js"
import {createFilmListTemplate} from "./components/film.js"
import {createExtraFilmListTemplate} from "./components/film.js"
import {createFilmCardTemplate} from "./components/card.js"
import {createLoadMoreButtonTemplate} from "./components/more-button.js"
import {generateFilms} from "./mock/films";

const FILMS = generateFilms(10)

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createUserInfoTemplate(), `beforeend`);


const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmListTemplate(), `beforeend`);

const films = siteMainElement.querySelector(`.films`);
const filmsContainer = films.querySelector(`.films-list`);
render(filmsContainer, createLoadMoreButtonTemplate(), `beforeend`);

const filmsList = filmsContainer.querySelector(`.films-list__container`);
for (let i = 0; i < FILMS.length; i++) {
  render(filmsList, createFilmCardTemplate(FILMS[i]), `beforeend`)
}

render(films, createExtraFilmListTemplate(), `beforeend`);
render(films, createExtraFilmListTemplate(), `beforeend`);

// [...films.querySelectorAll('.films-list--extra')].forEach((el) => {
//   render(el.querySelector('.films-list__container'), createFilmCardTemplate(), `beforeend`)
//   render(el.querySelector('.films-list__container'), createFilmCardTemplate(), `beforeend`)
// })
