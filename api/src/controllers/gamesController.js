const axios = require('axios')
const { Videogame, Genre } = require('../db.js')

const getGamesOnDb = async () => {
  const gamesOnDb = await Videogame.findAll()
  if (gamesOnDb.lenght === 0) {
    throw new Error('No se encontraron juegos en la Db')
  }
  return gamesOnDb
}

// 100 juego de api
const getGamesOnApi = async () => {

  //Pego a la api y traigo 20 juegos
  //(pag 1 en iterador 0 ---> 20 juegos)
  let response = await axios.get(
    `https://api.rawg.io/api/games?key=94367e0b550d4672a679806d1218f538`,//3 ---> 4
  )

  //Hago el endpoint anterior 5 veces para traerme un total de 100 juegos
  let result = [];//1, 2 ---> next 3
  for (let i = 0; i < 5; i++) {
    result = [...result, ...response.data.results];
    response = await axios.get(response.data.next);//esto se repite 5 veces. // string url
  }

  const data = result.map((el) => {
    return {
      id: el.id,
      name: el.name,
      description: el.description,
      released: el.released,
      rating: el.rating,
      img: el.background_image,
      platforms: el.platforms.map((p) => p.platform.name),
      genres: el.genres.map((g) => g.name),
    }
  })
  return data;
}

const getAllGames = async () => {
  const apiData = await getGamesOnApi()
  const dbData = await getGamesOnDb()
  return [...apiData, ...dbData]
}

const getGameByName = async (name) => {
  let apiGames = await axios.get(
    `https://api.rawg.io/api/games?key=94367e0b550d4672a679806d1218f538&search=${name}`,
  )
  const dbGames = await getGamesOnDb();
  let allGames = [...apiGames.data.results, ...dbGames];

  let gamesNames = allGames.filter((el) =>
    el.name.toLowerCase().includes(name.toLowerCase()),
  )
  if (gamesNames.length === 0) {
    throw new Error(`No se encontraron datos`)
  }
  return gamesNames
}

const getGameById = async (id) => {
  if (isNaN(id)) {
    let idByDB = await Videogame.findOne({
      where: {
        id: id,
      },
      include: {
        model: Genre,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      }
    });
    if (!idByDB) {
      throw new Error('No se encontró el juego con el id solicitado')
    }
    return idByDB;
  }
  else {

    const findById = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=94367e0b550d4672a679806d1218f538`,
    )
    if (!findById) {
      throw new Error('No se encontró el juego con el id solicitado')
    }
    return {
      id: findById.data.id,
      name: findById.data.name,
      description: findById.data.description,
      released: findById.data.released,
      rating: findById.data.rating,
      img: findById.data.background_image,
      platforms: findById.data.platforms.map((p) => p.platform.name),
      genres: findById.data.genres.map((g) => g.name),
    }
  }
}


const createGame = async (game) => {
  try {
    const { genres } = game;
    const newGame = await Videogame.create(game)
    genres.map(async (el) => {
      let genreGameDB = await Genre.findOne({
        where: {
          name: el,
        },
      });
      await newGame.addGenre(genreGameDB);
    })
    if (!newGame) {
      throw new Error('Error interno, no se pudo crear el juego')
    }
    const gameCreated = await Videogame.findOne({
      where: {
        id: newGame.id,
      },
      include: {
				model: Genre,
				attributes: [],
				through: {
					attributes: [],
				},
			},
    })
    return gameCreated;
  } catch (error) {
    return error
  }
}

module.exports = {
  getGamesOnApi,
  getGamesOnDb,
  getAllGames,
  getGameByName,
  getGameById,
  createGame,
}
