const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");
const instrumentos = require("../controllers/instrumentos");
const multer = require("multer");



// ************ Multer ************

const dest = multer.diskStorage({
    destination: function (req, file, cb) {
        let dir = path.resolve(__dirname,"../../public/uploads","instruments", String(req.body.nombre).trim().replace(/\s+/g, ''))
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

// ************ Rutas ************

router.post("/guardar",[upload.any("images")], instrumentos.post); 
router.get("/:category",  instrumentos.categorys)




module.exports = router