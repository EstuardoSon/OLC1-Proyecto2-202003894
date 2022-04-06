"use strict";
exports.__esModule = true;
exports.Ambito = void 0;
var Error_1 = require("../Error/Error");
var Simbolo_1 = require("./Simbolo");
var Ambito = /** @class */ (function () {
    function Ambito(anterior) {
        this.anterior = anterior;
        this.variables = new Map();
    }
    Ambito.prototype.setVal = function (id, valor, tipo, linea, columna) {
        var entorno = this;
        while (entorno != null) {
            if (entorno.variables.has(id)) {
                var val = entorno.variables.get(id);
                if (val.tipo == tipo) {
                    entorno.variables.set(id, new Simbolo_1.Simbolo(valor, id, tipo));
                }
                else {
                    throw new Error_1.ErrorE(linea, columna, 'Semantico', 'No se puede asignar: ' + tipo + ' a ' + val.tipo);
                }
            }
            entorno = entorno.anterior;
        }
        this.variables.set(id, new Simbolo_1.Simbolo(valor, id, tipo));
    };
    Ambito.prototype.getVal = function (id) {
        var entorno = this;
        while (entorno != null) {
            if (entorno.variables.has(id)) {
                return entorno.variables.get(id);
            }
            entorno = entorno.anterior;
        }
        return null;
    };
    return Ambito;
}());
exports.Ambito = Ambito;
