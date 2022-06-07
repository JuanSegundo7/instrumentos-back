const db = require("../database/models");
const bcrypt = require('bcrypt');
const { body, validationResult } = require("express-validator");
const saltRounds = 10;


const main = {
    post: async (req, res) => {
        try{
            
            let data = req.body;
            console.log(req.body);
            
            let file = req.file;

            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(data.password, salt);

            console.log("password", data.password)
            console.log("password2", hash)

            
            let usuario = {
                nombre: String(data.nombre),
                apellido: String(data.apellido),
                password: String(hash),
                photo: "/"+ data.nombre.trim().replace(/\s+/g, '') +"/" + file.filename,
            }

            let usuarios = await db.Users.create(usuario)

            return console.log("llegue bien perreke");
            
        }catch(e){
            console.log(e);
        }
    },
    acceso: async (req, res) => {
        console.log(req.body)
        try{
            const errors = validationResult(req);
            // return res.send(errors)
            if (!errors.isEmpty()){
                console.log(errors)
                return res.redirect( { errors: errors.mapped(),title:"Acceso", old:req.body }, "http://localhost:3000/login");
            }else{
                let usuario = await db.User.findOne({where: {email: req.body.correo}});
                req.session.user = usuario;
                // return res.send(usuario)
                if(req.body.recordarme){
                    res.cookie("email",req.body.correo,{maxAge:300000})
                }
                // res.locals.userId = usuario.id;
                return res.redirect("/usuario/perfil/" + usuario.id)
            }
        }catch(error){
            res.send(error)
        }

        return res.redirect("http://localhost:3000/")

                // console.log("acceso")
                // var errors = validationResult(req)
                // if(!errors.isEmpty()){
                //     console.log(errors)
                //     console.log("LLEGUEEEE")
                    
                // }else{
                //     console.log("hola chango")
                //     // console.log("LLEGUEEEE2")
                //     // // let usuario = await db.User.findOne({where: {email: req.body.correo}});
                //     // req.session.user = usuario;
                //     // // return res.send(usuario)
                //     // if(req.body.recordarme){
                //     //     res.cookie("email",req.body.correo,{maxAge:300000})
                //     // }
                //     // // res.locals.userId = usuario.id;
                //     // return res.redirect("/usuario/perfil/" + usuario.id)
                // }
    }
}


module.exports = main;