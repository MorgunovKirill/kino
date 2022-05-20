export const createFilmListTemplate = () => {
  return (
    `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container"></div>
    </section>
`
  )
};

export const createExtraFilmListTemplate = (type) => {
  return (
    `  <section class="films-list--extra films-list--extra-most-${type}">
      <h2 class="films-list__title">Top ${type}</h2>
      <div class="films-list__container">
      </div>
    </section>
`
  )
};
