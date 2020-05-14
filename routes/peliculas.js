var express = require('express');
var router = express.Router();
var peliculasController = require('../controllers/peliculasController');

router.get('/', peliculasController.home);
router.get('/listado', peliculasController.list);
router.get('/resultado', peliculasController.results);
router.get('/favoritos', peliculasController.favourites);



module.exports = router;