let db = require('./db/models')
let bcrypt = require("bcryptjs")
let moduloLogin = {
    chequearUsuario: function (email) {
        return db.Usuario.findOne({
            where: {
                email: email
            }
        })
        .then(function(usuario) {
            return usuario != null;
        })
    },

    buscarPorEmail: function (email){
        return db.Usuario.findOne({
            where: {
                email:email
            }
        })
        .then(resultado=> {
            return resultado
        })
    },

    validar: function (email, pass) {
        return db.Usuario.findOne({
            where:{
                email:email
            },
        })
        .then(results=>{
            if (results != null && bcrypt.compareSync(pass, results.password)) {
                return results
            } else {
                return null
            }
        })
    }
}


module.exports = moduloLogin;