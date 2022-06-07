module.exports = (sequelize, dataTypes) => {
    let alias = "Instruments"
    let cols = {
        id: {   
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notNull: true,
        },
        nombre: {
            type: dataTypes.STRING(100),
            notNull: true,
        },
        fabricante: {
            type: dataTypes.STRING(100),
            notNull: true,
        },
        descuento: {
            type: dataTypes.STRING(100),
            notNull: true,
        },
        color: {
            type: dataTypes.STRING(100),
            notNull: true,
        },
        modelo: {
            type: dataTypes.STRING(100),
            notNull: true,
        },
        precio: {
            type: dataTypes.FLOAT,
            notNull: true,
        },
        precioDescuento: {
            type: dataTypes.FLOAT,
            notNull: true,
        },
        texto: {
            type: dataTypes.TEXT,
            notNull: true,
        },
        fecha: {
            type: dataTypes.DATE,
            notNull: true,
        },
        categoria_id: {
            type: dataTypes.INTEGER,
            notNull: true,
        }
    }

    let config = {
        tableName: "instrumentos",
        timestamps: false
    }

    const Instruments = sequelize.define(alias,cols,config)

    Instruments.associate = function(models){
        Instruments.belongsTo(models.Category, {
            as: "categoria",
            foreignKey: "categoria_id",
        })
        Instruments.hasMany(models.Image, {
            as: "imagenes",
            foreignKey: "instrumento_id",
        })
    }
    return Instruments
}