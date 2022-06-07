const db = require("../database/models");

const main = {
    user_id: async (req, res) => {
        console.log("id", req.params.id)
        let user = await db.Users.findOne({where: {id: req.params.id}});
        return res.send(user)
    },
    all: async (req, res) => {
        let user = await db.Users.findAll();
        console.log("user", user)
        return res.send(user)
    }
}

module.exports = main