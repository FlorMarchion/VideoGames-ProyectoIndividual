const { Router } = require('express')
const router = Router()
const getGenres = require('../../controllers/getGenres.js')

router.get('/', async (req, res) => {
  const results = await getGenres()
  try {
    res.status(200).send(results)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

module.exports = router
