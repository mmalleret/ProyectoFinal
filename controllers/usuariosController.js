let db = require("../db/models/index");
let bcrypt = require("bcryptjs");
let operadores = db.Sequelize.Op;

let usuariosController = {

    register: function(req, res){
        res.render('registrarse',{

        })

    },
    save: function(req, res){
        
        let usuario  = {
                nombre: req.body.nombre,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                fecha_de_nacimiento: req.body.fecha_de_nacimiento,
            }
    
        
        // Guardarla en base de datos....
        db.Usuario.create(usuario)
        .then(() => {
            res.redirect('/peliculas')
        })
            
    },
    search:function(req, res){
        let usuarios = []
        nombre = req.query.buscarUsuario
        res.send(nombre)
    if ( req.query tiene algo en la busqueda) {
     busco usuarios y mando a la vista
     }
     else {
    }
        res.render("resultadoUsuario", {
           
        })},
       

    

    

    
};
module.exports = usuariosController