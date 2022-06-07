const db = require('../database/models')

module.exports = async (req,res,next) => {
    try{
        // console.log("holaaa")
        // console.log(req.session.user)
        // console.log(req.body)
        var user
        if(!req.session.user){
            user = await db.Users.findOne({where: {password: req.body.password}})

            req.session.user = user
        } 

        res.locals.user = req.session.user

        // console.log(req.locals.user)

        // console.log(res.locals)

        res.redirect(`http://localhost:3000/user/${req.session.user.id}`)
        next()
    }catch(err){
        console.log(err)
    }
}