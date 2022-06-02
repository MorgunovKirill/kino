import FilmCard from "../components/card";
import FilmPopup from "../components/popup";
import {render} from "./render";

export const renderFilmCard = (filmsListElement, film) => {
  const filmCardComponent = new FilmCard(film);
  const filmPopupComponent = new FilmPopup(film);

  const openPopup = () => {
    render(filmsListElement, filmPopupComponent, `beforeend`);
  }

  const closePopup = () => {
    filmsListElement.removeChild(filmPopupComponent.getElement())
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

  render(filmsListElement, filmCardComponent, `beforeend`);
}


export const renderFilms = (filmsListElement, films) => {

  films.forEach((film) => {
    renderFilmCard(filmsListElement, film)
  })
}

