let db = require("../db/models/index");
let moduloLogin = require('../modulo-login');

async function validarAgregadoResenia(formulario) {
    let errores = [];
​
    let usuario = await moduloLogin.validar(formulario.email, formulario.password);
​
    if (usuario == null) {
        errores.push("Ey! No es valido el usuario!");
    }
​
    if (formulario.reseniaTexto == "") {
        errores.push("Ey! No me dejes el texto vacio!");
    }
​
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
        ​
        let errores = await validarAgregadoResenia(req.body);
        ​
        ​
        if (errores.length == 0) {
        ​
            let resultado = await moduloLogin.buscarPorEmail(req.body.email) 
                    
                    let resenia  = {
                        id_pelicula: req.params.idPelicula,
                        puntaje: req.body.puntaje,
                        texto_de_resenia: req.body.reseniaTexto,
                        id_usuarios: resultado.idusuarios
                     }
        ​
            // Guardarla en base de datos....
            let resenia = await db.Resenia.create(resenia)
                 res.redirect('/peliculas')    
        } else {
                res.send(errores)
        }
                
    },
    myReviews: function(req, res){
            res.render('misResenias',{
                respuesta:[]    
            })
        ​
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
        db.Resenia.findByPk(req.query.id)
        .then((resenia) => {
            res.render("editar", {
                resenia: resenia,
            })
        })
    
    }, 
    editReview : function(req, res) {
        let resenia = {
            id: req.body.id_pelicula,
            puntaje: req.body.puntuacion,
            texto_de_resenia: req.body.reseniaTexto,
            updatedAt: req.body.fecha,
        }

        db.Resenia.update(resenia, {
            where: {
                idresenia: req.params.id
            }
        })
        .then(() => {
            res.redirect("/peliculas/misResenias")
        })

    }, 
    delete : function(req, res){
        res.render('delete',{
            
        })

    }, 
    deleteReview : function(req, res){

     db.Resenia.destroy({
                where: {
                    idresenia: req.query.id
                }
            })
        .then (()=>{res.redirect("/peliculas/misResenias")})

    }, 

    
    
     

};
module.exports = peliculasController