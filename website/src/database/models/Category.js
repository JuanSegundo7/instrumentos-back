module.exports = (sequelize, dataTypes) => {
    let alias = "Category"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notNull: true
        },
        nombre: {
            type: dataTypes.STRING(30),
            notNull: true,
        }
    }
    let config = {
        tableName: "categorias",
        timestamps: false
    }

    const Category = sequelize.define(alias,cols,config)

    Category.associate = function(models){
        Category.hasMany(models.Instruments, {
            as: "instrumentos",
            foreignKey: "categoria_id"
        })
    }

    return Category
}