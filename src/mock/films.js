const titles = ['Интерстеллар', 'Сядь за руль моей машины', 'Криминальное чтиво', 'Другие', 'Птицы', 'Мстители', 'Солярис', 'Форсаж', 'Аватар'];

const generateFilms = (count = 1) => {
  const result = [];

  for (let i = 0; i < count; i++) {
    result.push(
      {
        title: titles[Math.floor(Math.random() * titles.length)],
        rating: (Math.random() * 10).toFixed(1)
      }
    )
  }

  return result
}

export { generateFilms }
