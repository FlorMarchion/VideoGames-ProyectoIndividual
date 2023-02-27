const { Router } = require('express')
const router = Router()
const {getGenres} = require('../../controllers/genresController.js')

router.get('/', async (req, res) => {
  const genres = await getGenres()
  try {
    res.status(200).json(genres)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

module.exports = router
