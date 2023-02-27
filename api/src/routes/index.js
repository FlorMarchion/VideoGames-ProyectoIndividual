// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const { Router } = require('express');
const genresRouter = require('../routes/genresRouter/genres.js')
const gamesApi = require('../routes/gamesRouter/games.js')




const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/genres', genresRouter)
router.use('/videogames', gamesApi)

module.exports = router;
