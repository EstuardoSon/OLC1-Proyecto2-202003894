var ContenidoEditor = []
const parser = require('../src/Interprete/Grammar/grammar');

exports.index = async(req, res)=>{
    res.send({ "Controlador": "Estuardo" })
}

exports.ingresarCodigo = async(req, res) => {
    console.log(req.body.Codigo || "No se pudo obtener el codigo")
    try {
        var result = parser.parse(req.body.Codigo)
        var entrada = {Codigo : result}
        ContenidoEditor = entrada;
        res.send({"Respuesta": "Ok"})
    } catch (error) {
        console.log(error)
        //res.send({"Respuesta": "Fail"})
    }
      
}

exports.CodigoIngresado = async(req, res) => {
    
    res.send(JSON.stringify(ContenidoEditor))
}