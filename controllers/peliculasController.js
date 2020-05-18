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
    }     

};
module.exports = peliculasController