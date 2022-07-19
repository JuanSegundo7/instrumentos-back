module.exports = (sequelize, dataTypes) => {
    let alias = "Favorites";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notNull: true
        },
        instrumento_id: {
            type: dataTypes.INTEGER,
            notNull: true,
        },
        usuario_id: {
            type: dataTypes.INTEGER,
            notNull: true,
        }
    };

    let config = {
        tableName: "instrumentos_guardados",
        timestamps: false
    }

    let Favorites = sequelize.define(alias,cols,config)

    Favorites.associate = function(models){
        Favorites.belongsTo(models.Users, {
            as: "usuarios",
            foreignKey: "usuario_id"
        })
    }

    return Favorites
}