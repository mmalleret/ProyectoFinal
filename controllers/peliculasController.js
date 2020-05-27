let db = require("../db/models/index");
let moduloLogin = require('../modulo-login');
async function validarAgregadoResenia(formulario) {
    let errores = [];
    let usuario = await moduloLogin.validar(formulario.email, formulario.password);
    if (usuario == null) {
        errores.push("Ey! No es valido el usuario!");
    }
    if (formulario.reseniaTexto == "") {
        errores.push("Ey! No me dejes el texto vacio!");
    }
    return errores;
}
let peliculasController = {
    home: function(req, res){
        res.render('home',{
        })
    },
    list: function(req, res){
        res.render('listado',{
            
        })
    }, 
    results: function(req, res){
        res.render('resultado',{
            
        })
    }, 
    favourites: function(req, res){
        res.render('favoritos',{
            
        })
    },
    listreviews: function(req,res){
        db.Resenia.findAll({
            where:[
                { id_pelicula:req.params.idpelicula }
            ]
        })
        .then(function(pelis){
            res.send(pelis)
        })
    }, 
    add: function(req, res){
        res.render('agregarResenia', {
            id : req.params.idPelicula
        })
    },
    addReview: async function(req, res){
        let errores = await validarAgregadoResenia(req.body);
        if (errores.length == 0) {
        moduloLogin.buscarPorEmail(req.body.email)    
        .then(resultado => {
            
            let resenia  = {
                id_pelicula: req.params.idPelicula,
                puntaje: req.body.puntaje,
                texto_de_resenia: req.body.reseniaTexto,
                id_usuarios: resultado.idusuarios
                
            
            }
                // Guardarla en base de datos....
                db.Resenia.create(resenia)
                .then(() => {
                    res.redirect('/peliculas')
                })
        })    
    } else {
        res.send(errores)
    }
        
    },
    myReviews: function(req, res){
        res.render('misResenias',{
        respuesta:[]    
        })
    }, 
    validationForm: async function(req, res){
        let resultado = await moduloLogin.validar(req.body.email, req.body.password)    
        console.log(resultado)
        res.send(resultado)
            let id  = {
                usuario: resultado.idusuarios}
                
                let respuesta = await db.Resenia.findAll({
                    where:[
                        { id_usuarios: id.usuario }
                    ]
                })
               
                     res.render("misResenias", {
                            respuesta: respuesta
                        })
                
            
            
     
            
    
    }, 
    edit : function(req, res){
        res.render('editar',{
            
        })
    }, 
    editReview : function(req, res){
        res.render('editar',{
            
        })
    }, 
    delete : function(req, res){
        res.render('delete',{
            
        })
    }, 
    deleteReview : function(req, res){
        res.render('delete',{
            
        })
    }, 
    
    
     
};
module.exports = peliculasController









