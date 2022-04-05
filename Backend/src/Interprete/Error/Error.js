"use strict";
exports.__esModule = true;
exports.ErrorE = void 0;
var ErrorE = /** @class */ (function () {
    function ErrorE(linea, columna, tipo, mensaje) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.mensaje = mensaje;
    }
    return ErrorE;
}());
exports.ErrorE = ErrorE;
