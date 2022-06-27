import {render} from "../utils/render";
import {remove} from "../utils/remove";
import Sort from "../components/sort";
import FilmList from "../components/film";
import SiteMenu from "../components/menu";
import LoadMoreButton from "../components/more-button";
import {renderFilmCard, renderFilms} from "../utils/renderFilms";
import FilmListExtra from "../components/filmExtra";
import {compareBy} from "../utils/utils";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

export default class PageController {
  constructor(container, films, filters) {
    this._container = container;
    this._films = films;

    this._menuComponent = new SiteMenu(filters);
    this._sortComponent = new Sort();
    this._filmsComponent = new FilmList();
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    this._loadMoreButtonComponent = new LoadMoreButton(SHOWING_FILMS_COUNT_BY_BUTTON);
  }

  render() {
    render(this._container, this._menuComponent, `beforeend`);

    render(this._container, this._sortComponent, `beforeend`);

    render(this._container, this._filmsComponent, `beforeend`);

    const filmsContainer = this._filmsComponent.getElement().querySelector(`.films-list__container`);


    renderFilms(filmsContainer, this._films.slice(0, SHOWING_FILMS_COUNT_ON_START));

    this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick.bind(this, filmsContainer));

    render(this._filmsComponent.getElement(), this._loadMoreButtonComponent, `beforeend`);

    render(this._filmsComponent.getElement(), new FilmListExtra('rated'), `beforeend`);
    render(this._filmsComponent.getElement(), new FilmListExtra('commented'), `beforeend`);

    [...this._filmsComponent.getElement().querySelectorAll('.films-list--extra')].forEach((el) => {
      if (el.classList.contains('films-list--extra-most-rated')) {
        const mostRatedFilms = compareBy(this._films, 'rating');
        renderFilmCard(el.querySelector('.films-list__container'), mostRatedFilms[mostRatedFilms.length - 1]);
        renderFilmCard(el.querySelector('.films-list__container'), mostRatedFilms[mostRatedFilms.length - 2]);
      } else if (el.classList.contains('films-list--extra-most-commented')) {
        const mostCommentedFilms = compareBy(this._films, 'comments');
        renderFilmCard(el.querySelector('.films-list__container'), mostCommentedFilms[mostCommentedFilms.length - 1]);
        renderFilmCard(el.querySelector('.films-list__container'), mostCommentedFilms[mostCommentedFilms.length - 2]);
      }
    })
  }


  _onLoadMoreButtonClick(container) {
    const prevFilmsCount = this._showingFilmsCount;
    this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;
    renderFilms(container, this._films.slice(prevFilmsCount, this._showingFilmsCount));

    if (this._showingFilmsCount >= this._films.length) {
      remove(this._loadMoreButtonComponent);
    }
  }
}
