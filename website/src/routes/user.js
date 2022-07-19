const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");
const user = require("../controllers/user");
// const userlogin = require("../middlewares/user")
const multer = require("multer");

// ************ Multer ************

const dest = multer.diskStorage({
    destination: function (req, file, cb) {
        let dir = path.resolve(__dirname,"../../public/uploads","users", String(req.body.nombre).trim().replace(/\s+/g, ''))
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
})

const upload = multer({storage:dest});


// ************ Routes ************

router.post("/login", user.acceso)
router.post('/guardar', upload.single("file") , user.post)
router.post("/fav", user.post_favorites)

module.exports = router;