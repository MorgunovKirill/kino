import {createElement} from "../utils/utils";

const createExtraFilmListTemplate = (type) => {
  return (
    `<section class="films-list--extra films-list--extra-most-${type}">
      <h2 class="films-list__title">Top ${type}</h2>
      <div class="films-list__container">
      </div>
    </section>`
  )
};


export default class FilmListExtra {
  constructor(type) {
    this._type = type;
    this._element = null;
  }

  getTemplate() {
    return createExtraFilmListTemplate(this._type);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate())
    }

    return this._element;
  }

  removeElement() {
    this._element = null
  }
}
