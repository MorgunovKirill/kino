import {createElement} from "../utils/utils";

const createLoadMoreButtonTemplate = (pack) => {
  return (
    `<button class="films-list__show-more">Show more ${pack} films</button>`
  )
};


export default class LoadMoreButton {
  constructor(pack) {
    this._pack = pack;
    this._element = null;
  }

  getTemplate() {
    return createLoadMoreButtonTemplate(this._pack);
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
