const express = require('express')
const router = express.Router()
const control = require("../Controllers/controller")

router.get("/cliente", control.index)

router.post("/Codigo", control.ingresarCodigo)

router.get("/Codigo", control.CodigoIngresado)

router.get("/Error", control.ReporteErrores)

module.exports = router