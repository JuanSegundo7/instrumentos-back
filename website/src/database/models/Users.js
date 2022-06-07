module.exports = (sequelize, dataTypes) => {
    let alias = "Users"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notNull: true
        },
        nombre: {
            type: dataTypes.STRING(20),
            notNull: true,
        },
        apellido: {
            type: dataTypes.STRING(20),
        notNull: true
        },
        password: {
            type: dataTypes.STRING(100),
            notNull: true
        },
        photo: {
            type: dataTypes.STRING(200),
            notNull: true
        }
    }
    let config = {
        tableName: "usuarios",
        timestamps: false
    }

    const Users = sequelize.define(alias,cols,config) 

    return Users
}