const axios = require('axios')

const getGenres = async () => {
  const urlApi = await axios.get(
    `https://api.rawg.io/api/genres?key=94367e0b550d4672a679806d1218f538`,
  )

  const genres = await urlApi.data.results.map((el) => {
    return {
      name: el.name,
    }
  })

  if (genres.length === 0) throw new Error('No se encontraron datos')
  return genres
}

module.exports = getGenres
