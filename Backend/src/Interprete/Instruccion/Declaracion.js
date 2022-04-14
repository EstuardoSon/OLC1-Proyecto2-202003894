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
exports.Inicializacion = exports.Declaracion = void 0;
var Error_1 = require("../Error/Error");
var Instruccion_1 = require("../Instruccion/Instruccion");
var Declaracion = /** @class */ (function (_super) {
    __extends(Declaracion, _super);
    function Declaracion(linea, columna, nombre, valor, tipoVariable) {
        var _this = _super.call(this, linea, columna) || this;
        _this.nombre = nombre;
        _this.valor = valor;
        _this.tipoVariable = tipoVariable;
        return _this;
    }
    Declaracion.prototype.ejecutar = function (ambito) {
        if (this.valor != null) {
            var value = this.valor.ejecutar(ambito);
            if (this.realizarComprobacion(value.type)) {
                ambito.setVal(this.nombre, value.value, value.type, this.linea, this.columna);
            }
        }
        else {
            ambito.setVal(this.nombre, null, this.tipoVariable, this.linea, this.columna);
        }
    };
    Declaracion.prototype.realizarComprobacion = function (tipo) {
        if (this.valor != null) {
            if (this.tipoVariable == tipo) {
                return true;
            }
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', "No es posible la asignacion de la variable: " + this.nombre + ", ya que su valor no es el adecuado");
        }
        else {
            return false;
        }
    };
    return Declaracion;
}(Instruccion_1.Instruccion));
exports.Declaracion = Declaracion;
var Inicializacion = /** @class */ (function (_super) {
    __extends(Inicializacion, _super);
    function Inicializacion(linea, columna, nombre, valor) {
        var _this = _super.call(this, linea, columna) || this;
        _this.nombre = nombre;
        _this.valor = valor;
        return _this;
    }
    Inicializacion.prototype.ejecutar = function (ambito) {
        var value = this.valor.ejecutar(ambito);
        ambito.modVal(String(this.nombre).toLowerCase(), value.value, value.type, this.linea, this.columna);
    };
    return Inicializacion;
}(Instruccion_1.Instruccion));
exports.Inicializacion = Inicializacion;
