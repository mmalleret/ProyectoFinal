let db = require("../db/models/index");


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
        res.render('agregarResenia')
    },
    addReview: function(req, res){
        let resenia  = {
                    texto_de_resenia: req.body.reseniaTexto,
                    puntaje: req.body.puntaje,
                }
        
            
            // Guardarla en base de datos....
            db.Resenia.create(resenia)
            .then(() => {
                res.redirect('/pelicula/agregarResenia')
            })
    }      

};
module.exports = peliculasController