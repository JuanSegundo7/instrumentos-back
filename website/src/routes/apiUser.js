const express = require('express');
const router = express.Router();
const user = require('../controllers/apiUser');

router.get("/all", user.all)
router.get("/:id", user.user_id)
router.get("/:id/favs", user.favs)


module.exports = router;