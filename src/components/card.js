import AbstractComponent from "./AbstractComponent";

const createFilmCardTemplate = (film) => {
  const {title, rating, year, duration, type, synopsis, comments, poster} = film;

  return (
    `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${duration[0]}h ${Math.floor(parseInt(duration.slice(2)) / 100 * 60)}m</span>
            <span class="film-card__genre">${type}</span>
          </p>
          <img src="./images/posters/${poster}" alt="постер фильма" class="film-card__poster">
          <p class="film-card__description">${synopsis}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`
  )
};


export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();

    this._film  = film
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }
}
