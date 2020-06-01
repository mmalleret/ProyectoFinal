module.exports = (sequelize, DataTypes) => {

    let cols = {
        idresenias: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true 
        },
        texto_de_resenia: {
            type: DataTypes.STRING,
            allowNull: false

        },
        puntaje: {
            type: DataTypes.INTEGER,
            allowNull: false

        },
        id_pelicula: {
            type: DataTypes.INTEGER,

        }, 
        createdAt :{
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP")

        },
        updatedAt :{
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP")

        }
    }
    let config = {
        tableName: "resenias", 
        timestamps: true
    }
    
    const Resenia = sequelize.define("Resenia", cols, config);
    Resenia.associate = function(models) {
        Resenia.belongsTo(models.Usuario, {
            as: "Usuario",
            foreignKey:"id_usuarios"
        });
    }
    return Resenia

}