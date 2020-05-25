var express = require('express');
var router = express.Router();
var peliculasController = require('../controllers/peliculasController');
var usuariosController = require('../controllers/usuariosController');

//rutas proyecto peliculas 
router.get('/', peliculasController.home);
router.get('/listado', peliculasController.list);
router.get('/resultado', peliculasController.results);
router.get('/favoritos', peliculasController.favourites);

//rutas de formulario de registración 
router.get('/registrarse', usuariosController.register);
router.post('/registrarse', usuariosController.save);

//ruta para el resultado del buscador de usuarios
router.get('/resultadoUsuario', usuariosController.search);

//ruta detalle usuario
router.get('/detalleUsuario/:idUser', usuariosController.detail);

//rutas reseñas peliculas 
router.get('/resenias/:idpelicula', peliculasController.listreviews);

//formulario de agregar reseña
router.get('/agregarResenia/:idPelicula', peliculasController.add);
router.post('/agregarResenia/:idPelicula', peliculasController.addReview)

//mis reseñas formulario de login 
router.get('/misResenias', peliculasController.myReviews);
router.post('/misResenias', peliculasController.validationForm);

//una vez que valide el usuario para ver mis resenias me deja verlas 
//router.get('/verMisResenias', peliculasController.view);

//editar pelicula 
router.get('/editar/:id', peliculasController.edit);
router.post('/editar/:id', peliculasController.editReview);

//borrar pelicula
router.get('/borrar/:id', peliculasController.delete);
router.post('/borrar/:id', peliculasController.deleteReview);
module.exports = router;