const { Ambito } = require('../src/Interprete/Extra/Ambito');
var parser = require('../src/Interprete/Grammar/grammar');

var ContenidoEditor ={ Codigo: "", Error: "" }

exports.index = async (req, res) => {
    res.send({ "Controlador": "Estuardo" })
}

exports.ingresarCodigo = async (req, res) => {
    var result = parser.parse(req.body.Codigo)
    let ambi = new Ambito(null);
    for (i of result) {
        try {
            i.ejecutar(ambi);
        } catch (error) {
            parser.Errores.push(error)
        }
    }

    let erroresDetec = "";

    for (e of parser.Errores) { erroresDetec += "----- linea: " + e.linea + " columna: " + e.columna + " tipo: " + e.tipo + " mensaje: " + e.mensaje + " -----\n"; }

    var entrada = { Codigo: parser.Impresion, Error: erroresDetec }

    parser.Errores.length = 0;
    parser.Impresion = "";

    ContenidoEditor = entrada;
    res.send({ "Respuesta": "Ok" })

}

exports.CodigoIngresado = async (req, res) => {
    res.send(JSON.stringify(ContenidoEditor))
}