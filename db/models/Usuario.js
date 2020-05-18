module.exports = (sequelize, DataTypes) => {

    let cols = {
        idusuarios: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true 
        },
        nombre: {
            type: DataTypes.STRING,


        },
        email: {
            type: DataTypes.STRING,
            allowNull: false

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false

        }, 
        fecha_de_nacimiento: {
            type: DataTypes.DATE,

        }

    }
    let config = {
        tableName: "usuarios", 
        timestamps: false
    }
    
    const Usuario = sequelize.define("Usuario", cols, config);
    
    Usuario.associate = function(models) {
        Usuario.hasMany(models.Resenia, {
            as: "resenias",
            foreignKey: "id_usuarios"
        });
    }
    return Usuario

}