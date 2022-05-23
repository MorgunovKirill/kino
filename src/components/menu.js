const createFilterMarkup = (filter) => {
  return `<a href="#${filter.name}" class="main-navigation__item">${filter.name} ${filter.name !== 'All movies' ? `<span class="main-navigation__item-count">${filter.count}</span>` : ''}</a>`
}

export const createSiteMenuTemplate = (filters) => {
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
