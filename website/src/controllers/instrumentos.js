const db = require("../database/models");

const instruments = {
    post: async (req, res) => {
        try{
            
            let data = req.body;
            let file = req.files;
            
            let instrumento = {
                nombre: String(data.nombre),
                fabricante: String(data.fabricante),
                modelo: String(data.modelo),
                color: String(data.color),
                precio: Number(data.precio),
                categoria_id: Number(data.categoria),
                descuento: String(data.descuento),
                precioDescuento: Number(data.precioDescuento),
                texto: String(data.texto),
                fecha: data.fecha,
            }

            let instrumentosCreated = await db.Instruments.create(instrumento);
            let imagenes = [];
            
            Array.from(file).forEach(img => {
                imagenes.push(img.filename);
            })

            let imagenesCreated = await imagenes.forEach(img => {  
                db.Image.create({
                    url_imagen: "/"+ data.nombre.trim().replace(/\s+/g, '') +"/" + img,
                    instrumento_id: instrumentosCreated.id
                })
            });
        
            
        }catch(e){
            console.log(e);
        }
        
    },
    categorys: async (req, res) => {
        try{
            let categoriaTitulo = await db.Category.findOne({where:{nombre: req.params.category}})
            let instrumentos = await db.Instruments.findAll({where:{categoria_id: categoriaTitulo.id}, include:{association: "imagenes"}},)

            return res.status(200).json({
                titulo: categoriaTitulo,
                instrumentos: instrumentos,
            })
        }catch(error){
            console.log(error)
            res.send(error)
        }
    }
}

module.exports = instruments