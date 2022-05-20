const filterTypes = ['All movies', 'Watchlist', 'History', 'Favorites'];

const generateFilters = () => {
    return filterTypes.map((it) => {
        return {
          name: it,
          count: Math.floor(Math.random() * 15)
        }
    })
}

export { generateFilters }
