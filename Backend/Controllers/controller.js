var parser = require('../src/Interprete/Grammar/grammar');

exports.index = async (req, res) => {
    res.send({ "Controlador": "Estuardo" })
}

exports.ingresarCodigo = async (req, res) => {
    console.log(req.body.Codigo || "No se pudo obtener el codigo")
    
    var result = parser.parse(req.body.Codigo)
    console.log(parser.Errores)
    try {
        let erroresDetec = "";
        for (e in parser.Errores) {
            erroresDetec += "----- linea: " + parser.Errores[e].linea + " columna: " + parser.Errores[e].columna + " tipo: " + parser.Errores[e].tipo + " mensaje: " + parser.Errores[e].mensaje + " -----\n";
        }
        var entrada = { Codigo: result, Error: erroresDetec }
        parser.Errores.length = 0; 
        ContenidoEditor = entrada;
        res.send({ "Respuesta": "Ok" })
    } catch (error) {
        console.log(error)
        //res.send({"Respuesta": "Fail"})
    }

}

exports.CodigoIngresado = async (req, res) => {
    res.send(JSON.stringify(ContenidoEditor))
}