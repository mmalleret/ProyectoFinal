var express = require('express');
var router = express.Router();
var peliculasController = require('../controllers/peliculasController');
var usuariosController = require('../controllers/usuariosController');

router.get('/', peliculasController.home);
router.get('/listado', peliculasController.list);
router.get('/resultado', peliculasController.results);
router.get('/favoritos', peliculasController.favourites);
router.get('/login', usuariosController.login);
router.get('/resenia/:idpelicula', peliculasController.listreviews)


module.exports = router;