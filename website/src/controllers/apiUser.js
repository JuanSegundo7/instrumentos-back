const db = require("../database/models");
const instrumentos = require("./apiInstruments")

const main = {
    user_id: async (req, res) => {
        console.log("id", req.params.id)
        let user = await db.Users.findOne({where: {id: req.params.id},include:{association: "favoritos"}});
        return res.send(user)
    },
    all: async (req, res) => {
        let user = await db.Users.findAll({include:{association: "favoritos"}});
        console.log("user", user)
        return res.send(user)
    },
    favs: async (req, res) => {
        let container = []
        let container2 = []
        let object = {}

        let favs = await db.Favorites.findAll({where: {usuario_id: req.params.id}})
        
        // for (let i = 0; i < favs.length; i++) {
        //     container.push(favs[i].instrumento_id)
        // }

        favs.forEach(instrumento => {
            container.push(instrumento.instrumento_id)
        })



        for(let i = 0; i < container.length; i++) {
            container2.push(await db.Instruments.findAll({where: {id: container[i]}, include:{association: "imagenes"}}))
        } 


        let vari = container2.map(instrumento => instrumento[0]);  // BIBLIA //       

        return res.send(vari)
    }
}

module.exports = main