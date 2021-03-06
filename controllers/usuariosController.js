let db = require("../db/models/index");
let bcrypt = require("bcryptjs");
let op = db.Sequelize.Op;


let usuariosController = {

    register: function(req, res){
        res.render('registrarse',{
            errores : false

        })

    },
    save: async function(req, res){
    let errores = [];
    if (req.body.nombre == "") {
        errores.push("Pone un nombre")

    } 
    if (req.body.email == ""){
        errores.push("Pone un mail")

    } 
    if (errores.length == 0) {

        let usuario  = {
                nombre: req.body.nombre,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                fecha_de_nacimiento: req.body.fecha_de_nacimiento,
            }
    
        // Guardarla en base de datos....
        await db.Usuario.create(usuario)
        
        res.redirect('/peliculas')
        
        }  
    else{
        res.render("registrarse",{
            errores: errores 
        })
    }      
    },
    search: function(req, res){
                  
            if (req.query.hasOwnProperty("buscarUsuario")) {

                db.Usuario.findAll({ 
                    where: {
                        [op.or]: [
                            { nombre: { [op.like]: "%" + req.query.buscarUsuario + "%" }},
                            { email: { [op.like]: "%" + req.query.buscarUsuario + "%" }}
                        ]
                    }
                })
                .then(function(resultado){
                    
                    res.render("resultadoUsuario", {
                        elUsuarioBuscado: resultado,
                        seHizoUnaBusqueda: true
                    })

                })
            }
            else {
                res.render("resultadoUsuario", {
                    seHizoUnaBusqueda: false
                })
            }
    },
    detail: function(req, res){
        db.Usuario.findByPk(req.params.idUser)
        .then(function(resultado){
            res.render("detalleUsuario", {
                usuario: resultado
            
            })

        })
    
    }
       

    

    

    
};
module.exports = usuariosController