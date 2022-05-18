import {titles} from "../utils/titles";
import {types} from "../utils/types";


const generateFilms = (count = 1) => {
  const result = [];

  for (let i = 0; i < count; i++) {
    result.push(
      {
        title: titles[Math.floor(Math.random() * titles.length)],
        rating: (Math.random() * 10).toFixed(1),
        year: Math.floor(Math.random() * 100) + 1922,
        duration: (Math.random() * 3).toFixed(2),
        type: types[Math.floor(Math.random() * titles.length)],
      }
    )
  }

  return result
}

export { generateFilms }
