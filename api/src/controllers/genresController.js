const axios = require('axios')
const { Genre } = require('../db.js')

const getGenres = async () => {
  const response = await axios.get(`https://api.rawg.io/api/genres?key=94367e0b550d4672a679806d1218f538`,)
  try {
    let genres = response.data.results.map((el) => el.name)
    genres.forEach((el) => {
      Genre.findOrCreate({
        where: {
          name: el,
        },
      });
    })
    return genres;
  } catch (error) {
    throw new Error({
      error:
        'No se encontraron géneros'
    })
  }
}


module.exports = { getGenres };
