const db = require('../database/models')
const {body} = require("express-validator")
const bcrypt = require('bcrypt')

module.exports = [
    body("correo").isEmail().custom(async(value)=> {
        let registered1 = await db.User.findOne({where: {email: value}});
        if (!registered1) {
            return Promise.reject("El email no es valido, pruebe otra vez");
        }
        return true
    }),
    body("clave").isLength({min: 4}).custom(async(value, {req})=> {
        let registered = await db.User.findOne({where: {email: req.body.correo}});
        let clave = registered.clave;
        if (bcrypt.compareSync(value, clave)){
            return true;
        }else{
            return Promise.reject("La contraseña no es valida, pruebe otra vez");
        }
    })
]