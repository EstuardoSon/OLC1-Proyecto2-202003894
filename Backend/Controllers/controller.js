const { Ambito } = require('../src/Interprete/Extra/Ambito');
var parser = require('../src/Interprete/Grammar/grammar');
var tabla = "<table class='table table-hover'><thead class='thead-dark'><tr><th>Linea</th><th>Columna</th><th>Tipo</th><th>Mensaje</th></tr></thead></table>";
var ContenidoEditor = { Codigo: "", Error: "" }

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
    console.log(ambi.variables)

    let erroresDetec = "";

    tabla = "<table class='table table-hover'><thead class='thead-dark'><tr><th>Linea</th><th>Columna</th><th>Tipo</th><th>Mensaje</th></tr></thead>";
    for (e of parser.Errores) {
        tabla += `<tr><td>${e.linea}</td><td>${e.columna}</td><td>${e.tipo}</td><td>${e.mensaje}</td></tr>`;
        erroresDetec += "----- linea: " + e.linea + " columna: " + e.columna + " tipo: " + e.tipo + " mensaje: " + e.mensaje + " -----\n";
    }
    tabla += "</table>";

    var entrada = { Codigo: parser.Impresion, Error: erroresDetec }

    parser.Errores.length = 0;
    parser.Impresion = "";

    ContenidoEditor = entrada;
    res.send({ "Respuesta": "Ok" })

}

exports.CodigoIngresado = async (req, res) => {
    res.send(JSON.stringify(ContenidoEditor))
}

exports.ReporteErrores = async (req, res) => {
    res.send(JSON.stringify({ Codigo: tabla }))
}