import {createElement} from "../utils/utils";

const createFilterMarkup = (filter) => {
  return `<a href="#${filter.name}" class="main-navigation__item">${filter.name} ${filter.name !== 'All movies' ? `<span class="main-navigation__item-count">${filter.count}</span>` : ''}</a>`
}

const createSiteMenuTemplate = (filters) => {
  const filtersList = filters.map((it, i) => createFilterMarkup(it, i == 0)).join('\n');

  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
            ${filtersList}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  )
};

export default class SiteMenu {
    constructor(filters) {
        this._filters = filters;
        this._element = null;
    }

    getTemplate() {
        return createSiteMenuTemplate(this._filters);
    }

    getElement() {
        if (!this._element) {
            this._element = createElement(this.getTemplate())
        }

        console.log(this._element)
        return this._element;
    }

    removeElement() {
        this._element = null
    }
}

