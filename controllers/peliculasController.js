let db = require("../db/models/index");
let moduloLogin = require('../modulo-login');

async function validarAgregadoResenia(formulario) {
    let errores = [];
    let registro = await moduloLogin.chequearUsuario(formulario.email)
    if (registro != true) { //en la posision 0 avisa que el email no existe
     errores.push("No existe el mail")
     return errores
    }
    
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
            ], 
            include: [
                {association: 'Usuario'}
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
    } else if (errores[0] == "No existe el mail" ) {
        res.redirect("/peliculas/registrarse")
        
    } else {
        res.redirect('/peliculas/error101')
        // res.render('agregarResenia',{
        //     errores: errores,
        // })
    }
        
    },
    myReviews: function(req, res){
        res.render('misResenias',{
        respuesta:[],
        hayresenia: false, 

        })
    }, 
    validationForm: async function(req, res){
        let resultado = await moduloLogin.validar(req.body.email, req.body.password)    
        if(resultado != null){
            let id  = {
                usuario: resultado.idusuarios}
                
                let respuesta = await db.Resenia.findAll({
                    where:[
                        { id_usuarios: id.usuario }
                    ]
                })               
                     res.render("misResenias", {
                            respuesta: respuesta,
                            hayresenia: true
                        })
        } else {
            
            res.redirect("/peliculas/error404")
        }
    }, 
    edit : function(req, res){
        db.Resenia.findByPk(req.params.id)
        .then((resenia) => {
            res.render("editar", {
                resenia: resenia,
            })
        })
    
    }, 
    editReview : async function(req, res) {
        let resultado = await moduloLogin.validar(req.body.email, req.body.password)    
        if(resultado != null){
        db.Resenia.update({
            
            puntaje: req.body.puntaje,
            texto_de_resenia: req.body.reseniaTexto,
    
        },{ where: [
                {idresenias: req.params.id}
            ]
        })
        .then(() => res.redirect("/peliculas/misResenias"))
    } else {
            
        res.redirect("/peliculas/error404")
    }

    }, 
    delete : function(req, res){
        res.render('delete',{
            idBorrar : req.params.idBorrar
        })

    }, 
    deleteReview : async function(req, res){
        let resultado = await moduloLogin.validar(req.body.email, req.body.password)    
        if(resultado != null){

        let respuesta = await db.Resenia.destroy({
                    where: [
                        {idresenias: req.params.idBorrar}
                    ]
                })
        
            res.redirect("/peliculas/misResenias")
        } else {
                
            res.redirect("/peliculas/error404")
        }

    }, 
    errors: function(req, res){
        res.render('errores',{
        })
    },
    errorsA: function(req, res){
        res.render('erroresA',{
        })
    }

    
    
     
};
module.exports = peliculasController









