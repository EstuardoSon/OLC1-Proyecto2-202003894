"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.LlamadoFuncionE = exports.LlamadoV = exports.LlamadoM = exports.Llamado = void 0;
var Error_1 = require("../Error/Error");
var Ambito_1 = require("../Extra/Ambito");
var Expresion_1 = require("./Expresion");
var Llamado = /** @class */ (function (_super) {
    __extends(Llamado, _super);
    function Llamado(nombre, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.nombre = nombre;
        return _this;
    }
    Llamado.prototype.ejecutar = function (ambito) {
        var value = ambito.getVal(this.nombre);
        if (value != null) {
            if (value.valor == null) {
                throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'La variable: ' + this.nombre + ' no tiene un valor asignado');
            }
            return { value: value.valor, type: value.tipo };
        }
        else {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No existe una declaracion de la variable primitiva: ' + this.nombre + '');
        }
    };
    return Llamado;
}(Expresion_1.Expresion));
exports.Llamado = Llamado;
var LlamadoM = /** @class */ (function (_super) {
    __extends(LlamadoM, _super);
    function LlamadoM(nombre, fila, celda, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.nombre = nombre;
        _this.fila = fila;
        _this.celda = celda;
        return _this;
    }
    LlamadoM.prototype.ejecutar = function (ambito) {
        var filaV = this.fila.ejecutar(ambito);
        var columnV = this.celda.ejecutar(ambito);
        var value = ambito.getVal(this.nombre);
        if (filaV.type != 0) {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El valor ingresado en la Fila no es un entero');
        }
        if (columnV.type != 0) {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El valor ingresado en la Columna no es un entero');
        }
        if (value != null) {
            if (columnV.value < 0 || columnV.value >= value.valor.length) {
                throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El Indice ingresado en Columna no existe en: ' + this.nombre);
            }
            if (filaV.value < 0 || filaV.value >= value.valor[0].length) {
                throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El Indice ingresado en Fila no existe en: ' + this.nombre);
            }
            if (value.valor[filaV.value][columnV.value] == null) {
                throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El dato : ' + this.nombre + "[".concat(filaV.value, "][").concat(columnV.value, "] ") + ' no tiene un valor asignado');
            }
            return { value: value.valor[filaV.value][columnV.value], type: value.tipo };
        }
        else {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No existe una declaracion de matriz: ' + this.nombre + '');
        }
    };
    return LlamadoM;
}(Expresion_1.Expresion));
exports.LlamadoM = LlamadoM;
var LlamadoV = /** @class */ (function (_super) {
    __extends(LlamadoV, _super);
    function LlamadoV(nombre, celda, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.nombre = nombre;
        _this.celda = celda;
        return _this;
    }
    LlamadoV.prototype.ejecutar = function (ambito) {
        var columnV = this.celda.ejecutar(ambito);
        var value = ambito.getVal(this.nombre);
        if (columnV.type != 0) {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El valor ingresado en la Columna no es un entero');
        }
        if (value != null) {
            if (columnV.value < 0 || columnV.value >= value.valor.length) {
                throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El Indice ingresado no existe en el arreglo: ' + this.nombre);
            }
            if (value.valor[columnV.value] == null) {
                throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El dato: ' + this.nombre + "[".concat(columnV.value, "]") + ' no tiene un valor asignado');
            }
            return { value: value.valor[columnV.value], type: value.tipo };
        }
        else {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No existe una declaracion de vector: ' + this.nombre + '');
        }
    };
    return LlamadoV;
}(Expresion_1.Expresion));
exports.LlamadoV = LlamadoV;
var LlamadoFuncionE = /** @class */ (function (_super) {
    __extends(LlamadoFuncionE, _super);
    function LlamadoFuncionE(nombre, parametros, fila, columna) {
        var _this = _super.call(this, fila, columna) || this;
        _this.nombre = nombre;
        _this.parametros = parametros;
        return _this;
    }
    LlamadoFuncionE.prototype.ejecutar = function (ambito) {
        var busqueda = ambito.getFunc(this.nombre);
        if (busqueda != null) {
            if (this.parametros.length == busqueda.parametros.length) {
                var global_1 = ambito.getGlobal();
                var nuevo = new Ambito_1.Ambito(global_1, "".concat(global_1.nombre, " - funcion(").concat(this.nombre, ")"), true);
                for (var i in this.parametros) {
                    var param = this.parametros[i].ejecutar(ambito);
                    if (param.type == busqueda.parametros[i].tipo) {
                        nuevo.setVal(busqueda.parametros[i].nombre, param.value, param.type, this.linea, this.columna);
                    }
                    else {
                        throw new Error_1.ErrorE(this.linea, this.columna, "Semantico", "El valor: ".concat(param.value, " no es del tipo adecuado del parametro: ").concat(busqueda.parametros[i].nombre));
                    }
                }
                var respuesta = busqueda.entorno.ejecutar(nuevo);
                if (respuesta.type == 'Return') {
                    if (respuesta.value != null) {
                        if (respuesta.value.type == busqueda.retorno) {
                            return respuesta.value;
                        }
                        else {
                            throw new Error_1.ErrorE(this.linea, this.columna, "Semantico", "El retorno de la funcion " + busqueda.nombre + " no coincide con su tipo");
                        }
                    }
                    else {
                        if (respuesta.value == busqueda.retorno) {
                            return { value: null, type: busqueda.retorno };
                        }
                        else {
                            throw new Error_1.ErrorE(this.linea, this.columna, "Semantico", "El retorno de la funcion " + busqueda.nombre + " no coincide con su tipo");
                        }
                    }
                }
            }
            else {
                throw new Error_1.ErrorE(this.linea, this.columna, "Semantico", "La cantidad de parametros enviados a la funcion " + this.nombre + " no es la justa");
            }
        }
        else {
            throw new Error_1.ErrorE(this.linea, this.columna, "Semantico", "No existe una funcion con el nombre: " + this.nombre);
        }
    };
    return LlamadoFuncionE;
}(Expresion_1.Expresion));
exports.LlamadoFuncionE = LlamadoFuncionE;
