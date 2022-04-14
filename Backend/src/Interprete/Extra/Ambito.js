"use strict";
exports.__esModule = true;
exports.Ambito = void 0;
var Error_1 = require("../Error/Error");
var Simbolo_1 = require("./Simbolo");
var parser = require('../Grammar/grammar');
var Ambito = /** @class */ (function () {
    function Ambito(anterior, nombre) {
        this.anterior = anterior;
        this.nombre = nombre;
        this.variables = new Map();
    }
    Ambito.prototype.modVal = function (id, valor, tipo, linea, columna) {
        var entorno = this;
        while (entorno != null) {
            if (entorno.variables.has(id.toLocaleLowerCase())) {
                var val = entorno.variables.get(id);
                if (val.tipo == tipo) {
                    parser.TablaSimbolos.find(function (object) {
                        if (object[1] == id.toLocaleLowerCase()) {
                            object[2] = valor;
                        }
                    });
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
        parser.TablaSimbolos.push([this.nombre, id.toLocaleLowerCase(), valor, tipo, "Primitiva"]);
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
        parser.TablaSimbolos.push([this.nombre, id.toLocaleLowerCase(), valor, tipo, "Matriz"]);
        this.variables.set(id.toLocaleLowerCase(), new Simbolo_1.Simbolo(valor, id.toLocaleLowerCase(), tipo, 2));
    };
    Ambito.prototype.modValM = function (id, valor, tipo) {
        var entorno = this;
        while (entorno != null) {
            if (entorno.variables.has(id.toLocaleLowerCase())) {
                parser.TablaSimbolos.find(function (object) {
                    if (object[1] == id.toLocaleLowerCase()) {
                        object[2] = valor;
                    }
                });
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
        parser.TablaSimbolos.push([this.nombre, id.toLocaleLowerCase(), valor, tipo, "Vector"]);
        this.variables.set(id.toLocaleLowerCase(), new Simbolo_1.Simbolo(valor, id.toLocaleLowerCase(), tipo, 1));
    };
    Ambito.prototype.modValV = function (id, valor, tipo) {
        var entorno = this;
        while (entorno != null) {
            if (entorno.variables.has(id.toLocaleLowerCase())) {
                parser.TablaSimbolos.find(function (object) {
                    if (object[1] == id.toLocaleLowerCase()) {
                        object[2] = valor;
                    }
                });
                entorno.variables.set(id.toLocaleLowerCase(), new Simbolo_1.Simbolo(valor, id.toLocaleLowerCase(), tipo, 1));
            }
            entorno = entorno.anterior;
        }
    };
    return Ambito;
}());
exports.Ambito = Ambito;
