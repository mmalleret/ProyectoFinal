//let db = require("../database/models/index");


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

    }     

};
module.exports = peliculasController