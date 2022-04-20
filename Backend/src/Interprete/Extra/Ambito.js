"use strict";
exports.__esModule = true;
exports.Ambito = void 0;
var Error_1 = require("../Error/Error");
var Simbolo_1 = require("./Simbolo");
var parser = require('../Grammar/grammar');
var Ambito = /** @class */ (function () {
    function Ambito(anterior, nombre, marcador) {
        this.anterior = anterior;
        this.nombre = nombre;
        this.marcador = marcador;
        this.variables = new Map();
        this.funciones = new Map();
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
                    break;
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
            if (!entorno.marcador) {
                if (entorno.variables.has(id.toLocaleLowerCase())) {
                    throw new Error_1.ErrorE(linea, columna, 'Semantico', "La variable: " + id + " ya existe");
                }
                entorno = entorno.anterior;
            }
            else {
                if (entorno.variables.has(id.toLocaleLowerCase())) {
                    throw new Error_1.ErrorE(linea, columna, 'Semantico', "La variable: " + id + " ya existe");
                }
                entorno = null;
            }
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
            if (!entorno.marcador) {
                if (entorno.variables.has(id.toLocaleLowerCase())) {
                    throw new Error_1.ErrorE(linea, columna, 'Semantico', "La variable: " + id + " ya existe");
                }
                entorno = entorno.anterior;
            }
            else {
                if (entorno.variables.has(id.toLocaleLowerCase())) {
                    throw new Error_1.ErrorE(linea, columna, 'Semantico', "La variable: " + id + " ya existe");
                }
                entorno = null;
            }
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
                break;
            }
            entorno = entorno.anterior;
        }
    };
    Ambito.prototype.setValV = function (id, valor, tipo, linea, columna) {
        var entorno = this;
        while (entorno != null) {
            if (!entorno.marcador) {
                if (entorno.variables.has(id.toLocaleLowerCase())) {
                    throw new Error_1.ErrorE(linea, columna, 'Semantico', "La variable: " + id + " ya existe");
                }
                entorno = entorno.anterior;
            }
            else {
                if (entorno.variables.has(id.toLocaleLowerCase())) {
                    throw new Error_1.ErrorE(linea, columna, 'Semantico', "La variable: " + id + " ya existe");
                }
                entorno = null;
            }
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
                break;
            }
            entorno = entorno.anterior;
        }
    };
    Ambito.prototype.setFunc = function (nombre, valor, linea, columna) {
        var entorno = this;
        while (entorno != null) {
            if (entorno.funciones.has(nombre.toLocaleLowerCase())) {
                throw new Error_1.ErrorE(linea, columna, "Semantico", "La funcion ya existe");
            }
            entorno = entorno.anterior;
        }
        parser.TablaSimbolos.push([this.nombre, nombre.toLocaleLowerCase(), valor, valor.retorno, "Funcion o Metodo"]);
        this.funciones.set(nombre.toLocaleLowerCase(), valor);
    };
    Ambito.prototype.getFunc = function (id) {
        var entorno = this;
        while (entorno != null) {
            if (entorno.funciones.has(id.toLocaleLowerCase())) {
                return entorno.funciones.get(id.toLocaleLowerCase());
            }
            entorno = entorno.anterior;
        }
        return null;
    };
    Ambito.prototype.getGlobal = function () {
        var entorno = this;
        while (entorno.anterior != null) {
            entorno = entorno.anterior;
        }
        return entorno;
    };
    return Ambito;
}());
exports.Ambito = Ambito;
