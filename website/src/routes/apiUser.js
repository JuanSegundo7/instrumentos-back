const express = require('express');
const router = express.Router();
const user = require('../controllers/apiUser');
const logged = require('../middlewares/user')

router.get("/all", user.all)
router.get("/:id", user.user_id)


module.exports = router;