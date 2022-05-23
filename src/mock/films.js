import {titles} from "../utils/titles";
import {types} from "../utils/types";
import {mocTexts} from "../utils/texts";
import {posters} from "../utils/posters";

const generateFilms = (count = 1) => {
  const result = [];

  for (let i = 0; i < count; i++) {
    let synopsis = [];
    let comments = [];

     for (let j = 0; j <= Math.floor(Math.random() * 3); j++) {
       synopsis.push(mocTexts[Math.floor(Math.random() * mocTexts.length)]);
     }

    for (let j = 0; j <= Math.floor(Math.random() * 12); j++) {
      comments.push(mocTexts[Math.floor(Math.random() * mocTexts.length)]);
    }


    result.push(
      {
        title: titles[Math.floor(Math.random() * titles.length)],
        rating: (Math.random() * 10).toFixed(1),
        year: Math.floor(Math.random() * 100) + 1922,
        duration: (Math.random() * 3).toFixed(2),
        type: types[Math.floor(Math.random() * titles.length)],
        synopsis: synopsis.join('. '),
        comments,
        poster: posters[Math.floor(Math.random() * posters.length)]
      }
    )
  }

  return result
}

export { generateFilms }
