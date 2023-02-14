const { Router } = require('express')
const router = Router()
const {
  getGameByName,
  getGameById,
  createGame,
  getGamesOnDb,
  getGamesOnApi,
  getAllGames
} = require('../../controllers/gamesController.js')

router.get('/', async (req, res) => {
  const { name } = req.query
  try {
    if (name) {
      const searchResult = await getGameByName(name)
      searchResult.length
        ? res.status(200).json(searchResult)
        : res.status(404).json('No se pudo encontrar el juego')
    } else {
      const games = await getAllGames()
      res.status(200).json(games)
    }
  } catch (error) {
    res.status(404).json(error)
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const getById = await getGameById(id)
    res.status(200).json(getById)
  } catch (error) {
    res.status(404).json(error.message)
  }
})

router.post('/createGame', async (req, res) => {
  const newGame = req.body
  const created = await createGame(newGame)
  try {
    res.status(200).json(created)
  } catch (error) {
    res.status(404).json(error.message)
  }
})

module.exports = router
