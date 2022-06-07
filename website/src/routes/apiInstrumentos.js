// ************ Require's ************

const express = require('express');
const router = express.Router();
const api = require("../controllers/apiInstruments.js");

// ************ Rutas ************

router.get("/all", api.instruments)
router.get("/ofertas",  api.offers)
router.get("/:id", api.instruments_id)


module.exports = router