import AbstractComponent from "./AbstractComponent";

const createLoadMoreButtonTemplate = (pack) => {
  return (
    `<button class="films-list__show-more">Show more ${pack} films</button>`
  )
};


export default class LoadMoreButton extends AbstractComponent {
  constructor(pack) {
    super();

    this._pack = pack;
  }

  getTemplate() {
    return createLoadMoreButtonTemplate(this._pack);
  }

  setClickHandler(handler) {
    this.getElement().addEventListener('click', handler)
  }
}
