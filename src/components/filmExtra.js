import AbstractComponent from "./AbstractComponent";

const createExtraFilmListTemplate = (type) => {
  return (
    `<section class="films-list--extra films-list--extra-most-${type}">
      <h2 class="films-list__title">Top ${type}</h2>
      <div class="films-list__container">
      </div>
    </section>`
  )
};


export default class FilmListExtra extends AbstractComponent{
  constructor(type) {
    super();

    this._type = type;
  }

  getTemplate() {
    return createExtraFilmListTemplate(this._type);
  }
}
