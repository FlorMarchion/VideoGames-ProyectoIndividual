const { Router } = require('express')
const router = Router()
const { getGames, getGameByName } = require('../../controllers/getGames.js')

router.get('/', async (req, res) => {
  const results = await getGames()
  try {
    const { name } = req.query
    const gamesByName = await getGameByName(name)
    if (gamesByName) {
      res.status(200).send(gamesByName)
    } else {
      res.status(200).send(results)
    }
  } catch (error) {
    res.status(404).send(error.message)
  }
})

module.exports = router
