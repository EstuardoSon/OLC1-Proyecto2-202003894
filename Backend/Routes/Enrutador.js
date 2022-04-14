const express = require('express')
const router = express.Router()
const control = require("../Controllers/controller")

router.get("/cliente", control.index)

router.post("/Codigo", control.ingresarCodigo)

router.get("/Codigo", control.CodigoIngresado)

router.get("/Error", control.ReporteErrores)

router.get("/AST", control.ReporteAST)

router.get("/Simbolos", control.ReporteSimbolos)

module.exports = router