"use strict";
exports.__esModule = true;
exports.Expresion = void 0;
var Retorno_1 = require("./Retorno");
var Expresion = /** @class */ (function () {
    function Expresion(linea, columna) {
        this.linea = linea;
        this.columna = columna;
    }
    Expresion.prototype.tipoDominante = function (Tipo, fila, columna) {
        switch (Tipo) {
            case 0: {
                return Retorno_1.tipoSUMA[fila][columna];
            }
            case 1: {
                return Retorno_1.tipoRESTA[fila][columna];
            }
            case 2: {
                return Retorno_1.tipoMULTI[fila][columna];
            }
            case 3: {
                return Retorno_1.tipoDIV[fila][columna];
            }
            case 4: {
                return Retorno_1.tipoPOTENCIA[fila][columna];
            }
            case 5: {
                return Retorno_1.tipoMODULO[fila][columna];
            }
            case 6: {
                return Retorno_1.tipoRELACIONAL[fila][columna];
            }
            default: {
                return null;
            }
        }
    };
    return Expresion;
}());
exports.Expresion = Expresion;
