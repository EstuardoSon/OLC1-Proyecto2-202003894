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
    Ambito.prototype.modVal = function (id, valor, tipo, linea, columna) {
        var entorno = this;
        while (entorno != null) {
            if (entorno.variables.has(id.toLocaleLowerCase())) {
                var val = entorno.variables.get(id);
                if (val.tipo == tipo) {
                    entorno.variables.set(id.toLocaleLowerCase(), new Simbolo_1.Simbolo(valor, id.toLocaleLowerCase(), tipo, 0));
                }
                else {
                    throw new Error_1.ErrorE(linea, columna, 'Semantico', 'No se puede asignar: ' + valor + ' a ' + id + " porque no son del mismo tipo");
                }
            }
            entorno = entorno.anterior;
        }
    };
    Ambito.prototype.setVal = function (id, valor, tipo, linea, columna) {
        var entorno = this;
        while (entorno != null) {
            if (entorno.variables.has(id.toLocaleLowerCase())) {
                throw new Error_1.ErrorE(linea, columna, 'Semantico', "La variable: " + id + " ya existe");
            }
            entorno = entorno.anterior;
        }
        this.variables.set(id.toLocaleLowerCase(), new Simbolo_1.Simbolo(valor, id.toLocaleLowerCase(), tipo, 0));
    };
    Ambito.prototype.getVal = function (id) {
        var entorno = this;
        while (entorno != null) {
            if (entorno.variables.has(id.toLocaleLowerCase())) {
                return entorno.variables.get(id.toLocaleLowerCase());
            }
            entorno = entorno.anterior;
        }
        return null;
    };
    Ambito.prototype.setValM = function (id, valor, tipo, linea, columna) {
        var entorno = this;
        while (entorno != null) {
            if (entorno.variables.has(id.toLocaleLowerCase())) {
                throw new Error_1.ErrorE(linea, columna, 'Semantico', "La variable: " + id + " ya existe");
            }
            entorno = entorno.anterior;
        }
        this.variables.set(id.toLocaleLowerCase(), new Simbolo_1.Simbolo(valor, id.toLocaleLowerCase(), tipo, 2));
    };
    Ambito.prototype.modValM = function (id, valor, tipo) {
        var entorno = this;
        while (entorno != null) {
            if (entorno.variables.has(id.toLocaleLowerCase())) {
                entorno.variables.set(id.toLocaleLowerCase(), new Simbolo_1.Simbolo(valor, id.toLocaleLowerCase(), tipo, 2));
            }
            entorno = entorno.anterior;
        }
    };
    Ambito.prototype.setValV = function (id, valor, tipo, linea, columna) {
        var entorno = this;
        while (entorno != null) {
            if (entorno.variables.has(id.toLocaleLowerCase())) {
                throw new Error_1.ErrorE(linea, columna, 'Semantico', "La variable: " + id + " ya existe");
            }
            entorno = entorno.anterior;
        }
        this.variables.set(id.toLocaleLowerCase(), new Simbolo_1.Simbolo(valor, id.toLocaleLowerCase(), tipo, 1));
    };
    Ambito.prototype.modValV = function (id, valor, tipo) {
        var entorno = this;
        while (entorno != null) {
            if (entorno.variables.has(id.toLocaleLowerCase())) {
                entorno.variables.set(id.toLocaleLowerCase(), new Simbolo_1.Simbolo(valor, id.toLocaleLowerCase(), tipo, 1));
            }
            entorno = entorno.anterior;
        }
    };
    return Ambito;
}());
exports.Ambito = Ambito;
