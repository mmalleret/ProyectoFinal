var express = require('express');
var router = express.Router();
var peliculasController = require('../controllers/peliculasController');
var usuariosController = require('../controllers/usuariosController');

router.get('/', peliculasController.home);
router.get('/listado', peliculasController.list);
router.get('/resultado', peliculasController.results);
router.get('/favoritos', peliculasController.favourites);
router.get('/registrarse', usuariosController.register);
router.post('/registrarse', usuariosController.save);
router.get('/resultadoUsuario', usuariosController.search);
router.get('/resenia/:idpelicula', peliculasController.listreviews)


module.exports = router;