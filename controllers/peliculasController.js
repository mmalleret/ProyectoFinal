let db = require("../db/models/index");
let moduloLogin = require('../modulo-login');


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
    addReview: function(req, res){
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
        
    },
    myReviews: function(req, res){
        res.render('misResenias',{
        respuesta:[]    
        })

    }, 
    validationForm: async function(req, res){
        let resultado = await moduloLogin.validar(req.body.email, req.body.password)    
            if (resultado != null){ 
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
                    }else{
                        res.send("usuario invalido")
                    }     
            
            
     
            
    
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