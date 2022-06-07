const db = require("../database/models");

const apiInstrumentos = {
    instruments: async (req, res) => {
        try{
            let instruments = await db.Instruments.findAll({include: "imagenes"})

            let categorias = await db.Category.findAll()

            let instrumentosFinal = instruments.map(function (instrumento) {
                return{
                    id: instrumento.id,
                    nombre: instrumento.nombre,
                    fabricante: instrumento.fabricante,
                    precio: instrumento.precio,
                    descuento: instrumento.descuento,
                    precioDescuento: instrumento.precioDescuento,
                    texto: instrumento.texto,
                    fecha: instrumento.fecha,
                    imagenes: instrumento.imagenes,
                    categoria: instrumento.categoria_id,
                    detail: "http://localhost:5000/instrumentos/" + instrumento.id
                }
            },)
            return res.status(200).json({
                instrumentos: instrumentosFinal,
                categorias: categorias,
            })
        }catch(error){
            console.log(error)
            res.send(error)
        }
    },
    instruments_id: async (req, res) => {
        try{
            let id = await db.Instruments.findOne({ where: { id: req.params.id}, include:{association: "imagenes"} });

            return res.send(id)
        }
        catch(error){
            console.log(error)
        }
    },
    offers: async (req, res) => {
        let offers = await db.Instruments.findAll({where: {descuento: 1}, include:{association: "imagenes"}})

        return res.send(offers)
    },
}

module.exports = apiInstrumentos