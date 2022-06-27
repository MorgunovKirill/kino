import {generateFilms} from "./mock/films";
import {generateFilters} from "./mock/filters";
import {render} from "./utils/render";
import UserInfo from "./components/user";
import PageController from "./controllers/PageController";

const FILMS_COUNT = 19;
const FILMS = generateFilms(FILMS_COUNT);
const FILTERS = generateFilters();

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserInfo(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

new PageController(siteMainElement, FILMS, FILTERS).render()
