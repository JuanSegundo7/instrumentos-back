const db = require("../database/models");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const saltRounds = 10;



const main = {
    post: async (req, res) => {
        try{
            let data = req.body;            
            let file = req.file;

            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(data.password, salt);

            
            let usuario = {
                username: String(data.username),
                nombre: String(data.nombre),
                email: String(data.email),
                apellido: String(data.apellido),
                password: hash,
                avatar: "/"+ data.nombre.trim().replace(/\s+/g, '') +"/" + file.filename,
            }

            let usuarios = await db.Users.create(usuario)

            ;
            
        }catch(e){
            console.log(e);
        }
    },
    acceso: async (req, res) => {
        try{            
            const {body} = req;
            const {username, password} = body

            let user = await db.Users.findOne({ where: {username: username}})

            /** Ternario para validar email si el usuario no utiliza su username */

            user === null ? user = await db.Users.findOne({ where: {email: username}}) : false

            const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password)

            if(!(user && passwordCorrect)){
                res.status(401).json({error: "Usuario o contraseña invalido"}) 
                    
            }

            const userforToken = {
                id: user.id,
                username: user.username
            }

            console.log(process.env.SECRETO);

            const token = jwt.sign(userforToken, "laLibertadoresLaJuegaPapa")

            res.send({nombre: user.nombre, username: user.username, avatar: user.avatar, token})
            
        }catch(error){
            console.log(error)
        }
    },
    post_favorites: async (req, res) => {
        let body = req.body

        let favoritos = {
            instrumento_id: req.body.id_fav,
            usuario_id: req.body.id
        }

        db.Favorites.create(favoritos)

        res.send(body)
    }
}


module.exports = main;