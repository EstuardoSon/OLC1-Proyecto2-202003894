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
exports.LlamadoV = exports.LlamadoM = exports.Llamado = void 0;
var Error_1 = require("../Error/Error");
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
