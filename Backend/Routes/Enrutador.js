const express = require('express')
const router = express.Router()
const control = require("../Controllers/controller")

router.get("/cliente", control.index)

module.exports = router