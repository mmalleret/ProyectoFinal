let db = require("../db/models/index");
let bcrypt = require("bcryptjs");

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
        db.Usuario.findAll()

            .then(function(usuarios) {
               res.send(usuarios)
            })
            .catch((e) => {
                res.send(e)
            })
        },

    
};
module.exports = usuariosController