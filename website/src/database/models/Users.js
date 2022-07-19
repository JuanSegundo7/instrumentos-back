module.exports = (sequelize, dataTypes) => {
    let alias = "Users"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notNull: true
        },
        username: {
            type: dataTypes.STRING(30),
            notNull: true,
        },
        nombre: {
            type: dataTypes.STRING(30),
            notNull: true,
        },
        email: {
            type: dataTypes.STRING(40),
            notNull: true
        },
        apellido: {
            type: dataTypes.STRING(30),
            notNull: true
        },
        password: {
            type: dataTypes.STRING(100),
            notNull: true
        },
        avatar: {
            type: dataTypes.STRING(200),
            notNull: true
        }
    }
    
    let config = {
        tableName: "usuarios",
        timestamps: false
    }

    const Users = sequelize.define(alias,cols,config) 

    Users.associate = function(models){
        Users.hasMany(models.Favorites, {
            as: "favoritos",
            foreignKey: "usuario_id",
        })
    }
    
    return Users
}