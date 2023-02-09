const axios = require('axios')

const getGames = async () => {
  const urlApi = await axios.get(
    `https://api.rawg.io/api/games?key=94367e0b550d4672a679806d1218f538`,
  )
  const data = await urlApi.data.results.map((el) => {
    return {
      id: el.id,
      name: el.name,
      description: el.description,
      released: el.released,
      rating: el.rating,
      img: el.background_image,
      platforms: el.platforms.map((p) => p.platform.name),
      genres: el.genres.map((p) => p.name),
    }
  })
  if (data.lenght === 0) throw new Error('No se encontraron resultados')
  return data
}

const getGameByName = async (name) => {
  const findGame = await axios.get(
    `https://api.rawg.io/api/games?search=${name}&key=94367e0b550d4672a679806d1218f538`,
  )
  if (findGame.data.results.length === 0) {
    throw new Error(`No se encontraron datos`)
  }
  return findGame;
}

module.exports = { getGames, getGameByName }
